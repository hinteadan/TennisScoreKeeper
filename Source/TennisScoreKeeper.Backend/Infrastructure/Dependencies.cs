using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using H.TennisScoreKeeper.Data.Stores;

namespace TennisScoreKeeper.Backend.Infrastructure
{
    internal class Dependencies
    {
        internal static void Init()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterInstance<JsonFileStore>(new JsonFileStore()).AsImplementedInterfaces();

            GlobalConfiguration.Configuration.DependencyResolver = 
                new AutofacWebApiDependencyResolver(builder.Build());
        }
    }
}