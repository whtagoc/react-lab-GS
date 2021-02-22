using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    public class User
    {
        public int Id { get; set; }

        public int EmployeeID { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        
    }
}