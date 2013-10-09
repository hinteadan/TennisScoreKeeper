using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace TennisScoreKeeper.Backend.MessagingHubs
{
    public class ScoreHub : Hub
    {
        public void BroadcastScoreChange(object scoreData)
        {
            Clients.All.scoreChangedTo(scoreData);
        }
    }
}