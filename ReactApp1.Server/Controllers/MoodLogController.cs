using Microsoft.AspNetCore.Mvc;
using Mood.Server.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Text.Json;
using Newtonsoft.Json;
using static System.Net.Mime.MediaTypeNames;

namespace Mood.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoodLogController : ControllerBase
    {
        private readonly ILogger<MoodLogController> _logger;
        private readonly MoodRDSContext _db;

        public MoodLogController(ILogger<MoodLogController> logger, MoodRDSContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet("GetUserMoods")]
        public IEnumerable<MoodLogEntity> GetMoodLogs()
        {
            var rawMoodLogs = _db.MoodLogs.ToList();

            List<UserMoodInput> userMoods = new List<UserMoodInput>();

            rawMoodLogs.ForEach(rawMoodLog =>
            {
                // Deserialize JSON string into a list of dictionaries
                var jsonList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(rawMoodLog.MoodList);

                // Map the dictionaries to UserMoodInput objects

                userMoods.AddRange(jsonList.Select(item => new UserMoodInput
                {
                    //Mood = new MoodEntity
                    //{

                    //    MoodId = Convert.ToInt32(item["Mood"]),
                    //    MoodName = item["MoodName"].ToString()
                    //},
                    MoodName = item["Mood"].ToString(),
                    Weight = Convert.ToInt32(item["Weight"]),
                    Notes = item["Notes"].ToString(),
                }).ToList()) ;

                rawMoodLog.DeserializedMoodList.AddRange(userMoods);
            });

            return rawMoodLogs;
        }

        [HttpPost("PostUserMoods")]
        public string PostMoodLogs([FromBody]MoodLogEntity moodLog)
        {
            var jsonString = JsonConvert.SerializeObject(moodLog.DeserializedMoodList);
            moodLog.MoodList = jsonString;
            moodLog.Date = DateTime.Now;
            using (var context = _db)
            {
                context.MoodLogs.Add(moodLog);
                context.SaveChanges();
            }
                
            return "";
        }
    }
}
