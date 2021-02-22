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
    public class NationalityController : ControllerBase
    {
        private readonly TodoContext _context;

         public NationalityController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/Nationality
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nationality>>> GetNationalities()
        {
            return await _context.Nationalities.ToListAsync();
        }

         // GET: api/Gender/GetNationalityddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetNationalityddlist")]
        public async Task<IActionResult> GetNationalityddlist( )
        {

             var Nationalitiesddlist = from Nationalities in _context.Nationalities
                             select new
                             {
                                 value = Nationalities.Id,
                                 text = Nationalities.NatCode + " - " + Nationalities.NatCodeDescr
                             };

            var FilteredNationalitiesddlist = await Nationalitiesddlist.ToListAsync();

            return Ok(FilteredNationalitiesddlist.ToList());
        }   

    }

}
