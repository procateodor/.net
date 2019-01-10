using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services {
    public interface IUserService {
        User Authenticate (string username, string password);
        IEnumerable<User> GetAll ();
    }

    public class UserService : IUserService {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private readonly IMongoCollection<User> _users;

        private readonly AppSettings _appSettings;

        public UserService (IOptions<AppSettings> appSettings, IConfiguration config) {
            _appSettings = appSettings.Value;

            var client = new MongoClient (config.GetConnectionString ("database"));
            var database = client.GetDatabase ("dotnet");
            _users = database.GetCollection<User> ("Users");
        }

        public User Authenticate (string username, string password) {
            var user = _users.Find<User> (u => u.Username == username && u.Password == password).FirstOrDefault ();

            // return null if user not found
            if (user == null) {
                return null;
            }

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler ();
            var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new Claim[] {
                new Claim (ClaimTypes.Name, user.Id.ToString ())
                }),
                Expires = DateTime.UtcNow.AddDays (7),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken (tokenDescriptor);
            user.Token = tokenHandler.WriteToken (token);

            _users.ReplaceOne(u => u.Id == user.Id, user);

            // remove password before returning
            user.Password = null;

            return user;
        }

        public IEnumerable<User> GetAll () {
            // return users without passwords
            return _users.Find (user => true).ToList ();
        }
    }
}