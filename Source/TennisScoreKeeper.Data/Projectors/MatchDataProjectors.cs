using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using H.TennisScoreKeeper.Data.Projectors.Models;
using Newtonsoft.Json.Linq;

namespace H.TennisScoreKeeper.Data.Projectors
{
    public static class MatchDataProjectors
    {
        public static MatchInfo AsMatchInfo(this object matchData, Guid matchId)
        {
            if (matchData == null || !(matchData is JObject))
            {
                throw new InvalidCastException("Invalid match data");
            }

            JObject match = matchData as JObject;

            return new MatchInfo 
            { 
                Id = matchId,
                Title = "Untitled",
                Description = "No Description",
                PlayerOne = match["Metadata"]["players"][0]["name"].ToString(),
                PlayerTwo = match["Metadata"]["players"][1]["name"].ToString(),
                Timestamp = DateTime.Now
            };
        }

        public static IEnumerable<MatchInfo> AsMatchInfo(this IEnumerable<KeyValuePair<Guid, object>> matchData)
        {
            return matchData.Select(d => d.Value.AsMatchInfo(d.Key)).ToArray();
        }
    }
}
