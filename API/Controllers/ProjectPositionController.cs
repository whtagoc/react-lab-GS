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
    public class ProjectPositionController : ControllerBase
    {
        private readonly TodoContext _context;

         public ProjectPositionController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/ProjectPosition
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectPosition>>> GetProjectPositions()
        {
            return await _context.ProjectPositions.OrderBy(x => x.PositionDescription).ToListAsync();
        }

        // GET: api/ProjectPosition/GetProjPositionddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetProjPositionddlist")]
        public async Task<IActionResult> GetProjPositionddlist( )
        {

             var projPositionddlist = from projPosition in _context.ProjectPositions
                              orderby projPosition.PositionDescription
                             select new
                             {
                                 value = projPosition.Id,
                                 text = projPosition.PositionDescription
                             };

            var FilteredProjPositionddlist = await projPositionddlist.ToListAsync();

            return Ok(FilteredProjPositionddlist.ToList());
        }   

        
    }

}
