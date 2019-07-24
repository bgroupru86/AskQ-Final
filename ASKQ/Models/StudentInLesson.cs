using ASKQ.Models.DAL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using ExcelLibrary.SpreadSheet;
using ExcelLibrary.CompoundDocumentFormat;

namespace ASKQ.Models
{
    public class StudentInLesson
    {
        int lessonId;
        int courseId;
        string studentId;
        string lecturerId;
        int lessonCode;
        DateTime enterTime;
        string firstName;
        string lastName;
        string email;

        public int LessonId { get => lessonId; set => lessonId = value; }
        public int CourseId { get => courseId; set => courseId = value; }
        public string StudentId { get => studentId; set => studentId = value; }
        public string LecturerId { get => lecturerId; set => lecturerId = value; }
        public int LessonCode { get => lessonCode; set => lessonCode = value; }
        public DateTime EnterTime { get => enterTime; set => enterTime = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string Email { get => email; set => email = value; }

        public StudentInLesson()
        {
        }
        public StudentInLesson(int _lessonId, int _courseId, string _studentId, string _lecturerId, int _lessonCode)
        {
            LessonId = _lessonId;
            CourseId = _courseId;
            StudentId = _studentId;
            LecturerId = _lecturerId;
            LessonCode = _lessonCode;
        }
        public void insertStudent()
        {
            DBservices dbs = new DBservices();
            dbs.insertStudent(this);
        }
        public List<StudentInLesson> saveAllStudent(int lessonId, int courseId)
        {
            List<StudentInLesson> sil = new List<StudentInLesson>();
            DBservices dbs = new DBservices();
            sil= dbs.saveAllStudent(lessonId, courseId);
            string lescode = courseId.ToString() + lessonId.ToString();
            string root_path = HttpRuntime.AppDomainAppPath;
            string fileSavePath1 = root_path + @"uploadedFiles/" + courseId.ToString() + @"/" + lessonId.ToString();
            var fileSavePath = Path.Combine(fileSavePath1, lescode);
            string file = fileSavePath+".xls";
            Workbook workbook = new Workbook();
            Worksheet worksheet = new Worksheet("First Sheet");
            worksheet.Cells[1, 1] = new Cell("Student Id");
            worksheet.Cells[1, 2] = new Cell("First Name");
            worksheet.Cells[1, 3] = new Cell("Last Name");
            worksheet.Cells[1, 4] = new Cell("Email");
            for (int i = 2, w = 0; w < sil.Count(); i++, w++)
            {
                for (int j = 1; j < 5; j++)
                {
                    switch (j)
                    {
                        // case 1: ws.Cells[i, j].Value2 = sil[w].EnterTime;
                        //     break;
                        case 1:
                            worksheet.Cells[i, j] = new Cell(sil[w].StudentId);
                            break;
                        case 2:
                            worksheet.Cells[i, j] = new Cell(sil[w].FirstName);
                            break;
                        case 3:
                            worksheet.Cells[i, j] = new Cell(sil[w].LastName);
                            break;
                        case 4:
                            worksheet.Cells[i, j] = new Cell(sil[w].Email);
                            break;

                    }
                }
            }

            worksheet.Cells.ColumnWidth[0, 1] = 3000;
            workbook.Worksheets.Add(worksheet);
            workbook.Save(file);

            //open xls file 
            Workbook book = Workbook.Load(file);
            Worksheet sheet = book.Worksheets[0];

            //traverse rows by Index 
            for (int rowIndex = sheet.Cells.FirstRowIndex; rowIndex <= sheet.Cells.LastRowIndex; rowIndex++)
            {
                Row row = sheet.Cells.GetRow(rowIndex);
                for (int colIndex = row.FirstColIndex; colIndex <= row.LastColIndex; colIndex++)
                { Cell cell = row.GetCell(colIndex); }
            }

            return sil;
        }
        public void LogOutLesson(string studentId, int lessonCode)
        {
            DBservices dbs = new DBservices();
            dbs.LogOutLesson(studentId, lessonCode);

        }
        public void DeleteAllStudent(int lessCode)
        {
            DBservices dbs = new DBservices();
            dbs.DeleteStudentsInLesson(lessCode);

        }
        public void insertStudentTemp(List<StudentInLesson> students)
        {
            DBservices dbs = new DBservices();
            dbs.insertStudentTemp(students);
        }
        public List<StudentInLesson> GetMyCourses(string id)
        {
            List<StudentInLesson> sil = new List<StudentInLesson>();
            DBservices dbs = new DBservices();
            sil = dbs.GetMyCourses(id);
            return sil;
        }
    }
}