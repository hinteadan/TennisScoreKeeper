using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace H.TennisScoreKeeper.Data.Generics
{
    public interface IStoreDataAsKeyValueOf<T>
    {
        Guid Save(T data);
        void SaveOrUpdate(KeyValuePair<Guid, T> entry);
        void SaveOrUpdate(Guid id, T data);
        T Load(Guid id);
        IEnumerable<KeyValuePair<Guid, T>> Load();
        IEnumerable<KeyValuePair<Guid, Lazy<T>>> LazyLoad();
        void Remove(Guid id);
    }
}
