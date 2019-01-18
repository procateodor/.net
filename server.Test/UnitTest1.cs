using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApi.Services;
namespace server.Test
{
    [TestClass]
    public class UnitTest1
    {
        public UserService service;

        [TestMethod]
        public void GivenACorrectSetOfDataShouldNotReturnNull()
        {
            string username = "test";
            string password ="9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
            var user = service.Authenticate(username, password);
        
        }
    }
}
