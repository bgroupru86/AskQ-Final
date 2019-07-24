using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ASKQ.Controllers
{
    public class StudentInLessonController : ApiController
    {

        // GET api/<controller>/5
        public List<StudentInLesson> Get(string id)
        {
            try
            {
                List<StudentInLesson> si = new List<StudentInLesson>();
                StudentInLesson s = new StudentInLesson();
                si = s.GetMyCourses(id);
                return si;
            }
            catch (Exception ex)
            {

                throw new Exception("Error to save student in file" + ex);
            }
        }
        public void put(List<StudentInLesson> students)
        {
            try
            {
                StudentInLesson s = new StudentInLesson();
                s.insertStudentTemp(students);
            }
            catch (Exception ex)
            {

                throw new Exception("Error to save student" + ex);
            }

        }


        // POST api/<controller>
        public void Post([FromBody]StudentInLesson s)
        {
            try
            {
                s.insertStudent();
            }
            catch (Exception ex)
            {

                throw new Exception("Error to save student" + ex);
            }

        }

        public List<StudentInLesson> Get(int lessonId, int courseId)
        {
            try
            {
                List<StudentInLesson> si = new List<StudentInLesson>();
                StudentInLesson s = new StudentInLesson();
                si=s.saveAllStudent(lessonId, courseId);


                return si;
            }
            catch (Exception ex)
            {

                throw new Exception("Error to save student in file" + ex);
            }
        }

        // DELETE api/<controller>/5
        public void Delete(string studentId, int lessonCode)
        {
            try
            {
                StudentInLesson s = new StudentInLesson();
                s.LogOutLesson(studentId, lessonCode);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void Delete(int lessCode)
        {
            try
            {
                StudentInLesson s = new StudentInLesson();
                s.DeleteAllStudent(lessCode);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}