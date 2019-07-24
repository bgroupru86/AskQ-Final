using ASKQ.Models.DAL;
using System.Collections.Generic;

namespace ASKQ.Models
{
    public class studentsAnswers
    {
        int answerId;
        string content;
        int questionId;
        int lessonCode;
        string studentId;
        bool theBest;

        public int AnswerId { get => answerId; set => answerId = value; }
        public string Content { get => content; set => content = value; }
        public int QuestionId { get => questionId; set => questionId = value; }
        public int LessonCode { get => lessonCode; set => lessonCode = value; }
        public string StudentId { get => studentId; set => studentId = value; }
        public bool TheBest { get => theBest; set => theBest = value; }

        public studentsAnswers()
        {
        }
        public studentsAnswers(int _answerId, string _content, int _questionId, int _lessonCode, string _studentId, bool _theBest)
        {
            AnswerId = _answerId;
            Content = _content;
            QuestionId = _questionId;
            LessonCode = _lessonCode;
            StudentId = _studentId;
            TheBest = _theBest;
        }
        public void insert()
        {
            DBservices dbs = new DBservices();
            dbs.insertAnswer(this);
        }
        public List<studentsAnswers> ReadList(int id)
        {
            DBservices dbs = new DBservices();
            List<studentsAnswers> sa = dbs.AList("ASKQConnection", "studentsAnswers", id);
            return sa;
        }

    }
}