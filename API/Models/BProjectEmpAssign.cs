using System;
using TodoApi.Models;

namespace TodoApi.Models
{
    public class BProjectEmpAssign
    {

        public int ProjId { get; set; }
        public int EmployeeId { get; set; }
        public string EmpLastName{ get; set; }
        public string EmpFirstName { get; set; }
        public string EmpMiddleName { get; set; }

    }
}