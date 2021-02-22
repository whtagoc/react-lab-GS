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
    public class GenderController : ControllerBase
    {
        private readonly TodoContext _context;

         public GenderController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/Gender
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gender>>> GetGenders()
        {
            return await _context.Genders.ToListAsync();
        }

         // GET: api/Gender/GetGenderddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetGenderddlist")]
        public async Task<IActionResult> GetGenderddlist( )
        {

             var Gendersddlist = from Genders in _context.Genders
                             select new
                             {
                                 value = Genders.Id,
                                 text = Genders.Code + " - " + Genders.GenderDescr
                             };

            var FilteredGendersddlist = await Gendersddlist.ToListAsync();

            return Ok(FilteredGendersddlist.ToList());
        }   

    }

}
