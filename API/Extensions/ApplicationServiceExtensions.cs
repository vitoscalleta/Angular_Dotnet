using System.Text;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        
        public static IServiceCollection AddApplicationServices(this IServiceCollection service, IConfiguration config)
        {
            service.AddScoped<ITokenService,TokenService>();
            service.AddDbContextPool<DataContext>(options => options.UseSqlServer(config.GetConnectionString("DbConnectionString")));
            return service;
        }

        public static IServiceCollection AddIdentityServices(this IServiceCollection service, IConfiguration config)
        {
             service.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => {options.TokenValidationParameters = new TokenValidationParameters{
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                    ValidateAudience = false,
                    ValidateIssuer = false,
            };});
            return service;
        }

    }
}