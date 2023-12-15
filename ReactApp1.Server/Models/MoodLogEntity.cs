using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.ComponentModel.DataAnnotations;

namespace Mood.Server.Models
{
    public class MoodLogEntity
    {
        [Key]
        public int MoodLogId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public string MoodList { get; set; }
        public List<UserMoodInput> DeserializedMoodList { get; set; } = new List<UserMoodInput>();
    }
}
