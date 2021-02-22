using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    public class Module
    {
        public int Id { get; set; }

        public string ModuleName { get; set; }

        public string ModuleComponent { get; set; }

        public string ModuleComponentPath { get; set; }

        public int ModuleSortId { get; set; }

    }
}