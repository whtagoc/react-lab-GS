using System;
using Models;
namespace TodoApi.Models
{
    public class Currency
    {
        public int Id { get; set; }
        public string CurrencyAbbr { get; set; }
        public string CurrencyDescription { get; set; }
    }
}