using ASKQ.Models.DAL;
using System.Collections.Generic;

namespace ASKQ.Models
{
    public class RealTimeQuestion
    {
        public int ID { get; set; }
        public string Content { get; set; }
        public string UploadDate { get; set; }
        public string FileLink { get; set; }
        public int likeCounter { get; set; }
        public bool isDeleted { get; set; }
        public bool isAnswered { get; set; }
        public int lessonCode { get; set; }
        public string studentId { get; set; }

        public RealTimeQuestion() { }

        public RealTimeQuestion(string content, string uploadDate, string fileLink, int likeCounter, bool isDeleted, bool isAnswered,int lessonCode,string studentId)
        {
            Content = content;
            UploadDate = uploadDate;
            FileLink = fileLink;
            this.likeCounter = likeCounter;
            this.isDeleted = isDeleted;
            this.isAnswered = isAnswered;
            this.lessonCode = lessonCode;
            this.studentId = studentId;

        }

        public void insert()
        {
            DBservices dbs = new DBservices();
            dbs.insert(this);
        }

        public List<RealTimeQuestion> ReadList(int lessonCode)
        {
            DBservices dbs = new DBservices();
            List<RealTimeQuestion> lq = dbs.QList("ASKQConnection", "RealTimeQuestion", lessonCode);
            return lq;
        }

        public int UpdateQuestion(int id, string fieldName)
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateQuestion(id, fieldName);
        }

        public RealTimeQuestion forYesNoQuestion(int id)
        {
            DBservices dbs = new DBservices();
            return dbs.forYesNoQuestion("ASKQConnection", "RealTimeQuestion", id);
        }
    }
}