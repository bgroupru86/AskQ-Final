using ASKQ.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASKQ.Models
{
    public class Person
    {
        string id;
        string firstName;
        string lastName;
        string email;
        string userpassword;
        string gender;
        string type;
        string img;

        public string Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Email { get => email; set => email = value; }
        public string Userpassword { get => userpassword; set => userpassword = value; }
        public string Gender { get => gender; set => gender = value; }
        public string Type { get => type; set => type = value; }
        public string Img { get => img; set => img = value; }
        public Person() { }
        public Person(string _id,string _firstname, string _lastName, string _gender, string _email, string _userpassword,string _type, string _img)
        {
            Id = _id;
            FirstName = _firstname;
            LastName = _lastName;
            Gender = _gender;
            Email = _email;
            Userpassword = _userpassword;
            Type = _type;
            Img = _img;
        }
        public void insert()
        {
            DBservices dbs = new DBservices();
            dbs.insert(this);
        }
        public bool checkPersonId(string PersonId, string PersonType)
        {
            DBservices dbs = new DBservices();
           bool check = dbs.checkPersonId(PersonId, PersonType);
            return check;
        }
        public Person Login(string PersonId, string userPassword)
        {
            DBservices dbs = new DBservices();
            Person p = new Person();
             p = dbs.Login(PersonId, userPassword);
            return p;
        }
        public void UpdateProfile()
        {
            DBservices dbs = new DBservices();
            dbs.UpdateProfile(this);
        }
    }
}