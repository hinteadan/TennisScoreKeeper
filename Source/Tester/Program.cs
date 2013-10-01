using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using H.TennisScoreKeeper.Data.Generics.Stores;
using H.TennisScoreKeeper.Data.Stores;

namespace Tester
{
    internal class SomeDummyDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Timestamp { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var store = new JsonFileStore<SomeDummyDto>();
            var id = store.Save(new SomeDummyDto { Id = Guid.NewGuid(), Name = "Danish Test", Timestamp = DateTime.Now });
            store.SaveOrUpdate(id, new SomeDummyDto { Id = Guid.NewGuid(), Name = "Danish Test Updated", Timestamp = DateTime.Now });
            var data = store.Load(id);

            foreach(var entry in store.LazyLoad())
            {
                store.Remove(entry.Key);
            }
        }
    }
}
