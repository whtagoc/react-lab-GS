using System;
using TodoApi.Models;
namespace Models
{
    public class AppUser 
    {
        public string DisplayName { get; set; }
        public int EmployeeID { get; set; }
        public DateTime LastLoginDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int ModifiedBy { get; set; }
        public virtual Employee Employee { get; set; }
    }
}