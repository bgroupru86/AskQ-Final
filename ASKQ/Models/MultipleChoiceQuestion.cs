using ASKQ.Models.DAL;
using System.Collections.Generic;

namespace ASKQ.Models
{
    public class MultipleChoiceQuestion
    {
        public int ID { get; set; }
        public string QuestionContent { get; set; }
        public int LessonId { get; set; }
        public int CourseId { get; set; }
        public string Answer1Content { get; set; }
        public string Answer2Content { get; set; }
        public string Answer3Content { get; set; }
        public string Answer4Content { get; set; }
        public int Timer { get; set; }
        public string CorrectAnswer { get; set; }
        public string QuestionTitle { get; set; }
        public string QuizTitle { get; set; }
        public int QuizNum { get; set; }
        public string UploadDate { get; set; }
        public int count1 { get; set; }
        public int count2 { get; set; }
        public int count3 { get; set; }
        public int count4 { get; set; }


        public MultipleChoiceQuestion() { }
        public MultipleChoiceQuestion(int iD, string questionContent, int lessonId, int courseId, string answer1Content, string answer2Content, string answer3Content, string answer4Content, int timer, string correctAnswer, string questionTitle, string quizTitle, int quizNum, string uploadDate, int Count1, int Count2, int Count3, int Count4)
        {
            ID = iD;
            QuestionContent = questionContent;
            LessonId = lessonId;
            CourseId = courseId;
            Answer1Content = answer1Content;
            Answer2Content = answer2Content;
            Answer3Content = answer3Content;
            Answer4Content = answer4Content;
            Timer = timer;
            CorrectAnswer = correctAnswer;
            QuestionTitle = questionTitle;
            QuizTitle = quizTitle;
            QuizNum = quizNum;
            UploadDate = uploadDate;
            Count1 = count1;
            Count2 = count2;
            Count3 = count3;
            Count4 = count4;
        }
        public void insert()
        {
            DBservices dbs = new DBservices();
            dbs.insertMultipleChoiceQuestion(this);
        }
        public int UpdateQuestions(int count, string quizTitle)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateQuestions(count, quizTitle);
        }
        public int UpdateCorrectAnswer(int questionId, string answer)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateCorrectAnswer(questionId, answer);
        }
        public List<MultipleChoiceQuestion> questionList(int courseId, int lessonId)
        {
            DBservices dbs = new DBservices();
            List<MultipleChoiceQuestion> ql = dbs.questionList("ASKQConnection", "MultipleChoiceQuestion", courseId, lessonId);
            return ql;
        }
        public void UpdateMultipleQuestion()
        {
            DBservices dbs = new DBservices();
            dbs.UpdateMultipleQuestion(this);
        }
        public List<MultipleChoiceQuestion> kahoot(int QuestionId)
        {
            DBservices dbs = new DBservices();
            List<MultipleChoiceQuestion> ql = dbs.kahoot("ASKQConnection", "MultipleChoiceQuestion", QuestionId);
            return ql;
        }

        //changed
        public int UpdateIsDeleted(int questionId)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateIsDeleted(questionId);
        }
    }
}