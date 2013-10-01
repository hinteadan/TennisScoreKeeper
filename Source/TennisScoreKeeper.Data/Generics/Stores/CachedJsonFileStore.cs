using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace H.TennisScoreKeeper.Data.Generics.Stores
{
    public class CachedJsonFileStore<T> : IStoreDataAsKeyValueOf<T>
    {
        private readonly MemoryCache cache;
        private readonly JsonFileStore<T> fileStore;
        private readonly Guid cacheRepositoryId = Guid.NewGuid();
        private readonly string cacheIdForRepositoryEntries = string.Format("{0}", Guid.NewGuid());

        public CachedJsonFileStore()
        {
            this.fileStore = new JsonFileStore<T>();
            cache = new MemoryCache(cacheRepositoryId.ToString());
        }
        public CachedJsonFileStore(string storeDirectoryPath)
        {
            this.fileStore = new JsonFileStore<T>(storeDirectoryPath);
            cache = new MemoryCache(cacheRepositoryId.ToString());
        }

        public Guid Save(T data)
        {
            Guid id = Guid.NewGuid();
            fileStore.SaveOrUpdate(id, data);
            AddToCache(id, data);
            UpdateCache(cacheIdForRepositoryEntries, fileStore.GetRepositoryEntries());
            return id;
        }

        public void SaveOrUpdate(KeyValuePair<Guid, T> entry)
        {
            fileStore.SaveOrUpdate(entry);
            UpdateCache(entry.Key.ToString(), entry.Value);
        }

        public void SaveOrUpdate(Guid id, T data)
        {
            fileStore.SaveOrUpdate(id, data);
            UpdateCache(id.ToString(), data);
        }

        public T Load(Guid id)
        {
            return ReadRepositoryData(id);
        }

        public IEnumerable<KeyValuePair<Guid, T>> Load()
        {
            return LazyLoad().Select(d => new KeyValuePair<Guid, T>(d.Key, d.Value.Value));
        }

        public IEnumerable<KeyValuePair<Guid, Lazy<T>>> LazyLoad()
        {
            return ReadRepositoryEntries()
                .Select(f => new KeyValuePair<Guid, Lazy<T>>(
                    Guid.Parse(f.Name),
                    new Lazy<T>(() => Load(Guid.Parse(f.Name)))
                    ));
        }

        public void Remove(Guid id)
        {
            fileStore.Remove(id);
            cache.Remove(id.ToString());
            UpdateCache(cacheIdForRepositoryEntries, fileStore.GetRepositoryEntries());
        }

        private T ReadRepositoryData(Guid id)
        {
            var key = id.ToString();
            var dataFromCache = cache[key];
            var data = dataFromCache ?? fileStore.Load(id);
            if (dataFromCache == null)
            {
                AddToCache(id, data);
            }
            return (T)data;
        }

        private void AddToCache(Guid id, object data)
        {
            AddToCache(id.ToString(), data);
        }

        private void AddToCache(string id, object data)
        {
            cache.Add(id, data, new CacheItemPolicy());
        }

        private void UpdateCache(string key, object newData)
        {
            if (cache.Contains(key))
            {
                cache[key] = newData;
                return;
            }

            AddToCache(key, newData);
        }

        private IEnumerable<FileInfo> ReadRepositoryEntries()
        {
            var dataFromCache = cache[cacheIdForRepositoryEntries] as IEnumerable<FileInfo>;
            var data = dataFromCache ?? fileStore.GetRepositoryEntries();
            if (dataFromCache == null)
            {
                AddToCache(cacheIdForRepositoryEntries, data);
            }
            return data;
        }
    }
}
