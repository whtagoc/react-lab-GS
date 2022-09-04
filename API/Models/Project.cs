using System;
using TodoApi.Models;

namespace TodoApi.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int CustomerId { get; set; }
        public int TypeId { get; set; }
        public string Name  { get; set; }
        public string Description  { get; set; }
        public Decimal BillingCost  { get; set; }
        public int BillingTermID { get; set; }
        public int BillingCurrencyId { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime ContractEndDate { get; set; }
    }
}