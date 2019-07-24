using ASKQ.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASKQ.Models
{
    public class StudentLikes
    {
        int questionId;
        string studentId;
        int count;

        public StudentLikes()
        {
        }

        public StudentLikes(string _studentId, int _questionId,int _count)
        {
            StudentId = _studentId;
            QuestionId = _questionId;
            Count = _count;
        }

        public string StudentId { get => studentId; set => studentId = value; }
        public int QuestionId { get => questionId; set => questionId = value; }
        public int Count { get => count; set => count = value; }

        public StudentLikes GetLikes(int questionId, string studentId)
        {
            StudentLikes s = new StudentLikes();
            DBservices db = new DBservices();
             s = db.GetLikes(questionId, studentId);
            return s;
        }
        public void InsertLike()
        {
            DBservices dbs = new DBservices();
            dbs.InsertLike(this);
        }
        public void DeleteLike()
        {
            DBservices dbs = new DBservices();
            dbs.DeleteLike(this);
        }
        public List<StudentLikes> CheckLikes(string studentId)
        {
            DBservices dbs = new DBservices();
           return dbs.CheckLikes(studentId);
        }
    }
}