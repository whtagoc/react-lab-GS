using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    public class UserSession
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime SessionDateTime { get; set; }
    }
}