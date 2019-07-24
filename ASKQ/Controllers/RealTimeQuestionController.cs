using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;


namespace ASKQ.Controllers
{
    public class RealTimeQuestionController : ApiController
    {
        [HttpPost]
        [Route("api/RealTimeQuestion/post")]
        public void Post([FromBody]RealTimeQuestion q)
        {
            try
            {
                q.insert();
            }
            catch (Exception ex)
            {
                throw new Exception("Error in insert" + ex);
            }
        }

        [HttpGet]
        [Route("api/RealTimeQuestion/get")]
        public IEnumerable<RealTimeQuestion> Get(int lessonCode)
        {
            RealTimeQuestion q = new RealTimeQuestion();
            List<RealTimeQuestion> ql = q.ReadList(lessonCode);
            return ql;
        }

        [HttpPut]
        [Route("api/RealTimeQuestion/put")]
        public void PostUpdates(int Qid , string field)
        {
            RealTimeQuestion r= new RealTimeQuestion();
            r.UpdateQuestion(Qid, field);
        }

        [HttpGet]
        [Route("api/RealTimeQuestion")]
        public RealTimeQuestion forYesNoQuestion(int id)
        {
            RealTimeQuestion r = new RealTimeQuestion();
            return r.forYesNoQuestion(id);
        }

    }
}
