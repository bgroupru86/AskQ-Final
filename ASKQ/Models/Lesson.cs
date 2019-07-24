using ASKQ.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASKQ.Models
{
    public class Lesson
    {
        int lessonId;
        string lessonName;
        string info;
        DateTime dateAndTime;
        bool isActive;
        int timeStampLesson;
        int courseId;
        string id;
        int lessonCode;
        bool isDeleted;


        public int LessonId { get => lessonId; set => lessonId = value; }
        public string LessonName { get => lessonName; set => lessonName = value; }
        public string Info { get => info; set => info = value; }
        public DateTime DateAndTime { get => dateAndTime; set => dateAndTime = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public int TimeStampLesson { get => timeStampLesson; set => timeStampLesson = value; }
        public int CourseId { get => courseId; set => courseId = value; }
        public string Id { get => id; set => id = value; }
        public int LessonCode { get => lessonCode; set => lessonCode = value; }
        public bool IsDeleted { get => isDeleted; set => isDeleted = value; }

        public Lesson()
        {
        }
        public Lesson(int _lessonId, string _id, string _lessonName, string _info, int _timeStampLesson, int _courseId, int _lessonCode, bool _isDeleted)
        {
            LessonId = _lessonId;
            LessonName = _lessonName;
            Info = _info;
            IsActive = false;
            TimeStampLesson = _timeStampLesson;
            CourseId = _courseId;
            Id = _id;
            LessonCode = _lessonCode;
            IsDeleted = _isDeleted;
        }
        public void OpenNewTopic()
        {
            DBservices dbs = new DBservices();
            dbs.OpenNewTopic(this);
        }
        public List<Lesson> GetLesson(string id,int courseId)
        {
            DBservices db = new DBservices();
            List<Lesson> listLesson = db.GetLesson(id, courseId);
            return listLesson;
        }
        public void StartLesson()
        {
            DBservices dbs = new DBservices();
            dbs.StartLesson(this);
        }
        public Lesson CheckActive(int lessonCode)
        {
            Lesson l = new Lesson();
            DBservices dbs = new DBservices();
            l = dbs.CheckActive(lessonCode);
            return l;
        }
        public void EndLesson(int lessonCode)
        {
            DBservices dbs = new DBservices();
            dbs.EndLesson(lessonCode);
        }
        public void UpdateAllLessons(int lessonId, int courseId)
        {
            DBservices dbs = new DBservices();
            dbs.UpdateAllLessons(lessonId, courseId);
        }
        public void UpdateLesson(int lessonId, int courseId, string lessonName, string lessonInfo, int lessonTime)
        {
            DBservices dbs = new DBservices();
            dbs.UpdateLesson(lessonId, courseId, lessonName, lessonInfo, lessonTime);
        }
        public List<Lesson> GetStudentLesson(List<StudentInLesson> s)
        {
            DBservices db = new DBservices();
            List<Lesson> listLesson = db.GetStudentLesson(s);
            return listLesson;
        }
    }
}