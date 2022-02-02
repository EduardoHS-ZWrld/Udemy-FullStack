using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace ProEventos.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args) //Vai fazer as configurações. Trás os diferentes appsettings, para desenvolvimento e para uso 
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
