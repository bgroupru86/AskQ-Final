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
    public class LessonController : ApiController
    {
        public Lesson GET(int lessonCode)
        {
            try
            {
                Lesson l = new Lesson();
                return l.CheckActive(lessonCode);
            }
            catch (Exception ex)
            {
                throw new Exception("error with getting active" + ex);
            }
        }
        // GET api/<controller>
        public IEnumerable<Lesson> Get(string id,int courseId)
        {
            try
            {
                List<Lesson> ls = new List<Lesson>();
                Lesson l = new Lesson();
                ls = l.GetLesson(id, courseId);
                return ls;

            }
            catch (Exception ex)
            {
                throw new Exception("error with getting the Courses" + ex);
            }
        }
        // POST api/<controller>
        public void Post([FromBody]Lesson l)
        {
            try
            {
                string path = Path.Combine(HostingEnvironment.MapPath("~/uploadedFiles"), l.CourseId.ToString());
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                l.OpenNewTopic();
            }
            catch (Exception ex)
            {

                throw new Exception("Error in Add a New Course" + ex);
            }
        }
        // PUT api/<controller>/5
        public void Put([FromBody]Lesson l)
        {
            try
            {
                l.StartLesson();
            }
            catch (Exception ex)
            {

                throw new Exception("Error in start lesson" + ex);
            }
        }
        public void Put(int lessonCode)
        {
            try
            {
                Lesson l = new Lesson();
                l.EndLesson(lessonCode);
            }
            catch (Exception ex)
            {

                throw new Exception("Error in start Lesson" + ex);
            }
        }
        //changed
        public void Post(int lessonId, int courseId)
        {
            Lesson L = new Lesson();
            L.UpdateAllLessons(lessonId, courseId);
        }
        [HttpPut]
        public void Put(int lessonId, int courseId, string lessonName, string lessonInfo, int lessonTime)
        {
            try
            {
                Lesson l = new Lesson();
                l.UpdateLesson(lessonId, courseId, lessonName, lessonInfo, lessonTime);
            }
            catch (Exception ex)
            {

                throw new Exception("Error in update Lesson" + ex);
            }
        }
        [HttpPut]
        [Route("api/Lesson/GetLes")]
        public IEnumerable<Lesson> PUT(List<StudentInLesson> s)
        {
            try
            {
                List<Lesson> ls = new List<Lesson>();
                Lesson l = new Lesson();
                ls = l.GetStudentLesson(s);
                return ls;

            }
            catch (Exception ex)
            {
                throw new Exception("error with getting the Courses" + ex);
            }
        }




    }
}