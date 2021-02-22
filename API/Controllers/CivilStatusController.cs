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
    public class CivilStatusController : ControllerBase
    {
        private readonly TodoContext _context;

         public CivilStatusController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/CivilStatus
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CivilStatus>>> GetCivilStatuses()
        {
            return await _context.CivilStatuses.ToListAsync();
        }

         // GET: api/CivilStatus/GetCivilStatusddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetCivilStatusddlist")]
        public async Task<IActionResult> GetCivilStatusddlist( )
        {

             var CivilStatusesddlist = from CivilStatuses in _context.CivilStatuses
                             select new
                             {
                                 value = CivilStatuses.Id,
                                 text = CivilStatuses.CivilStatCode + " - " + CivilStatuses.CivilStatDescr
                             };

            var FilteredCivilStatusesddlist = await CivilStatusesddlist.ToListAsync();

            return Ok(FilteredCivilStatusesddlist.ToList());
        }    

    }

}
