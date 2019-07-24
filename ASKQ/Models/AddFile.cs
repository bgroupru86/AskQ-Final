using ASKQ.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASKQ.Models
{
    public class AddFile
    {
        int idfile;
        int lessonId;
        int courseId;
        string fileName;
        string fileDescription;
        string path;
        string typeFile;
        double size;

        public AddFile()
        {
        }

        public AddFile(int _idfile, int _lessonId, int _courseId, string _fileName, string _fileDescription,string _path,string _typeFile,double _size)
        {
            Idfile = _idfile;
            LessonId = _lessonId;
            CourseId = _courseId;
            FileName = _fileName;
            FileDescription = _fileDescription;
            Path = _path;
            TypeFile = _typeFile;
            Size = _size;
        }

        public int LessonId { get => lessonId; set => lessonId = value; }
        public int CourseId { get => courseId; set => courseId = value; }
        public string FileName { get => fileName; set => fileName = value; }
        public string FileDescription { get => fileDescription; set => fileDescription = value; }
        public string Path { get => path; set => path = value; }
        public int Idfile { get => idfile; set => idfile = value; }
        public string TypeFile { get => typeFile; set => typeFile = value; }
        public double Size { get => size; set => size = value; }

        public void AddNewFile()
        {
            DBservices dbs = new DBservices();
            dbs.AddNewFile(this);
        }
        public List<AddFile> GetFiles(int lessonId, int courseId)
        {
            DBservices db = new DBservices();
            List<AddFile> listFiles = db.GetFiles(lessonId, courseId);
            return listFiles;
        }
    }
}