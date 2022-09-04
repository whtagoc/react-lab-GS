using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using System;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerCompanyController : ControllerBase
    {
        private readonly TodoContext _context;

         public CustomerCompanyController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/CustomerCompany
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerCompany>>> GetCustCompany()
        {
            return await _context.CustomerCompanies.OrderBy(x => x.Name).ToListAsync();
        }

        // GET: api/User/CustomerCompany/GetCustomerCompddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetCustomerCompddlist")]
        public async Task<IActionResult> GetCustomerCompddlist( )
        {

            var CustomerComp = from custComp in _context.CustomerCompanies
                               orderby custComp.Name
                             select new
                             {
                                 value = custComp.Id,
                                 text = custComp.Name
                             };

            var FilteredCustomerComp = await CustomerComp.ToListAsync();

            return Ok(FilteredCustomerComp.ToList());
        }
        
    }
}
