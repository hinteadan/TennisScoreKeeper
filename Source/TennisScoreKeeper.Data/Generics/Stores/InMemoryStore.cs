using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using H.TennisScoreKeeper.Data.Stores;

namespace H.TennisScoreKeeper.Data.Generics.Stores
{
    public class InMemoryStore<T> : IStoreDataAsKeyValueOf<T>
    {
        private readonly InMemoryStore inMemoryStore = new InMemoryStore();

        public Guid Save(T data)
        {
            return inMemoryStore.Save(data);
        }

        public void SaveOrUpdate(KeyValuePair<Guid, T> entry)
        {
            inMemoryStore.SaveOrUpdate(new KeyValuePair<Guid, object>(entry.Key, entry.Value));
        }

        public void SaveOrUpdate(Guid id, T data)
        {
            inMemoryStore.SaveOrUpdate(id, data);
        }

        public T Load(Guid id)
        {
            return (T)inMemoryStore.Load(id);
        }

        public IEnumerable<KeyValuePair<Guid, T>> Load()
        {
            return inMemoryStore.Load().Select(d => new KeyValuePair<Guid, T>(d.Key, (T)d.Value));
        }

        public IEnumerable<KeyValuePair<Guid, Lazy<T>>> LazyLoad()
        {
            return inMemoryStore.LazyLoad()
                .Select(d => new KeyValuePair<Guid, Lazy<T>>(d.Key, new Lazy<T>(() => (T)d.Value.Value)));
        }

        public void Remove(Guid id)
        {
            inMemoryStore.Remove(id);
        }
    }
}
