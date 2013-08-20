using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace H.TennisScoreKeeper.Data.Projectors.Models
{
    public class MatchInfo
    {
        public Guid Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
        public string PlayerOne { get; set; }
        public string PlayerTwo { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
