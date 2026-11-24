using Microsoft.AspNetCore.Mvc;
using CrimeMapApi.Services;

namespace CrimeMapApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CrimeController : ControllerBase
{
    private readonly CrimeDataService _svc;
    public CrimeController(CrimeDataService svc) => _svc = svc;

    [HttpGet("records")]
    public IActionResult GetRecords([FromQuery] string? district, [FromQuery] string? city, [FromQuery] string? quarter, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        var data = _svc.GetAll();
        if (!string.IsNullOrEmpty(district))
            data = data.Where(r => r.PoliceDistrict.Contains(district, StringComparison.OrdinalIgnoreCase)).ToList();
        if (!string.IsNullOrEmpty(city))
            data = data.Where(r => r.Yeshuv.Contains(city, StringComparison.OrdinalIgnoreCase)).ToList();
        if (!string.IsNullOrEmpty(quarter))
            data = data.Where(r => r.Quarter == quarter).ToList();

        var total = data.Count;
        var items = data.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        return Ok(new { total, page, pageSize, items });
    }

    [HttpGet("stats/district")]
    public IActionResult StatsByDistrict() => Ok(_svc.GetStatsByDistrict());

    [HttpGet("stats/type")]
    public IActionResult StatsByType() => Ok(_svc.GetStatsByType());

    [HttpGet("stats/quarter")]
    public IActionResult StatsByQuarter() => Ok(_svc.GetStatsByQuarter());

    [HttpGet("stats/city")]
    public IActionResult StatsByCity() => Ok(_svc.GetStatsByCity());
}
