using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AccountController : BaseAPIController
    {
        private readonly ITokenService tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            this.tokenService = tokenService;
        }

        public DataContext _context { get; }

        [Route("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterUserDto registerUserDto)
        {
            using var hmac = new HMACSHA512();

            if(await UserExists(registerUserDto.UserName)) return BadRequest("User already exists");
           
            AppUser appUser = new AppUser{
                UserName = registerUserDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUserDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(appUser);

            await _context.SaveChangesAsync();

            return new UserDto{UserName = registerUserDto.UserName, Token =  tokenService.CreateToken(appUser) };
        }

        public async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(user => user.UserName == userName.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(RegisterUserDto registerUserDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(user => user.UserName == registerUserDto.UserName);

            if(user == null) return Unauthorized("User does not exists"); 

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUserDto.Password));

           for(int index =0; index < user.PasswordHash.Length; index++)
           {
                if(computedHash[index] != user.PasswordHash[index]) return Unauthorized("Invalid password");
           }

            return user;
        }

    }
}