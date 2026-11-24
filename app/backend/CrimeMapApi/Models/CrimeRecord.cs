namespace CrimeMapApi.Models;

public class CrimeRecord
{
    public string FictiveIDNumber { get; set; } = "";
    public int Year { get; set; }
    public string Quarter { get; set; } = "";
    public string YeshuvKod { get; set; } = "";
    public string Yeshuv { get; set; } = "";
    public string PoliceDistrictKod { get; set; } = "";
    public string PoliceDistrict { get; set; } = "";
    public string PoliceMerhavKod { get; set; } = "";
    public string PoliceMerhav { get; set; } = "";
    public string PoliceStationKod { get; set; } = "";
    public string PoliceStation { get; set; } = "";
    public string StatisticGroupKod { get; set; } = "";
    public string StatisticGroup { get; set; } = "";
    public string StatisticTypeKod { get; set; } = "";
    public string StatisticType { get; set; } = "";
}
