using Microsoft.AspNetCore.Mvc;
using Mood.Server.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Text.Json;
using Newtonsoft.Json;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Linq;

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
                    MoodName = item["MoodName"].ToString(),
                    Weight = Convert.ToInt32(item["Weight"]),
                    Notes = item["Notes"].ToString(),
                }).ToList()) ;

                rawMoodLog.DeserializedMoodList.AddRange(userMoods);
            });

            return rawMoodLogs;
        }

        [HttpGet("GetUserMoods/{UserId?}")]
        public IEnumerable<MoodLogEntity> GetMoodLogsForUser(int userId)
        {
            var rawMoodLogs = _db.MoodLogs.Where(x => x.UserId == userId).OrderBy(y=> y.Date).ToList();

            rawMoodLogs.ForEach(rawMoodLog =>
            {
                List<UserMoodInput> userMoods = new List<UserMoodInput>();

                // Deserialize JSON string into a list of dictionaries
                var jsonList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(rawMoodLog.MoodList);

                // Map the dictionaries to UserMoodInput objects
                userMoods.AddRange(jsonList.Select(item => new UserMoodInput
                {
                    MoodName = item["MoodName"].ToString(),
                    Weight = Convert.ToInt32(item["Weight"]),
                    Notes = item["Notes"].ToString(),
                }).ToList());

                rawMoodLog.DeserializedMoodList.AddRange(userMoods);
            });

            return rawMoodLogs;
        }

        [HttpGet("GetUserMoods/{UserId?}/{Date?}")]
        public IEnumerable<MoodLogEntity> GetMoodLogsForDate(int userId, string date)
        {
            var parsedDate = DateTime.Parse(date);
            var rawMoodLogs = _db.MoodLogs.Where(x => x.UserId == userId && x.Date.Equals(parsedDate)).ToList();

            rawMoodLogs.ForEach(rawMoodLog =>
            {
                List<UserMoodInput> userMoods = new List<UserMoodInput>();
                // Deserialize JSON string into a list of dictionaries
                var jsonList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(rawMoodLog.MoodList);

                // Map the dictionaries to UserMoodInput objects
                userMoods.AddRange(jsonList.Select(item => new UserMoodInput
                {
                    MoodName = item["MoodName"].ToString(),
                    Weight = Convert.ToInt32(item["Weight"]),
                    Notes = item["Notes"].ToString(),
                }).ToList());

                rawMoodLog.DeserializedMoodList.AddRange(userMoods);
            });
            return rawMoodLogs;
        }

        [HttpPost("PostUserMoods")]
        public string PostMoodLogs([FromBody]MoodLogEntity moodLog)
        {
            var jsonString = JsonConvert.SerializeObject(moodLog.DeserializedMoodList);
            moodLog.MoodList = jsonString;
            using (var context = _db)
            {
                var existingMoodLogForDate = context.MoodLogs.Where(x => x.Date.Date == moodLog.Date.Date).FirstOrDefault();
                if (!ReferenceEquals(existingMoodLogForDate, null))
                {
                    var existingDeserializedMoodList = JsonConvert.DeserializeObject<List<Dictionary<string, object>>>(existingMoodLogForDate.MoodList);
                    // Map the dictionaries to UserMoodInput objects
                    existingMoodLogForDate.DeserializedMoodList
                        .AddRange(existingDeserializedMoodList.Select(item => new UserMoodInput
                    {
                        MoodName = item["MoodName"].ToString(),
                        Weight = Convert.ToInt32(item["Weight"]),
                        Notes = item["Notes"].ToString(),
                    }).ToList());

                    List<UserMoodInput> updatedUserInputs = new List<UserMoodInput>();
                    List<UserMoodInput> combinedMoods = new List<UserMoodInput>();
                    //Handle case where the given mood has already been logged for the current day
                    moodLog.DeserializedMoodList.ForEach(item => {
                        if (existingMoodLogForDate.DeserializedMoodList.Select(x => x.MoodName).Contains(item.MoodName))
                        {
                            var existingMood = existingMoodLogForDate.DeserializedMoodList.Where(x => x.MoodName.Equals(item.MoodName)).FirstOrDefault();
                            UserMoodInput combinedMoodInput = new UserMoodInput
                                { MoodName = item.MoodName, Weight = Math.Max(item.Weight, existingMood.Weight),
                                Notes = existingMood.Notes + "\n" + item.Notes };

                            combinedMoods.Add(combinedMoodInput);

                            existingMoodLogForDate.DeserializedMoodList.Remove(existingMood);
                        }
                    });


                    updatedUserInputs.AddRange([
                        .. moodLog.DeserializedMoodList,
                        .. existingMoodLogForDate.DeserializedMoodList,
                    ]);
                    
                    jsonString = JsonConvert.SerializeObject(updatedUserInputs);
                    existingMoodLogForDate.MoodList = jsonString;
                }
                else
                {
                    context.MoodLogs.Add(moodLog);
                }
                context.SaveChanges();
            }
                
            return "";
        }
    }
}
