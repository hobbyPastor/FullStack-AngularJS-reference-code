using FullStackReference.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FullStackReference.Controllers
{
    public class TopicsController : ApiController
    {
        private IMessageBoardRepository _repo;

        public TopicsController(IMessageBoardRepository repo)
        {
            _repo = repo;
        }
        public IEnumerable<Topic> Get()
        {
            List<Topic> topics =_repo.GetTopics()
                .OrderByDescending(t => t.Created)
                .Take(50)
                .ToList();
            return topics;
        }
    }
}
