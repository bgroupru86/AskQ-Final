using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ASKQ.Controllers
{
    public class StudentLikesController : ApiController
    {
        // GET api/<controller>
        public StudentLikes Get(int questionId, string studentId)
        {
            try
            {
               StudentLikes s = new StudentLikes();
               return s.GetLikes(questionId, studentId);

            }
            catch (Exception ex)
            {
                throw new Exception("error with check Like" + ex);
            }
        }
        public List<StudentLikes> Get(string studentId)
        {
            try
            {
                StudentLikes s = new StudentLikes();
                return s.CheckLikes(studentId);
            }
            catch (Exception ex)
            {
                throw new Exception("error with check Like" + ex);
            }
        }

        // POST api/<controller>
        public void Post([FromBody]StudentLikes s)
        {
            try
            {
                s.InsertLike();
            }
            catch (Exception ex)
            {

                throw new Exception("error with Put Like" + ex);
                
            }
        }

        // DELETE api/<controller>/5
        public void Delete([FromBody]StudentLikes s)
        {
            s.DeleteLike();
        }
    }
}