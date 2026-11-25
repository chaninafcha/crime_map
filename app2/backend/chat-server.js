// npm install @google/genai ws
const { GoogleGenAI, Modality, MediaResolution, ThinkingLevel } = require('@google/genai');
const { WebSocketServer, WebSocket } = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY || '';
const PORT = 3001;

const SYSTEM_INSTRUCTION = `אתה עוזר מודיעין משטרתי ישראלי. יש לך גישה לנתוני פשיעה מקובץ CSV בשם DATA.
מבנה הנתונים:
- FictiveIDNumber: מזהה אירוע
- Year: שנה (2025)
- Quarter: רבעון (Q1, Q2, Q3, Q4)
- YeshuvKod / Yeshuv: קוד ושם יישוב
- PoliceDistrictKod / PoliceDistrict: קוד ושם מחוז משטרה
- PoliceMerhavKod / PoliceMerhav: קוד ושם מרחב משטרה
- PoliceStationKod / PoliceStation: קוד ושם תחנת משטרה
- municipalKod / municipalName: קוד ושם רשות מקומית
- StatisticAreaKod / StatisticArea: קוד ושם אזור סטטיסטי
- StatisticGroupKod / StatisticGroup: קוד וקבוצת סטטיסטיקה
  (100=פשעים נגד אדם, 200=פשעים נגד רכוש, 300=עבירות מין,
   400=עבירות סמים, 500=עבירות תנועה, 600=עבירות כלכליות,
   700=עבירות אחרות, 800=עבירות מנהליות, 900=עבירות ביטחון,
   1000=עבירות מיוחדות, 10000=עבירות חמורות)
- StatisticTypeKod / StatisticType: קוד וסוג עבירה ספציפי
ענה בעברית, בצורה תמציתית ומקצועית.`;

// ---- WAV helpers ----
function parseMimeType(mimeType) {
  const [fileType, ...params] = mimeType.split(';').map(s => s.trim());
  const [, format] = fileType.split('/');
  const options = { numChannels: 1, bitsPerSample: 16, sampleRate: 24000 };
  if (format && format.startsWith('L')) {
    const bits = parseInt(format.slice(1), 10);
    if (!isNaN(bits)) options.bitsPerSample = bits;
  }
  for (const param of params) {
    const [key, value] = param.split('=').map(s => s.trim());
    if (key === 'rate') options.sampleRate = parseInt(value, 10);
  }
  return options;
}

function createWavHeader(dataLength, { numChannels, sampleRate, bitsPerSample }) {
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const buf = Buffer.alloc(44);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataLength, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(numChannels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(byteRate, 28);
  buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(bitsPerSample, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataLength, 40);
  return buf;
}

function buildWav(audioParts, mimeType) {
  const options = parseMimeType(mimeType);
  const chunks = audioParts.map(d => Buffer.from(d, 'base64'));
  const dataLength = chunks.reduce((a, b) => a + b.length, 0);
  const header = createWavHeader(dataLength, options);
  const wav = Buffer.concat([header, ...chunks]);
  return wav;
}

// ---- HTTP server (serves frontend files) ----
const httpServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const filePath = path.join(__dirname, '..', 'frontend',
    req.url === '/' ? 'chat.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

// ---- WebSocket server ----
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', async (browserWs) => {
  console.log('[WS] Browser connected');

  const ai = new GoogleGenAI({
    apiKey: API_KEY,
    httpOptions: { apiVersion: 'v1beta' },
  });

  const audioParts = [];
  let lastMimeType = 'audio/pcm;rate=24000';
  let geminiSession = null;

  const config = {
    responseModalities: [Modality.AUDIO, Modality.TEXT],
    mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
    thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: 'Zephyr' },
      },
    },
    contextWindowCompression: {
      triggerTokens: '104857',
      slidingWindow: { targetTokens: '52428' },
    },
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
  };

  try {
    geminiSession = await ai.live.connect({
      model: 'models/gemini-2.0-flash-live-001',
      callbacks: {
        onopen: () => {
          console.log('[Gemini] Session opened');
          browserWs.send(JSON.stringify({ type: 'status', status: 'connected' }));
        },
        onmessage: (message) => {
          // Text chunk
          const textPart = message.serverContent?.modelTurn?.parts?.find(p => p.text);
          if (textPart?.text) {
            browserWs.send(JSON.stringify({ type: 'text', text: textPart.text }));
          }

          // Audio chunk — accumulate
          const audioPart = message.serverContent?.modelTurn?.parts?.find(p => p.inlineData);
          if (audioPart?.inlineData) {
            audioParts.push(audioPart.inlineData.data);
            lastMimeType = audioPart.inlineData.mimeType || lastMimeType;
          }

          // Turn complete — send full WAV
          if (message.serverContent?.turnComplete) {
            if (audioParts.length > 0) {
              const wav = buildWav(audioParts, lastMimeType);
              browserWs.send(JSON.stringify({
                type: 'audio',
                data: wav.toString('base64'),
              }));
              audioParts.length = 0;
            }
            browserWs.send(JSON.stringify({ type: 'turn_complete' }));
          }
        },
        onerror: (e) => {
          console.error('[Gemini] Error:', e.message);
          browserWs.send(JSON.stringify({ type: 'error', message: e.message }));
        },
        onclose: (e) => {
          console.log('[Gemini] Closed:', e.reason);
          browserWs.send(JSON.stringify({ type: 'status', status: 'disconnected' }));
        },
      },
      config,
    });
  } catch (err) {
    console.error('[Gemini] Connect failed:', err.message);
    browserWs.send(JSON.stringify({ type: 'error', message: err.message }));
    return;
  }

  // Browser → Gemini
  browserWs.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.type === 'chat' && geminiSession) {
        geminiSession.sendClientContent({ turns: [msg.text] });
      }
    } catch (e) {
      console.error('[WS] Bad message:', e.message);
    }
  });

  browserWs.on('close', () => {
    console.log('[WS] Browser disconnected');
    geminiSession?.close();
  });
});

httpServer.listen(PORT, () => {
  console.log(`✅ Chat server running → http://localhost:${PORT}`);
});
