using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Entities {
    public class User {
        public ObjectId Id { get; set; }

        [BsonElement ("FirstName")]
        public string FirstName { get; set; }

        [BsonElement ("LastName")]
        public string LastName { get; set; }

        [BsonElement ("Username")]
        public string Username { get; set; }

        [BsonElement ("Password")]
        public string Password { get; set; }

        [BsonElement ("Token")]
        public string Token { get; set; }

        [BsonElement ("Role")]
        public int Role { get; set; }

        public User (string username, string password, string firstname, string lastname) {
            this.Username = username;
            this.Password = password;
            this.FirstName = firstname;
            this.LastName = lastname;
            this.Role = 0;
        }
    }
}