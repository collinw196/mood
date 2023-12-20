using Microsoft.AspNetCore.Mvc;
using Mood.Server.Models;

namespace Mood.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoodController : ControllerBase
    {
        private readonly ILogger<MoodController> _logger;
        private readonly MoodRDSContext _db;

        public MoodController(ILogger<MoodController> logger, MoodRDSContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet("GetMoods")]
        public IEnumerable<MoodEntity> GetMoods()
        {
            return _db.Moods.ToList();
        }
    }
}
