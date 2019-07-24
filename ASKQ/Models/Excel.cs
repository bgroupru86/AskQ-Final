using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Office.Interop.Excel;
using _Excel = Microsoft.Office.Interop.Excel;

namespace ASKQ.Models
{
    public class Excel
    {
        string path = "";
        _Application excel = new _Excel.Application();
        Workbook wb;
        Worksheet ws;

        public Excel()
        {

        }
        public Excel(string path,int sheet)
        {
            this.path = path;
            wb = excel.Workbooks.Open(path);
            ws = wb.Worksheets[sheet];
        }
        public void CreateNewFile()
        {
            this.wb = excel.Workbooks.Add(XlWBATemplate.xlWBATWorksheet);
        }
        public void WriteToCell(List<StudentInLesson> sil)
        {
           // ws.Cells[1, 1].Value2 = "Enter Time";
            ws.Cells[1, 1].Value2 = "Student Id";
            ws.Cells[1, 2].Value2 = "First Name";
            ws.Cells[1, 3].Value2 = "Last Name";
            ws.Cells[1, 4].Value2 = "Email";
            for (int i = 2, w = 0 ; w < sil.Count(); i++,w++)
            {
                for (int j = 1; j < 5; j++)
                {
                    switch (j)
                    {
                       // case 1: ws.Cells[i, j].Value2 = sil[w].EnterTime;
                       //     break;
                        case 1: ws.Cells[i, j].Value2 = sil[w].StudentId;
                            break;
                        case 2:
                            ws.Cells[i, j].Value2 = sil[w].FirstName;
                            break;
                        case 3:
                            ws.Cells[i, j].Value2 = sil[w].LastName;
                            break;
                        case 4:
                            ws.Cells[i, j].Value2 = sil[w].Email;
                            break;
           
                    }
                }
            }
        }
        public void Save()
        {
            wb.Save();
        }
        public void SaveAs(string path)
        {
            wb.SaveAs(path);
        }
        public void Close()
        {
            wb.Close();
        }
    }
}