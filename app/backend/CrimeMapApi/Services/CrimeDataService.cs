using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using CrimeMapApi.Models;

namespace CrimeMapApi.Services;

public class CrimeDataService
{
    private readonly string _csvPath;
    private List<CrimeRecord>? _cache;

    public CrimeDataService(IConfiguration config)
    {
        _csvPath = config["CsvPath"] ?? "data.csv";
    }

    public List<CrimeRecord> GetAll()
    {
        if (_cache != null) return _cache;
        var cfg = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            BadDataFound = null,
            MissingFieldFound = null,
            HeaderValidated = null
        };
        using var reader = new StreamReader(_csvPath, System.Text.Encoding.GetEncoding(1255));
        using var csv = new CsvReader(reader, cfg);
        _cache = csv.GetRecords<CrimeRecord>().ToList();
        return _cache;
    }

    public List<object> GetStatsByDistrict() =>
        GetAll()
            .Where(r => !string.IsNullOrWhiteSpace(r.PoliceDistrict))
            .GroupBy(r => r.PoliceDistrict.Trim())
            .Select(g => (object)new { district = g.Key, count = g.Count() })
            .OrderByDescending(x => ((dynamic)x).count)
            .ToList();

    public List<object> GetStatsByType() =>
        GetAll()
            .Where(r => !string.IsNullOrWhiteSpace(r.StatisticGroup))
            .GroupBy(r => r.StatisticGroup.Trim())
            .Select(g => (object)new { type = g.Key, count = g.Count() })
            .OrderByDescending(x => ((dynamic)x).count)
            .Take(15)
            .ToList();

    public List<object> GetStatsByQuarter() =>
        GetAll()
            .GroupBy(r => $"{r.Year}-{r.Quarter}")
            .Select(g => (object)new { period = g.Key, count = g.Count() })
            .OrderBy(x => ((dynamic)x).period)
            .ToList();

    public List<object> GetStatsByCity() =>
        GetAll()
            .Where(r => !string.IsNullOrWhiteSpace(r.Yeshuv))
            .GroupBy(r => r.Yeshuv.Trim())
            .Select(g => (object)new { city = g.Key, count = g.Count() })
            .OrderByDescending(x => ((dynamic)x).count)
            .Take(20)
            .ToList();
}
