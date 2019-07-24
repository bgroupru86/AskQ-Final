using ASKQ.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ASKQ.Controllers
{
    public class MultipleChoiceQuestionController : ApiController
    {
        [HttpPost]
        public void Post([FromBody]MultipleChoiceQuestion mcq)
        {
            try
            {
                mcq.insert();
            }
            catch (Exception ex)
            {
                throw new Exception("Error in insert" + ex);
            }
        }
        [HttpPut]
        [Route("api/MultipleChoiceQuestion/put")]
        public void PostUpdates(int count, string quizTitle)
        {
            MultipleChoiceQuestion m = new MultipleChoiceQuestion();
            m.UpdateQuestions(count, quizTitle);
        }
        [HttpPut]
        [Route("api/MultipleChoiceQuestion/put")]
        public void UpdateCorrectAnswer(int questionId, string answer)
        {
            MultipleChoiceQuestion m = new MultipleChoiceQuestion();
            m.UpdateCorrectAnswer(questionId, answer);
        }
        [HttpGet]
        [Route("api/MultipleChoiceQuestion/get")]
        public IEnumerable<MultipleChoiceQuestion> Get(int courseId, int lessonId)
        {
            MultipleChoiceQuestion a = new MultipleChoiceQuestion();
            List<MultipleChoiceQuestion> ql = a.questionList(courseId, lessonId);
            return ql;
        }
        [HttpPut]
        public void Put([FromBody]MultipleChoiceQuestion q)
        {
            try
            {
                q.UpdateMultipleQuestion();
            }
            catch (Exception ex)
            {

                throw new Exception("Error in update multiQ" + ex);
            }
        }
        [HttpGet]
        public IEnumerable<MultipleChoiceQuestion> Get(int QuestionId)
        {
            MultipleChoiceQuestion a = new MultipleChoiceQuestion();
            List<MultipleChoiceQuestion> ql = a.kahoot(QuestionId);
            return ql;
        }

        //changed
        [HttpPut]
        public void UpdateIsDeleted(int questionId)
        {
            MultipleChoiceQuestion m = new MultipleChoiceQuestion();
            m.UpdateIsDeleted(questionId);
        }
    }
}
