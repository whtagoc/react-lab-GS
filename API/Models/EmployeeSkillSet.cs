using System;
using TodoApi.Models;

namespace TodoApi.Models
{
    public class EmployeeSkillSet
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int SkillId { get; set; }
        public int ProficiencyLevel  { get; set; }
    }
}