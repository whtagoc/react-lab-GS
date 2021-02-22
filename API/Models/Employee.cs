using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace TodoApi.Models
{
    public class Employee
    {
        public int ID { get; set; }
       
        public string EmployeeNo { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }
        public string HomePhone { get; set; }
        public string MobilePhone { get; set; }
        public DateTime BirthDate { get; set; }
        public int Gender { get; set; }
        public int CivilStatusID { get; set; }
        public int NationalityID { get; set; }
        public string WorkEmailAddress { get; set; }
        public string OtherEmailAddress { get; set; }
    }
}