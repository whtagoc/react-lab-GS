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
    public class UserSessionController : ControllerBase
    {
        private readonly TodoContext _context;

        public UserSessionController(TodoContext context)
        {
            _context = context;
        }
            


        // GET: api/UserAccess
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserSession>>> GetUserSession()
        {
            return await _context.UsersSession.ToListAsync();
        }
    }
}