using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using System;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        private readonly TodoContext _context;

        public ModuleController(TodoContext context)
        {
            _context = context;

            if (_context.Modules.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                //_context.TodoItems.Add(new TodoItem { Name = "Item1" });
                //_context.SaveChanges();
                _context.Modules.Add(new Module
                {
                    ModuleName = "Home",
                    ModuleComponent = "Home",
                    ModuleComponentPath = "/Home",
                    ModuleSortId = 10
                });
                _context.Modules.Add(new Module
                {
                    ModuleName = "Movie",
                    ModuleComponent = "MoviesList2",
                    ModuleComponentPath = "/MoviesList2",
                    ModuleSortId = 20
                });
                _context.Modules.Add(new Module
                {
                    ModuleName = "Employee",
                    ModuleComponent = "EmployeeList",
                    ModuleComponentPath = "/EmployeeList",
                    ModuleSortId = 30
                });
                _context.Modules.Add(new Module
                {
                    ModuleName = "User Access",
                    ModuleComponent = "UsersAccessList",
                    ModuleComponentPath = "/UsersAccessList",
                    ModuleSortId = 40
                });

                _context.SaveChanges();
            }
        }


        // GET: api/Module
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Module>>> GetModules()
        {
            return await _context.Modules.ToListAsync();
        }
    }
}