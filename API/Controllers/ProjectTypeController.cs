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
    public class ProjectTypeController : ControllerBase
    {
        private readonly TodoContext _context;

         public ProjectTypeController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/ProjectType
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectType>>> GetProjectTypes()
        {
            return await _context.ProjectTypes.OrderBy(x => x.TypeDescription).ToListAsync();
        }

        // GET: api/User/ProjectType/GetProjTypeddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetProjTypeddlist")]
        public async Task<IActionResult> GetProjTypeddlist( )
        {

             var ProjTypeddlist = from projTypes in _context.ProjectTypes
                             orderby projTypes.TypeDescription
                             select new
                             {
                                 value = projTypes.Id,
                                 text = projTypes.TypeDescription
                             };

            var FilteredProjTypeddlist = await ProjTypeddlist.ToListAsync();

            return Ok(FilteredProjTypeddlist.ToList());
        }

        
    }

}
