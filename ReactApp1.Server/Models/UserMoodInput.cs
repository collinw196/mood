using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mood.Server.Models
{
    [Keyless]
    [NotMapped]
    public class UserMoodInput
    {
        public MoodEntity Mood { get; set; }
        public int Weight { get; set; }
        public string Notes { get; set; }
    }
}
