using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Caching;

namespace H.TennisScoreKeeper.Data.Stores
{
    public class WebCachedJsonFileStore : IStoreDataAsKeyValue
    {
        private readonly Cache cache = new Cache();
        private readonly JsonFileStore fileStore;
        private readonly string cacheIdForRepositoryEntries = "RepositoryEntries";

        public WebCachedJsonFileStore()
        {
            this.fileStore = new JsonFileStore();
        }
        public WebCachedJsonFileStore(string storeDirectoryPath)
        {
            this.fileStore = new JsonFileStore(storeDirectoryPath);
        }

        public Guid Save(object data)
        {
            Guid id = Guid.NewGuid();
            fileStore.SaveOrUpdate(id, data);
            AddToCache(id, data);
            return id;
        }

        public void SaveOrUpdate(KeyValuePair<Guid, object> entry)
        {
            fileStore.SaveOrUpdate(entry);
        }

        public void SaveOrUpdate(Guid id, object data)
        {
            fileStore.SaveOrUpdate(id, data);
        }

        public object Load(Guid id)
        {
            return ReadRepositoryData(id);
        }

        private object ReadRepositoryData(Guid id)
        {
            var key = id.ToString();
            var dataFromCache = cache[key];
            var data = dataFromCache ?? fileStore.Load(id);
            if (dataFromCache == null)
            {
                AddToCache(id, data);
            }
            return data;
        }

        public IEnumerable<KeyValuePair<Guid, object>> Load()
        {
            return LazyLoad().Select(d => new KeyValuePair<Guid, object>(d.Key, d.Value.Value));
        }

        public IEnumerable<KeyValuePair<Guid, Lazy<object>>> LazyLoad()
        {
            return ReadRepositoryEntries()
                .Select(f => new KeyValuePair<Guid, Lazy<object>>(
                    Guid.Parse(f.Name),
                    new Lazy<object>(() => Load(Guid.Parse(f.Name)))
                    ));
        }

        public void Remove(Guid id)
        {
            throw new NotImplementedException();
        }

        private void AddToCache(Guid id, object data)
        {
            AddToCache(id.ToString(), data, fileStore.GenerateDataFilePath(id));
        }

        private void AddToCache(string id, object data, string dependencyPath)
        {
            cache.Add(id, data, new CacheDependency(dependencyPath),
                Cache.NoAbsoluteExpiration, Cache.NoSlidingExpiration, CacheItemPriority.Normal, null);
        }

        private IEnumerable<FileInfo> ReadRepositoryEntries()
        {
            var dataFromCache = cache[cacheIdForRepositoryEntries] as IEnumerable<FileInfo>;
            var data = dataFromCache ?? fileStore.GetRepositoryEntries();
            if (dataFromCache == null)
            {
                AddToCache(cacheIdForRepositoryEntries, data, fileStore.GetRepositoryDirectoryPath());
            }
            return data;
        }
    }
}
