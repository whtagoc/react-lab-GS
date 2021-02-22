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
    public class UsersController : ControllerBase
    {
        private readonly TodoContext _context;

        public UsersController(TodoContext context)
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



            if (_context.Users.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                //_context.TodoItems.Add(new TodoItem { Name = "Item1" });
                //_context.SaveChanges();
                _context.Users.Add(new User
                {
                    Username = "admin",
                    Password ="password"
                });
                _context.Users.Add(new User
                {
                    Username = "user1",
                    Password = "password"
                });
                _context.Users.Add(new User
                {
                    Username = "user2",
                    Password = "password"
                });

                _context.Users.Add(new User
                {
                    Username = "user3",
                    Password = "password"
                });

                _context.Users.Add(new User
                {
                    Username = "user4",
                    Password = "password"
                });

                _context.Users.Add(new User
                {
                    Username = "user5",
                    Password = "password"
                });

                _context.SaveChanges();
            }

            if (_context.UsersAccess.Count() == 0) {
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
                
            }
        }


        // GET: api/Users
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }


        // GET: api/Users/5
        /*
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {

            var UserItem = await _context.Users.FindAsync(id);

            if (UserItem == null)
            {
                return NotFound();
            }

            return UserItem;
        }
        */

        // GET: api/User/Authentication
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("Authentication")]
        public async Task<IActionResult> Index([Bind("Username,Password")] User parmuser)
        {

            var user = from usr in _context.Users
                       where (usr.Username == parmuser.Username && usr.Password == parmuser.Password)
                       select new {usr.Id, usr.Username};

            var FilteredUser = await user.ToListAsync();

            if (FilteredUser.Count() > 0) {
                UserSession UserSession = new UserSession();
                UserSession.UserId = FilteredUser[0].Id;
                UserSession.SessionDateTime = DateTime.Now;
                _context.UsersSession.Add(UserSession);
                await _context.SaveChangesAsync();
                var GenSessionId = UserSession.Id;
                var UsrSession = from usrS in _context.UsersSession
                                 join usr in _context.Users on usrS.UserId equals usr.Id
                                 where usrS.Id == GenSessionId && usr.Id == FilteredUser[0].Id
                                 select new { userId = usr.Id, 
                                              Username = usr.Username, 
                                              SessionId  = usrS.Id,
                                              SessionDT = usrS.SessionDateTime
                                            };

                var RetUsrSession = await UsrSession.ToListAsync();
                return Ok(RetUsrSession.ToList());
            }

            return Ok(FilteredUser.ToList());
          
        }

        // GET: api/User/GetUserAccessRights
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("GetUserAccessRights")]
        public async Task<IActionResult> GetAccessRights([Bind("Id")] User parmuser)
        {

            var UserAccess = from usra in _context.UsersAccess
                             join mod in _context.Modules on usra.ModuleId equals mod.Id
                             join usr in _context.Users on usra.UserId equals usr.Id
                             orderby mod.ModuleSortId 
                             where (usra.UserId == parmuser.Id)
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


        /*
        // GET: api/User
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost]
        public async Task<IActionResult> Index2([Bind("Username,Password")] User parmuser)
        {
            // Use LINQ to get list of genres.


            var user = from usr in _context.Users
                       where (usr.Username == parmuser.Username && usr.Password == parmuser.Password)
                       select new { usr.Id, usr.Username};

            var FilteredUser = await user.ToListAsync();

            if (FilteredUser.Count() > 0) {

                var UserAccess = from usra in _context.UserAccess
                                 join mod in _context.Modules on usra.ModuleId equals mod.Id
                                 join usr in _context.Users on usra.UserId equals usr.Id
                                 where (usra.UserId == FilteredUser[0].Id)
                                 select new { 
                                     UserId = usra.UserId,
                                     UserName = usr.Username,
                                     ModId = mod.Id,
                                     ModName = mod.ModuleName,
                                     ModComponent = mod.ModuleComponent,
                                     ModAllowView = usra.AllowView,
                                     ModAllowInsert = usra.AllowInsert,
                                     ModAllowUpdate = usra.AllowUpdate,
                                     ModAllowDelete = usra.AllowDelete
                                 };

                var FilteredUserAccess = await UserAccess.ToListAsync();

                if (FilteredUserAccess.Count() > 0)
                {
                    return Ok(FilteredUserAccess.ToList());
                }
            }
            return Ok(FilteredUser.ToList());
        }
        */
    }
}