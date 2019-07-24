using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ASKQ.Controllers
{
    public class YesNoQuestionController : ApiController
    {
        [HttpPost]
        public void Post([FromBody]YesNoQuestion q)
        {
            try
            {
                q.insert();
            }
            catch (Exception ex)
            {
                throw new Exception("Error in insert" + ex);
            }
        }

        [HttpGet]
        public YesNoQuestion YesOrNo(int id)
        {
            YesNoQuestion a = new YesNoQuestion();
            return a.NumAnswers(id);
        }


        public IEnumerable<YesNoQuestion> Get(int courseId, int lessonId)
        {
            YesNoQuestion a = new YesNoQuestion();
            List<YesNoQuestion> ql = a.YesNoquestionList(courseId, lessonId);
            return ql;
        }


        public void PostUpdates(int Qid, string content, string questionTitle, bool correctAnswer, string uploadDate)
        {
            YesNoQuestion q = new YesNoQuestion();
            q.UpdateYNQuestion(Qid, content, questionTitle, correctAnswer, uploadDate);
        }

        [HttpGet]
        public IEnumerable<YesNoQuestion> Get(int QuestionId)
        {
            YesNoQuestion q = new YesNoQuestion();
            List<YesNoQuestion> ql = q.YNkahoot(QuestionId);
            return ql;
        }

        //changed
        [HttpPut]
        public void UpdateIsDeletedYN(int questionId)
        {
            YesNoQuestion m = new YesNoQuestion();
            m.UpdateIsDeletedYN(questionId);
        }
    }
}
