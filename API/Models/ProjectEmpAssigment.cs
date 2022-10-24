using System;
using TodoApi.Models;

namespace TodoApi.Models
{
    public class ProjectEmpAssigment
    {
        public int Id { get; set; }
        public int ProjId { get; set; }
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public int PercentageAllocation  { get; set; }
        public DateTime AssignmentStart  { get; set; }
        public DateTime AssignmentEnd  { get; set; }
    }
}