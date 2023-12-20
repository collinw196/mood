using Microsoft.AspNetCore.Mvc;
using Mood.Server.Models;

namespace Mood.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<MoodLogController> _logger;
        private readonly MoodRDSContext _db;

        public UserController(ILogger<MoodLogController> logger, MoodRDSContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet("GetUsers")]
        public IEnumerable<UserEntity> GetUsers()
        {
            return _db.Users.ToList();
        }

        [HttpGet("GetUser/{UserName?}")]
        public UserEntity GetUser(string username)
        {
            return _db.Users.Where(x => x.UserName.Equals(username)).FirstOrDefault();
        }

        [HttpPost("PostUser")]
        public string PostUser(UserEntity user)
        {
            using (var context = _db)
            {
                context.Users.Add(user);
                context.SaveChanges();
            }
                return "";
        }
    }
}
