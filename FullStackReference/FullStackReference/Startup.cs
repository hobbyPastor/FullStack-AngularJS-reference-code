using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FullStackReference.Startup))]
namespace FullStackReference
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
