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

        [HttpGet(Name = "GetUserMoods")]
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
                    Mood = JsonConvert.DeserializeObject<MoodEntity>(item["Mood"].ToString()),
                    Weight = Convert.ToInt32(item["Weight"]),
                    Notes = item["Notes"].ToString(),
                }).ToList()) ;

                rawMoodLog.DeserializedMoodList.AddRange(userMoods);
            });

            return rawMoodLogs;
        }

        [HttpPost(Name = "PostUserMoods")]
        public string PostMoodLogs(MoodLogEntity moodLogs)
        {
            var jsonString = JsonConvert.SerializeObject(moodLogs.DeserializedMoodList);
            moodLogs.MoodList = jsonString;
            using (var context = _db)
            {
                var existingMoodLogs = context.Set<MoodLogEntity>();
                existingMoodLogs.Add(moodLogs);
                context.SaveChanges();
            }
                
            return "";
        }
    }
}
