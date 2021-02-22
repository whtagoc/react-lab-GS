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
    public class UserAccessController : ControllerBase
    {
        private readonly TodoContext _context;

        public UserAccessController(TodoContext context)
        {
            _context = context;

            if (_context.UsersAccess.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                //_context.TodoItems.Add(new TodoItem { Name = "Item1" });
                //_context.SaveChanges();

                // Admin 
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 1,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // Admin 
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // Admin 
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 3,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // Admin 
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 4,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // user1
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 2,
                    ModuleId = 1,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // user1
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 2,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "N",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // user1
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 2,
                    ModuleId = 3,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });

                // user2
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 3,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "N",
                    AllowDelete = "Y"
                });
                _context.SaveChanges();

                // user3
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 4,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "N"
                });
                _context.SaveChanges();

                // user4
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 5,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "N"
                });
                // user5
                _context.UsersAccess.Add(new UserAccess
                {
                    UserId = 6,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "N",
                    AllowUpdate = "N",
                    AllowDelete = "N"
                });
                _context.SaveChanges();
            }
        }


        // GET: api/UserAccess
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAccess>>> GetUserAccess()
        {
            return await _context.UsersAccess.ToListAsync();
        }

        
        // GET: api/UserAccess/GetUserAccessRights
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("GetUserAccessRights")]
        public async Task<IActionResult> GetAccessRights()
        {

            var UserAccess = from usra in _context.UsersAccess
                             join mod in _context.Modules on usra.ModuleId equals mod.Id
                             join usr in _context.Users on usra.UserId equals usr.Id
                             orderby mod.ModuleSortId 
                             select new
                             {
                                 UserID = usra.UserId,
                                 UserName = usr.Username,
                                 ModId = mod.Id,
                                 ModName = mod.ModuleName,
                                 ModComponent = mod.ModuleComponent,
                                 ModComponentPath = mod.ModuleComponentPath,
                                 ModAllowView = usra.AllowView,
                                 ModAllowInsert = usra.AllowInsert,
                                 ModAllowUpdate = usra.AllowUpdate,
                                 ModAllowDelete = usra.AllowDelete
                             };

            var FilteredUserAccess = await UserAccess.ToListAsync();

            return Ok(FilteredUserAccess.ToList());

        }

        


    }
}