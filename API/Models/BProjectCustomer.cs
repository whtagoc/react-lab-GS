using System;
using TodoApi.Models;

namespace TodoApi.Models
{
    public class BProjectCustomer
    {

        public int ProjId { get; set; }
        public int ProjTypeId { get; set; }
        public string CustName{ get; set; }
        public string ProjName { get; set; }
        public string ProjCode { get; set; }

    }
}