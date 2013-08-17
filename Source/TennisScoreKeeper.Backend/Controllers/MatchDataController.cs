using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TennisScoreKeeper.Backend.Controllers
{
    public class MatchDataController : ApiController
    {
        // GET api/matchdata
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/matchdata/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/matchdata
        public void Post([FromBody]string value)
        {
        }

        // PUT api/matchdata/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/matchdata/5
        public void Delete(int id)
        {
        }
    }
}
