using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations;

namespace Mood.Server.Models
{
    public class MoodEntity
    {
        [Key]
        public int MoodId { get; set; }
        public string MoodName { get; set; }
        public string Color { get; set; }
    }  
}
