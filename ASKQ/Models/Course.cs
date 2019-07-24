using ASKQ.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASKQ.Models
{
    public class Course
    {
        int courseId;
        string courseName;
        string info;
        int courseYear;
        string id;
        List<Lesson> les=new List<Lesson>();

        public int CourseId { get => courseId; set => courseId = value; }
        public string CourseName { get => courseName; set => courseName = value; }
        public string Info { get => info; set => info = value; }
        public int CourseYear { get => courseYear; set => courseYear = value; }
        public string Id { get => id; set => id = value; }
        public List<Lesson> Les { get => les; set => les = value; }

        public Course(int _courseId, string _courseName, string _info, int _courseYear, string _id,Lesson _les)
        {
            _les = new Lesson();
            CourseId = _courseId;
            CourseName = _courseName;
            Info = _info;
            CourseYear = _courseYear;
            Id = _id;

        }
        public Course()
        {
        }   
        public void OpenNewCourse()
        {
            DBservices dbs = new DBservices();
            dbs.OpenNewCourse(this);           
        }
        public List<Course> GetCourse(string id)
        {
            DBservices db = new DBservices();
            List<Course> listCourses = db.GetCourse(id);
            return listCourses;
        }
        public void UpdateAllCourses(int courseId)
        {
            DBservices dbs = new DBservices();
            dbs.UpdateAllCourses(courseId);
        }
        public void UpdateCourse(int courseId, string courseName, string courseInfo)
        {
            DBservices dbs = new DBservices();
            dbs.UpdateCourse(courseId, courseName, courseInfo);
        }
        public List<Course> GetStudentCourse(List<StudentInLesson> s)
        {
            DBservices db = new DBservices();
            List<Course> listCourses = db.GetStudentCourse(s);
            return listCourses;
        }

    }
}