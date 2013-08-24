using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace H.TennisScoreKeeper.Data
{
    public interface IStoreDataAsKeyValue
    {
        Guid Save(object data);
        void SaveOrUpdate(KeyValuePair<Guid, object> entry);
        void SaveOrUpdate(Guid id, object data);
        object Load(Guid id);
        IEnumerable<KeyValuePair<Guid, object>> Load();
        IEnumerable<KeyValuePair<Guid, Lazy<object>>> LazyLoad();
        void Remove(Guid id);
    }
}
