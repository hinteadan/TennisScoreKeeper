using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using H.TennisScoreKeeper.Data.Stores;
using Newtonsoft.Json;

namespace H.TennisScoreKeeper.Data.Generics.Stores
{
    public class JsonFileStore<T> : IStoreDataAsKeyValueOf<T>
    {
        private readonly JsonFileStore jsonFileStore;
        private readonly DirectoryInfo storeDirectory;

        public JsonFileStore()
        {
            string path = ConfigurationManager.AppSettings["JsonFileStore.StorePath"];
            if (string.IsNullOrWhiteSpace(path))
            {
                path = string.Format("{0}JsonFileStore", AppDomain.CurrentDomain.BaseDirectory);
            }
            path += string.Format("\\{0}", typeof(T).FullName);

            this.storeDirectory = new DirectoryInfo(path);
            this.jsonFileStore = new JsonFileStore(storeDirectory.FullName);
        }
        public JsonFileStore(string storeDirectoryPath)
        {
            if (string.IsNullOrWhiteSpace(storeDirectoryPath))
            {
                throw new ArgumentException("Paramter cannot be null or empty", "storeDirectoryPath");
            }

            string path = string.Format("{0}\\{1}", storeDirectoryPath, typeof(T).FullName);
            this.storeDirectory = new DirectoryInfo(path);
            this.jsonFileStore = new JsonFileStore(storeDirectory.FullName);
        }

        public Guid Save(T data)
        {
            return jsonFileStore.Save(data);
        }

        public void SaveOrUpdate(KeyValuePair<Guid, T> entry)
        {
            jsonFileStore.SaveOrUpdate(new KeyValuePair<Guid, object>(entry.Key, entry.Value));
        }

        public void SaveOrUpdate(Guid id, T data)
        {
            jsonFileStore.SaveOrUpdate(id, data);
        }

        public T Load(Guid id)
        {
            return JsonConvert.DeserializeObject<T>(
                File.ReadAllText(GenerateDataFilePath(id))
                );
        }

        public IEnumerable<KeyValuePair<Guid, T>> Load()
        {
            return LazyLoad().Select(d => new KeyValuePair<Guid, T>(d.Key, d.Value.Value));
        }

        public IEnumerable<KeyValuePair<Guid, Lazy<T>>> LazyLoad()
        {
            return GetRepositoryEntries()
                .Select(f => new KeyValuePair<Guid, Lazy<T>>(
                    Guid.Parse(f.Name),
                    new Lazy<T>(() => Load(Guid.Parse(f.Name)))
                    ));
        }

        public void Remove(Guid id)
        {
            jsonFileStore.Remove(id);
        }

        internal string GenerateDataFilePath(Guid id)
        {
            return string.Format("{0}\\{1}", storeDirectory.FullName, id);
        }

        internal IEnumerable<FileInfo> GetRepositoryEntries()
        {
            return storeDirectory.GetFiles();
        }
    }
}
