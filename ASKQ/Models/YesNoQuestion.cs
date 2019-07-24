using ASKQ.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ASKQ.Controllers;

namespace ASKQ.Models
{
    public class YesNoQuestion
    {
        public int ID { get; set; }
        public int RealTimeQuestionId { get; set; }
        public string Content { get; set; }
        public string QuestionTitle { get; set; }
        public bool CorecctAnswer { get; set; }
        public string UploadDate { get; set; }
        public string FileLink { get; set; }
        public int NoCounter { get; set; }
        public int YesCounter { get; set; }
        public int LessonId { get; set; }
        public int CourseId { get; set; }

        public YesNoQuestion() { }
        public YesNoQuestion(int RealTimeQuestionid, string content, string questionTitle, bool correctAnswer, string uploadDate, string fileLink, int noCounter, int yesCounter, int lessonId, int courseId)
        {
            RealTimeQuestionId = RealTimeQuestionid;
            Content = content;
            QuestionTitle = questionTitle;
            CorecctAnswer = correctAnswer;
            UploadDate = uploadDate;
            FileLink = fileLink;
            NoCounter = noCounter;
            YesCounter = yesCounter;
            LessonId = lessonId;
            CourseId = courseId;
        }
        public void insert()
        {
            DBservices dbs = new DBservices();
            dbs.insert(this);
        }
        public YesNoQuestion NumAnswers(int id)
        {
            DBservices dbs = new DBservices();
            return dbs.NumAnswers("ASKQConnection", "YesNoQuestion", id);
        }
        public List<YesNoQuestion> YesNoquestionList(int courseId, int lessonId)
        {
            DBservices dbs = new DBservices();
            List<YesNoQuestion> ql = dbs.YesNoquestionList("ASKQConnection", "YesNoQuestion", courseId, lessonId);
            return ql;
        }
        public int UpdateYNQuestion(int Qid, string content, string questionTitle, bool correctAnswer, string uploadDate)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateYNQuestion(Qid, content, questionTitle, correctAnswer, uploadDate);
        }
        public List<YesNoQuestion> YNkahoot(int QuestionId)
        {
            DBservices dbs = new DBservices();
            List<YesNoQuestion> ql = dbs.YNkahoot("ASKQConnection", "MultipleChoiceQuestion", QuestionId);
            return ql;
        }

        //changed
        public int UpdateIsDeletedYN(int questionId)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateIsDeletedYN(questionId);
        }
    }
}
