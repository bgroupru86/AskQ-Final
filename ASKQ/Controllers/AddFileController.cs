using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace ASKQ.Controllers
{
    public class AddFileController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<AddFile> Get(int lessonId,int courseId)
        {
            try
            {
                List<AddFile> af = new List<AddFile>();
                AddFile f = new AddFile();
                af = f.GetFiles(lessonId, courseId);
                return af;

            }
            catch (Exception ex)
            {
                throw new Exception("error with getting the files" + ex);
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]AddFile f)
        {
            try
            {
                f.AddNewFile();
            }
            catch (Exception ex)
            {

                throw new Exception("Error in Add a New file" + ex);
            }

        }

        public void post(int lessonid, int courseid)
        {
            try
            {
                string path = Path.Combine(HostingEnvironment.MapPath("~/uploadedFiles/" + courseid.ToString()), lessonid.ToString());
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
            }
            catch (Exception ex)
            {

                throw new Exception("Error in Add a New folder" + ex);
            }
            return;
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}