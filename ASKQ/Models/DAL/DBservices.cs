using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using ASKQ.Models;

namespace ASKQ.Models.DAL
{
    public class DBservices
    {
        public SqlConnection connect(string conString)
        {
            // read the connection string from the configuration file
            string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }
        private SqlCommand CreateCommand(string CommandSTR, SqlConnection con)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object
            cmd.Connection = con;              // assign the connection to the command object
            cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 
            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds
            cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure
            return cmd;
        }
        internal void numAnswers(string v, int yesCounter, int noCounter)
        {
            throw new NotImplementedException();
        }
        public void insert(Person p)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                if (p.Type == "Student")
                {
                    string qry = $"INSERT INTO Student(Id, FirstName, LastName, gender, Email, Userpassword, img) VALUES('{p.Id}', '{p.FirstName}', '{p.LastName}', '{p.Gender}', '{p.Email}', '{p.Userpassword}', '{p.Img}')";
                    string connectionString = "ASKQConnection";
                    con = connect(connectionString);
                    cmd = new SqlCommand(qry, con);
                }
                else
                {
                    string qry = $"INSERT INTO Lecturer(Id, FirstName, LastName, gender, Email, Userpassword, img) VALUES('{p.Id}', '{p.FirstName}', '{p.LastName}', '{p.Gender}', '{p.Email}', '{p.Userpassword}', '{p.Img}')";
                    string connectionString = "ASKQConnection";
                    con = connect(connectionString);
                    cmd = new SqlCommand(qry, con);
                }

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }

        }
        public bool checkPersonId(string idP, string typeP)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                if (typeP == "Student")
                {
                    string qry = $"select * from Student where id='{idP}'";
                    string connectionString = "ASKQConnection";
                    con = connect(connectionString);
                    cmd = new SqlCommand(qry, con);
                }
                else
                {
                    string qry = $"select * from Lecturer where id='{idP}'";
                    string connectionString = "ASKQConnection";
                    con = connect(connectionString);
                    cmd = new SqlCommand(qry, con);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                string id = "";
                while (dr.Read())
                {
                    id = Convert.ToString(dr["Id"]);

                }
                if (id == "")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        public Person Login(string PersonId, string userPassword)
        {
            SqlConnection con;
            SqlCommand cmd;
            string qry = $"select * from Student where Id = '{PersonId}' and Userpassword = '{userPassword}'";
            Person p = new Person();
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dr.Read())
                {
                    p.Id = Convert.ToString(dr["Id"]);
                    p.FirstName = Convert.ToString(dr["FirstName"]);
                    p.LastName = Convert.ToString(dr["LastName"]);
                    p.Gender = Convert.ToString(dr["gender"]);
                    p.Email = Convert.ToString(dr["Email"]);
                    p.Userpassword = Convert.ToString(dr["Userpassword"]);
                    p.Img = Convert.ToString(dr["img"]);
                    p.Type = "Student";

                }
                if (p.Id != null)
                {
                    return p;
                }
                else
                {
                    SqlConnection con2;
                    SqlCommand cmd2;
                    string qry2 = $"select * from Lecturer where Id = '{PersonId}' and Userpassword = '{userPassword}'";
                    try
                    {
                        string connectionString = "ASKQConnection2";
                        con2 = connect(connectionString);
                        cmd2 = new SqlCommand(qry2, con2);

                    }
                    catch (Exception ex)
                    {
                        throw (ex);
                    }
                    try
                    {
                        SqlDataReader dr2 = cmd2.ExecuteReader(CommandBehavior.CloseConnection);

                        while (dr2.Read())
                        {
                            p.Id = Convert.ToString(dr2["Id"]);
                            p.FirstName = Convert.ToString(dr2["FirstName"]);
                            p.LastName = Convert.ToString(dr2["LastName"]);
                            p.Gender = Convert.ToString(dr2["gender"]);
                            p.Email = Convert.ToString(dr2["Email"]);
                            p.Userpassword = Convert.ToString(dr2["Userpassword"]);
                            p.Img = Convert.ToString(dr2["img"]);
                            p.Type = "Lecturer";
                        }
                        return p;
                    }
                    catch (Exception ex)
                    {

                        // write to log
                        throw (ex);
                    }
                    finally
                    {
                        // close the db connection
                        con2.Close();
                    }
                }
            }
            catch (Exception ex)
            {

                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void OpenNewCourse(Course c)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"INSERT INTO Course(courseName, info, courseYear, Id) VALUES('{c.CourseName}', '{c.Info}', '{c.CourseYear}', '{c.Id}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }

        }
        public List<Course> GetCourse(string id)
        {
            SqlConnection con;
            SqlCommand cmd;
            String qry = $"select * from Course where Id={id} and isDeleted=0";
            List<Course> lc = new List<Course>();
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dr.Read())
                {
                    Course c = new Course();
                    c.CourseId = Convert.ToInt32(dr["courseId"]);
                    c.CourseName = Convert.ToString(dr["courseName"]);
                    c.Info = Convert.ToString(dr["info"]);
                    c.CourseYear = Convert.ToInt32(dr["courseYear"]);
                    lc.Add(c);
                }
                return lc;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void OpenNewTopic(Lesson l)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"INSERT INTO Lesson(lessonName, info,Id, courseId, isActive,timeStampLesson) VALUES('{l.LessonName}', '{l.Info}','{l.Id}', '{l.CourseId}', '{l.IsActive}', '{l.TimeStampLesson}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }

        }
        public List<Lesson> GetLesson(string id, int idCourse)
        {
            SqlConnection con;
            SqlCommand cmd;
            String qry = $"select C.courseId, l.lessonId, L.lessonName, L.info,L.isActive,L.timeStampLesson, L.isDeleted from Lesson L join Course C on L.courseId=C.courseId where C.Id='{id}' and C.courseId={idCourse} and L.isDeleted=0";
            try
            {
                string connectionString = "ASKQConnection2";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr2 = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                List<Lesson> ls = new List<Lesson>();
                while (dr2.Read())
                {
                    Lesson l = new Lesson();
                    l.LessonId = Convert.ToInt32(dr2["lessonId"]);
                    l.LessonName = Convert.ToString(dr2["lessonName"]);
                    l.Info = Convert.ToString(dr2["info"]);
                    l.IsActive = Convert.ToBoolean(dr2["isActive"]);
                    l.TimeStampLesson = Convert.ToInt32(dr2["timeStampLesson"]);
                    ls.Add(l);
                }
                return ls;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void AddNewFile(AddFile f)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"INSERT INTO Files(lessonId, courseId, fileName, fileDescription,path,typeFile,size) VALUES('{f.LessonId}', '{f.CourseId}', '{f.FileName}', '{f.FileDescription}','{f.Path}','{f.TypeFile}',{f.Size})";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }


        }
        public List<AddFile> GetFiles(int lessonId, int courseId)
        {
            SqlConnection con;
            SqlCommand cmd;
            String qry = $"select * from Files f where f.courseId={courseId} and f.lessonId={lessonId}";
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                List<AddFile> af = new List<AddFile>();
                while (dr.Read())
                {
                    AddFile f = new AddFile();
                    f.CourseId = courseId;
                    f.LessonId = lessonId;
                    f.Idfile = Convert.ToInt32(dr["idFile"]);
                    f.FileName = Convert.ToString(dr["fileName"]);
                    f.FileDescription = Convert.ToString(dr["fileDescription"]);
                    f.Path = Convert.ToString(dr["path"]);
                    f.TypeFile = Convert.ToString(dr["typeFile"]);
                    f.Size = Convert.ToDouble(dr["size"]);

                    af.Add(f);
                }
                return af;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void insert(RealTimeQuestion q)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {

                string qry = $"INSERT INTO RealTimeQuestion(content, lessonCode, isDeleted, isAnswered, likeCounter, studentId) VALUES('{q.Content}', {q.lessonCode},0,0,0,'{q.studentId}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }

        }
        public void insert(YesNoQuestion q)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {

                string qry = $"INSERT INTO YesNoQuestion(RealTimeQuestionId, content, questionTitle, correctAnswer, uploadDate, fileLink, yesAmount, noAmount, lessonId, courseId) VALUES({q.RealTimeQuestionId}, '{q.Content}', '{q.QuestionTitle}', '{q.CorecctAnswer}', '{q.UploadDate}', '{q.FileLink}', {q.YesCounter}, {q.NoCounter}, {q.LessonId}, {q.CourseId})";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public List<RealTimeQuestion> QList(string conString, string tableName, int lessonCode)
        {
            SqlConnection con = null;
            List<RealTimeQuestion> lq = new List<RealTimeQuestion>();
            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * FROM " + tableName + " where isDeleted=0 AND isAnswered=0 and lessonCode=" + lessonCode;
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    RealTimeQuestion q = new RealTimeQuestion();

                    q.studentId = Convert.ToString(dr["studentId"]);
                    q.ID = Convert.ToInt32(dr["questionId"]);
                    q.Content = (string)dr["content"];
                    q.likeCounter = Convert.ToInt32(dr["likeCounter"]);

                    lq.Add(q);
                }

                return lq;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        //---------------------------------------------------------------------------------
        // get numbers of yes\no from the DB - dataReader
        //---------------------------------------------------------------------------------
        public YesNoQuestion NumAnswers(string conString, string tableName, int id)
        {
            SqlConnection con = null;
            YesNoQuestion a = new YesNoQuestion();

            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * FROM " + tableName + " where RealTimeQuestionId=" + id;
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    a.ID = Convert.ToInt32(dr["questionId"]);
                    a.YesCounter = Convert.ToInt32(dr["yesAmount"]);
                    a.NoCounter = Convert.ToInt32(dr["noAmount"]);
                }

                return a;

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        public int UpdateQuestion(int r, string field)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            String cStr = "UPDATE RealTimeQuestion SET " + field + "= 1 WHERE questionId = " + r;

            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public int UpdateAnswer(int r)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "UPDATE studentsAnswers SET theBest= 1 WHERE answerId = " + r;
            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public RealTimeQuestion forYesNoQuestion(string conString, string tableName, int id)
        {
            SqlConnection con = null;
            RealTimeQuestion r = new RealTimeQuestion();

            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * FROM " + tableName + " where questionId=" + id;
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    r.ID = Convert.ToInt32(dr["questionId"]);
                    r.Content = (string)dr["content"];
                }

                return r;

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        public void insertAnswer(studentsAnswers a)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"INSERT INTO studentsAnswers(content, questionId, lessonCode, studentId, theBest) VALUES('{a.Content}', {a.QuestionId}, {a.LessonCode},'{a.StudentId}','{a.TheBest}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public List<studentsAnswers> AList(string conString, string tableName, int id)
        {
            SqlConnection con = null;
            List<studentsAnswers> al = new List<studentsAnswers>();
            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * FROM " + tableName + " where questionId=" + id;
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    studentsAnswers a = new studentsAnswers();

                    a.AnswerId = Convert.ToInt32(dr["answerId"]);
                    a.Content = (string)dr["content"];
                    a.QuestionId = Convert.ToInt32(dr["questionId"]);

                    al.Add(a);
                }

                return al;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        public void insertAnswerAndQuestion(QuestionAndAnswer qa)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {

                string qry = $"INSERT INTO studentsAnswers(questionId, questionContent, answerId, answerContant) VALUES({qa.QuestionId}, '{qa.QuestionContent}', {qa.AnswerId} , '{qa.AnswerContent}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }

        }
        public void insertMultipleChoiceQuestion(MultipleChoiceQuestion m)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {

                string qry = $"INSERT INTO MultipleChoiceQuestion(answer1, answer2, answer3, answer4, correctAnswer, courseId, lessonId, content, questionTitle, quizTitle, timer, quizNumber, uploadDate) VALUES('{m.Answer1Content}', '{m.Answer2Content}', '{m.Answer3Content}', '{m.Answer4Content}', '{m.CorrectAnswer}', {m.CourseId}, {m.LessonId}, '{m.QuestionContent}', '{m.QuestionTitle}', '{m.QuizTitle}', {m.Timer}, {m.QuizNum}, '{m.UploadDate}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }

        }
        public int UpdateQuestions(int count, string quizTitle)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            String cStr = "update MultipleChoiceQuestion set quizTitle='" + quizTitle + "' where quizNumber=" + count;

            cmd = CreateCommand(cStr, con);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public int UpdateCorrectAnswer(int questoionId, string correctAnswer)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "update MultipleChoiceQuestion set correctAnswer='" + correctAnswer + "' where questionId=" + questoionId;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public List<MultipleChoiceQuestion> questionList(string conString, string tableName, int courseId, int lessonId)
        {
            SqlConnection con = null;
            List<MultipleChoiceQuestion> ql = new List<MultipleChoiceQuestion>();
            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * FROM " + tableName + " where courseId=" + courseId + "and lessonId=" + lessonId + " and isDeleted=0";
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    MultipleChoiceQuestion a = new MultipleChoiceQuestion();

                    a.ID = Convert.ToInt32(dr["questionId"]);
                    a.QuestionContent = (string)dr["content"];
                    a.Answer1Content = (string)dr["answer1"];
                    a.Answer2Content = (string)dr["answer2"];
                    a.Answer3Content = (string)dr["answer3"];
                    a.Answer4Content = (string)dr["answer4"];
                    a.Timer = Convert.ToInt32(dr["timer"]);
                    a.CorrectAnswer = (string)dr["correctAnswer"];
                    a.QuizTitle = (string)dr["quizTitle"];
                    a.QuestionTitle = (string)dr["questionTitle"];
                    a.LessonId = Convert.ToInt32(dr["lessonId"]);
                    a.CourseId = Convert.ToInt32(dr["courseId"]);
                    a.QuizNum = Convert.ToInt32(dr["quizNumber"]);

                    ql.Add(a);
                }

                return ql;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        public void StartLesson(Lesson les)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"UPDATE Lesson SET isActive = 'True' , lessonCode = {les.LessonCode} WHERE lessonId = {les.LessonId} and courseId ={les.CourseId}";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public Lesson CheckActive(int lessonCode)
        {
            SqlConnection con;
            SqlCommand cmd;
            string qry = $"select * from Lesson where lessonCode={lessonCode} and isActive=1";
            Lesson l = new Lesson();
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                while (dr.Read())
                {
                    l.LessonId = Convert.ToInt32(dr["lessonId"]);
                    l.LessonName = Convert.ToString(dr["lessonName"]);
                    l.Info = Convert.ToString(dr["info"]);
                    l.CourseId = Convert.ToInt32(dr["courseId"]);
                    l.Id = Convert.ToString(dr["Id"]);
                    l.IsActive = Convert.ToBoolean(dr["isActive"]);
                    l.TimeStampLesson = Convert.ToInt32(dr["timeStampLesson"]);
                    l.DateAndTime = Convert.ToDateTime(dr["dateAndTime"]);
                }
                return l;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void insertStudent(StudentInLesson s)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"insert into StudentInLesson (lessonId,courseId,studentId,lecturerId,lessonCode)values('{s.LessonId}','{s.CourseId}','{s.StudentId}','{s.LecturerId}','{s.LessonCode}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }

        }
        public void insertStudentTemp(List<StudentInLesson> students)
        {
            SqlConnection con;
            SqlCommand cmd;
            string connectionString = "ASKQConnection";
            con = connect(connectionString);
            foreach (var item in students)
            {
                try
                {
                    string qry = $"insert into StudentInLessonTemp (lessonId,courseId,lessonCode,studentId)values({item.LessonId},{item.CourseId},{item.LessonCode},'{item.StudentId}')";

                    cmd = new SqlCommand(qry, con);
                }
                catch (Exception ex)
                {
                    throw (ex);
                }
                try
                {
                    cmd.ExecuteNonQuery(); // execute the command
                }
                catch (Exception ex)
                {
                    // write to log
                    throw (ex);
                }

            }
            // close the db connection
            con.Close();

        }
        public void EndLesson(int lessonCode)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"UPDATE Lesson SET isActive = 'False' WHERE lessonCode = {lessonCode}";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public List<YesNoQuestion> YesNoquestionList(string conString, string tableName, int courseId, int lessonId)
        {
            SqlConnection con = null;
            List<YesNoQuestion> ql = new List<YesNoQuestion>();
            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file         
                String selectSTR = "SELECT * FROM " + tableName + " where courseId=" + courseId + " and lessonId=" + lessonId + " and isDeleted=0";
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
                while (dr.Read())
                {   // Read till the end of the data into a row
                    YesNoQuestion a = new YesNoQuestion();
                    a.ID = Convert.ToInt32(dr["questionId"]);
                    a.Content = (string)dr["content"];
                    if ((string)dr["questionTitle"] == null)
                    {
                        a.QuestionTitle = "";
                    }
                    else a.QuestionTitle = (string)dr["questionTitle"];
                    a.CorecctAnswer = Convert.ToBoolean(dr["correctAnswer"]);
                    a.CourseId = Convert.ToInt32(dr["courseId"]);
                    a.LessonId = Convert.ToInt32(dr["lessonId"]);

                    ql.Add(a);
                }

                return ql;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        public int UpdateYNQuestion(int Qid, string content, string questionTitle, bool correctAnswer, string uploadDate)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "UPDATE YesNoQuestion SET content = '" + content + "',questionTitle = '" + questionTitle + "', correctAnswer = '" + correctAnswer + /*"', uploadDate = " + uploadDate +*/ "' WHERE questionId = " + Qid;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public void UpdateMultipleQuestion(MultipleChoiceQuestion q)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = $"UPDATE MultipleChoiceQuestion SET content = '{q.QuestionContent}',questionTitle = '{q.QuestionTitle}', uploadDate = '{q.UploadDate}', answer1 = '{q.Answer1Content}', answer2 = '{q.Answer2Content}', answer3 = '{q.Answer3Content}', answer4 = '{q.Answer4Content}', timer = {q.Timer}, correctAnswer= '{q.CorrectAnswer}' WHERE questionId ={q.ID}";
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public StudentLikes GetLikes(int questionId, string studentId)
        {
            SqlConnection con;
            SqlCommand cmd;
            String qry = $"select questionId, studentId from StudentLikes where questionId={questionId} and studentId='{studentId}'";
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                StudentLikes s = new StudentLikes();
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                s.QuestionId = questionId;
                s.Count = checkLikeNum(questionId);
       
                while (dr.Read())
                {
                    s.StudentId = Convert.ToString(dr["studentId"]);
                   
                }
                return s;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void InsertLike(StudentLikes s)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"insert into StudentLikes(questionId,studentId) values({s.QuestionId},'{s.StudentId}')";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery();
                EditRealTime(s);
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void DeleteLike(StudentLikes s)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"DELETE FROM StudentLikes WHERE questionId={s.QuestionId} and studentId='{s.StudentId}'";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery();
                EditRealTime(s);
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void EditRealTime(StudentLikes s)
        {
            SqlConnection con2;
            SqlCommand cmd2;
            string qry2 = $"UPDATE RealTimeQuestion SET likeCounter={s.Count} WHERE questionId={s.QuestionId}";
            try
            {
                string connectionString = "ASKQConnection2";
                con2 = connect(connectionString);
                cmd2 = new SqlCommand(qry2, con2);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd2.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con2.Close();
            }
        }
        public List<StudentLikes> CheckLikes(string studentId)
        {
            SqlConnection con;
            SqlCommand cmd;
            String qry = $"select questionId from StudentLikes where studentId='{studentId}'";
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                List<StudentLikes> sl = new List<StudentLikes>();
                while (dr.Read())
                {
                    StudentLikes s = new StudentLikes();
                    s.QuestionId = Convert.ToInt32(dr["questionId"]);
                    s.StudentId = studentId;
                    sl.Add(s);
                }
                return sl;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public int checkLikeNum(int questionId)
        {
            SqlConnection con2;
            SqlCommand cmd2;
            string qry2 = $"select likeCounter from RealTimeQuestion where questionId={questionId}";
            try
            {
                string connectionString = "ASKQConnection2";
                con2 = connect(connectionString);
                cmd2 = new SqlCommand(qry2, con2);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr2 = cmd2.ExecuteReader(CommandBehavior.CloseConnection);
                int likenum = 0;
                while (dr2.Read())
                {
                    likenum = Convert.ToInt32(dr2["likeCounter"]);
                }
                return likenum;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con2.Close();
            }
        }
        public List<StudentInLesson> saveAllStudent(int lessonId, int courseId)
        {
            SqlConnection con;
            SqlCommand cmd;
            String qry = $"select sil.enterTime, sil.studentId, s.FirstName,s.LastName,s.Email from StudentInLesson sil join Student s on sil.studentId=s.Id where lessonId={lessonId} and courseId={courseId}";
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                List<StudentInLesson> sil = new List<StudentInLesson>();
                while (dr.Read())
                {
                    StudentInLesson s = new StudentInLesson();
                    // s.EnterTime = Convert.ToDateTime(dr["enterTime"]);
                    s.StudentId = Convert.ToString(dr["studentId"]);
                    s.FirstName = Convert.ToString(dr["FirstName"]);
                    s.LastName = Convert.ToString(dr["LastName"]);
                    s.Email = Convert.ToString(dr["Email"]);
                    s.LessonCode = int.Parse(courseId.ToString() + lessonId.ToString());
                    s.LessonId = lessonId;
                    s.CourseId = courseId;
                    sil.Add(s);
                }
                return sil;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void DeleteStudentsInLesson(int lescode)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"DELETE FROM StudentInLesson WHERE lessonCode={lescode}";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void LogOutLesson(string studentId,int lescode)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                string qry = $"DELETE FROM StudentInLesson WHERE studentId='{studentId}' and lessonCode={lescode}";
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public void UpdateAllLessons(int lessonId, int courseId)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "update Lesson set isDeleted=1 where lessonId=" + lessonId + "and courseId=" + courseId;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public void UpdateLesson(int lessonId, int courseId, string lessonName, string lessonInfo, int lessonTime)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "update Lesson set lessonName='" + lessonName + "' , info='" + lessonInfo + "' , timeStampLesson=" + lessonTime + " where lessonId=" + lessonId + " and courseId=" + courseId;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public void UpdateAllCourses(int courseId)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "update Course set isDeleted=1 where courseId=" + courseId;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public void UpdateCourse(int courseId, string courseName, string courseInfo)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "update Course set courseName='" + courseName + "' , info='" + courseInfo + "' where courseId=" + courseId;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public void UpdateProfile(Person P)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            if (P.Type == "Student")
            {
                String cStr = $"UPDATE Student SET FirstName = '{P.FirstName}', LastName = '{P.LastName}', gender = '{P.Gender}', Email = '{P.Email}', Userpassword = '{P.Userpassword}' WHERE Id ={P.Id}";
                cmd = CreateCommand(cStr, con);             // create the command
            }
            else
            {
                String cStr = $"UPDATE Lecturer SET FirstName = '{P.FirstName}', LastName = '{P.LastName}', gender = '{P.Gender}', Email = '{P.Email}', Userpassword = '{P.Userpassword}' WHERE Id ={P.Id}";
                cmd = CreateCommand(cStr, con);             // create the command
            }
            try
            {
                cmd.ExecuteNonQuery(); // execute the command
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        public List<MultipleChoiceQuestion> kahoot(string conString, string tableName, int QuestionId)
        {
            SqlConnection con = null;
            List<MultipleChoiceQuestion> ql = new List<MultipleChoiceQuestion>();
            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * FROM " + tableName + " where questionId=" + QuestionId;
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    MultipleChoiceQuestion a = new MultipleChoiceQuestion();

                    a.ID = Convert.ToInt32(dr["questionId"]);
                    a.QuestionContent = (string)dr["content"];
                    a.Answer1Content = (string)dr["answer1"];
                    a.Answer2Content = (string)dr["answer2"];
                    a.Answer3Content = (string)dr["answer3"];
                    a.Answer4Content = (string)dr["answer4"];
                    a.Timer = Convert.ToInt32(dr["timer"]);
                    a.CorrectAnswer = (string)dr["correctAnswer"];
                    a.QuestionTitle = (string)dr["questionTitle"];
                    a.LessonId = Convert.ToInt32(dr["lessonId"]);
                    a.CourseId = Convert.ToInt32(dr["courseId"]);
                    a.QuizNum = Convert.ToInt32(dr["quizNumber"]);
                    a.count1 = Convert.ToInt32(dr["count1"]);
                    a.count2 = Convert.ToInt32(dr["count2"]);
                    a.count3 = Convert.ToInt32(dr["count3"]);
                    a.count4 = Convert.ToInt32(dr["count4"]);

                    ql.Add(a);
                }

                return ql;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        public List<YesNoQuestion> YNkahoot(string conString, string tableName, int QuestionId)
        {
            SqlConnection con = null;
            List<YesNoQuestion> ql = new List<YesNoQuestion>();
            try
            {
                con = connect(conString); // create a connection to the database using the connection String defined in the web config file

                String selectSTR = "SELECT * FROM " + tableName + " where questionId=" + QuestionId;
                SqlCommand cmd = new SqlCommand(selectSTR, con);

                // get a reader
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

                while (dr.Read())
                {   // Read till the end of the data into a row
                    YesNoQuestion a = new YesNoQuestion();

                    a.ID = Convert.ToInt32(dr["questionId"]);
                    a.Content = (string)dr["content"];
                    a.QuestionTitle = (string)dr["questionTitle"];
                    a.CorecctAnswer = Convert.ToBoolean(dr["correctAnswer"]);
                    a.NoCounter = Convert.ToInt32(dr["noAmount"]);
                    a.YesCounter = Convert.ToInt32(dr["yesAmount"]);
                    a.LessonId = Convert.ToInt32(dr["lessonId"]);
                    a.CourseId = Convert.ToInt32(dr["courseId"]);

                    ql.Add(a);
                }

                return ql;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    con.Close();
                }
            }
        }
        public List<StudentInLesson> GetMyCourses(string id)
        {
            SqlConnection con;
            SqlCommand cmd;
            String qry = $"select * from StudentInLessonTemp where studentId='{id}'";
            try
            {
                string connectionString = "ASKQConnection";
                con = connect(connectionString);
                cmd = new SqlCommand(qry, con);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            try
            {
                SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                List<StudentInLesson> sil = new List<StudentInLesson>();
                while (dr.Read())
                {
                    StudentInLesson s = new StudentInLesson();
                    s.StudentId = Convert.ToString(dr["studentId"]);
                    s.LessonCode = Convert.ToInt32(dr["lessonCode"]);
                    s.LessonId = Convert.ToInt32(dr["lessonId"]);
                    s.CourseId = Convert.ToInt32(dr["courseId"]);
                    s.Email = "";
                    sil.Add(s);
                }
                return sil;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            finally
            {
                // close the db connection
                con.Close();
            }
        }
        public List<Course> GetStudentCourse(List<StudentInLesson> s)
        {
            SqlConnection con;
            SqlCommand cmd;
            List<Course> lc = new List<Course>();
            foreach (var item in s)
            {
                String qry = $"select * from Course where courseId={item.CourseId}";
                try
                {
                    string connectionString = "ASKQConnection";
                    con = connect(connectionString);
                    cmd = new SqlCommand(qry, con);
                }
                catch (Exception ex)
                {
                    throw (ex);
                }
                try
                {
                    SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                    while (dr.Read())
                    {
                        Course c = new Course();
                        c.CourseId = Convert.ToInt32(dr["courseId"]);
                        c.CourseName = Convert.ToString(dr["courseName"]);
                        c.Info = Convert.ToString(dr["info"]);
                        c.CourseYear = Convert.ToInt32(dr["courseYear"]);
                        lc.Add(c);
                    }
                }
                catch (Exception ex)
                {
                    // write to log
                    throw (ex);
                }
                finally
                {
                    // close the db connection
                    con.Close();
                }
            }
            return lc;

        }
        public List<Lesson> GetStudentLesson(List<StudentInLesson> s)
        {
            SqlConnection con;
            SqlCommand cmd;
            List<Lesson> ls = new List<Lesson>();
            foreach (var item in s)
            {
                String qry = $"select * from Lesson where lessonCode={item.LessonCode}";
                try
                {
                    string connectionString = "ASKQConnection2";
                    con = connect(connectionString);
                    cmd = new SqlCommand(qry, con);
                }
                catch (Exception ex)
                {
                    throw (ex);
                }
                try
                {
                    SqlDataReader dr2 = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                    while (dr2.Read())
                    {
                        Lesson l = new Lesson();
                        l.LessonId = Convert.ToInt32(dr2["lessonId"]);
                        l.LessonName = Convert.ToString(dr2["lessonName"]);
                        l.Info = Convert.ToString(dr2["info"]);
                        ls.Add(l);
                    }
                }
                catch (Exception ex)
                {
                    // write to log
                    throw (ex);
                }
                finally
                {
                    // close the db connection
                    con.Close();
                }
            }
            return ls;
        }

        //changed
        public int UpdateIsDeleted(int questoionId)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "update MultipleChoiceQuestion set isDeleted=1 where questionId=" + questoionId;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        public int UpdateIsDeletedYN(int questoionId)
        {
            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("ASKQConnection"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            String cStr = "update YesNoQuestion set isDeleted=1 where questionId=" + questoionId;
            cmd = CreateCommand(cStr, con);             // create the command
            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                return 0;
                // write to log
                throw (ex);
            }
            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }


    }
}