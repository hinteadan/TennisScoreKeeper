using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using H.TennisScoreKeeper.Data.Stores;

namespace Tester
{
    class Program
    {
        static void Main(string[] args)
        {
            var store = new JsonFileStore();
            var id = store.Save("test test testicles");
            store.SaveOrUpdate(id, "updated test test testicles");
            var data = store.Load(id);

            foreach(var entry in store.LazyLoad())
            {
                store.Remove(entry.Key);
            }
        }
    }
}
