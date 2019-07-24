using ASKQ.Models.DAL;
using System.Collections.Generic;

namespace ASKQ.Models
{
    public class QuestionAndAnswer
    {
        public int ID { get; set; }
        public int QuestionId { get; set; }
        public string QuestionContent { get; set; }
        public int AnswerId { get; set; }
        public string AnswerContent { get; set; }

    public QuestionAndAnswer() { }

        public QuestionAndAnswer(int questionId, string questionContent, int answerId, string answerContent)
        {
            QuestionId = questionId;
            QuestionContent = questionContent;
            AnswerId = answerId;
            AnswerContent = answerContent;
        }

        public void insert()
        {
            DBservices dbs = new DBservices();
            dbs.insertAnswerAndQuestion(this);
        }

        public int UpdateAnswer(int id)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateAnswer(id);
        }

    }
}