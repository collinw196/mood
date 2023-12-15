using System.ComponentModel.DataAnnotations;

namespace Mood.Server.Models
{
    public class UserEntity
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
