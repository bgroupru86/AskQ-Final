using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ASKQ.Controllers
{
    public class QuestionAndAnswerController : ApiController
    {
        [HttpPost]
        [Route("api/QuestionAndAnswer/post")]
        public void Post([FromBody]QuestionAndAnswer qa)
        {
            try
            {
                qa.insert();
            }
            catch (Exception ex)
            {
                throw new Exception("Error in insert" + ex);
            }
        }

        [HttpPut]
        [Route("api/QuestionAndAnswer/put")]
        public void PostUpdates(int Qid)
        {
            QuestionAndAnswer r = new QuestionAndAnswer();
            r.UpdateAnswer(Qid);
        }

    }
}
