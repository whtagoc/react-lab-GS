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
    public class ProjectController : ControllerBase
    {
        private readonly TodoContext _context;

         public ProjectController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/Project
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        // GET: api/User/GetUserAccessRights
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("GetProjectsList")]
        public async Task<IActionResult> GetProjectsList([Bind("CustName,ProjTypeId,ProjName,ProjCode")] BProjectCustomer parmProjCust)
        {

            var Projects = from proj in _context.Projects
                             join cust in _context.CustomerCompanies on proj.CustomerId equals cust.Id
                             join projType in _context.ProjectTypes on proj.TypeId equals projType.Id
                             orderby proj.Id 
                             select new
                             {
                                 ProjId = proj.Id,
                                 CustName = cust.Name,
                                 ProjCode = proj.Code,
                                 ProjTypeId = projType.Id,
                                 ProjType = projType.TypeDescription,
                                 ProjName = proj.Name,
                                 ProjDesc = proj.Description
                             };

            if (!string.IsNullOrEmpty(parmProjCust.CustName)) 
            {
                Projects = Projects.Where(p => p.CustName.ToUpper().Contains(parmProjCust.CustName.ToUpper()));
            }     

            if (parmProjCust.ProjTypeId != 0) 
            {
                Projects = Projects.Where(p => p.ProjTypeId.Equals(parmProjCust.ProjTypeId));
            }   

            if (!string.IsNullOrEmpty(parmProjCust.ProjName)) 
            {
                Projects = Projects.Where(p => p.ProjName.ToUpper().Contains(parmProjCust.ProjName.ToUpper()));
            }  

             if (!string.IsNullOrEmpty(parmProjCust.ProjCode)) 
            {
                Projects = Projects.Where(p => p.ProjCode.ToUpper().Contains(parmProjCust.ProjCode.ToUpper()));
            }                

            var FilteredProjects = await Projects.ToListAsync();

            return Ok(FilteredProjects.ToList());

        }

          // GET: api/Project/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
           
            var ProjectsItem = await _context.Projects.FindAsync(id);

            if (ProjectsItem == null)
            {
                return NotFound();
            }

            return ProjectsItem;
        }

        // PUT: api/project/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectItem(int id, Project item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
		
		// POST: api/project
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost]
        public async Task<ActionResult<Project>> Project(Project item)
        {
            _context.Projects.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProject), new { id = item.Id }, item);
        }
		
		
		// DELETE: api/project/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpDelete("{projId}")]
        public async Task<IActionResult> DeleteProject(int projId)
        {
           
		   //var ProjectEmpAssigmentsItem = _context.ProjectEmpAssigments
            //        .Where(b => b.ProjId == projId).DeleteFromQuery();
		   
			//if (ProjectEmpAssigmentsItem == null)
            //{
             // return NotFound();
            //}
			
			       
			//await _context.ProjectEmpAssigments.Remove(ProjectEmpAssigmentsItem);
            //await _context.SaveChangesAsync();
			
			var ProjectEmpAssigmentsItem = (_context.ProjectEmpAssigments.Where(b => b.ProjId == projId));
		   
			if (ProjectEmpAssigmentsItem == null)
            {
              return NotFound();
            }
			   
			 _context.ProjectEmpAssigments.RemoveRange(ProjectEmpAssigmentsItem.ToList());
            await _context.SaveChangesAsync();
			
			var ProjectItem = await _context.Projects.FindAsync(projId);

            if (ProjectItem == null)
            {
                return NotFound();
            }
			
            _context.Projects.Remove(ProjectItem);
            await _context.SaveChangesAsync();
			
            return NoContent();
        }

    }

}
