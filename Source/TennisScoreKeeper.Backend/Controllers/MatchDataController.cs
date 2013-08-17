using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using H.TennisScoreKeeper.Data;

namespace TennisScoreKeeper.Backend.Controllers
{
    public class MatchDataController : ApiController
    {
        private readonly IStoreDataAsKeyValue dataStore;

        public MatchDataController(IStoreDataAsKeyValue dataStore)
        {
            this.dataStore = dataStore;
        }

        public IEnumerable<KeyValuePair<Guid, object>> Get()
        {
            return dataStore.Load();
        }

        public object Get(Guid id)
        {
            return dataStore.Load(id);
        }

        public object Post([FromBody]object value)
        {
            return new { Id = dataStore.Save(value) };
        }

        public void Put(Guid id, [FromBody]object value)
        {
            dataStore.SaveOrUpdate(new KeyValuePair<Guid, object>(id, value));
        }

        public void Delete(Guid id)
        {
            dataStore.Remove(id);
        }
    }
}
