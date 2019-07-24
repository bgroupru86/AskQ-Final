using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ASKQ.Controllers
{
    public class studentsAnswersController : ApiController
    {
        [HttpPost]
        public void Post([FromBody]studentsAnswers a)
        {
            try
            {
                a.insert();
            }
            catch (Exception ex)
            {
                throw new Exception("Error in insert" + ex);
            }
        }

        [HttpGet]
        [Route("api/studentsAnswers/get")]
        public IEnumerable<studentsAnswers> Get(int id)
        {
            studentsAnswers a = new studentsAnswers();
            List<studentsAnswers> sa = a.ReadList(id);
            return sa;
        }

    }
}
