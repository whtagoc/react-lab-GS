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
    public class ProjectTermsController : ControllerBase
    {
        private readonly TodoContext _context;

         public ProjectTermsController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/ProjectTerms
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTerms>>> GetProjectTerms()
        {
            return await _context.ProjectTerms.OrderBy(x => x.TermDescription).ToListAsync();
        }   

        // GET: api/ProjectTerms/GetProjBillingTermsddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetProjBillingTermsddlist")]
        public async Task<IActionResult> GetProjBillingTermsddlist( )
        {

             var projBillingTermsddlist = from projBillingTerms in _context.ProjectTerms
                             select new
                             {
                                 value = projBillingTerms.Id,
                                 text = projBillingTerms.TermDescription
                             };

            var FilteredprojBillingTermsddlist = await projBillingTermsddlist.ToListAsync();

            return Ok(FilteredprojBillingTermsddlist.ToList());
        }     
    }

}
