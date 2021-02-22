using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    public class UserAccess
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ModuleId { get; set; }
        public string AllowView { get; set; }
        public string AllowInsert { get; set; }
        public string AllowUpdate { get; set; }
        public string AllowDelete { get; set; }

    }
}