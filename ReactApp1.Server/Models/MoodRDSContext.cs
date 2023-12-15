using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mood.Server.Models
{
    public class MoodRDSContext : DbContext
    {
        public MoodRDSContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<MoodLogEntity> MoodLogs { get; set; }
        public DbSet<MoodEntity> Moods { get; set; }
        public DbSet<UserEntity> Users { get; set; }
    }
}
