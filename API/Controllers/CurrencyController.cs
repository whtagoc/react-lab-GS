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
    public class CurrencyController : ControllerBase
    {
        private readonly TodoContext _context;

         public CurrencyController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/Currency
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Currency>>> GetCurrencies()
        {
            return await _context.Currencies.ToListAsync();
        }

         // GET: api/Currency/GetCurrencyddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetCurrencyddlist")]
        public async Task<IActionResult> GetCurrencyddlist( )
        {

             var projCurrenciesddlist = from projCurrencies in _context.Currencies
                             select new
                             {
                                 value = projCurrencies.Id,
                                 text = projCurrencies.CurrencyAbbr + " - " + projCurrencies.CurrencyDescription
                             };

            var FilteredprojCurrenciesddlist = await projCurrenciesddlist.ToListAsync();

            return Ok(FilteredprojCurrenciesddlist.ToList());
        }  

    }

}
