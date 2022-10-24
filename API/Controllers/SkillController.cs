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
    public class SkillController : ControllerBase
    {
        private readonly TodoContext _context;

         public SkillController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/Skill
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        // POST: api/Skill/GetSkillList
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("GetSkillList")]
        public async Task<IActionResult> GetSkillList([Bind("SkillCode,SkillDescr")] BSkillParm parmSkill)
        {
            var Skills = from Skill in _context.Skills
                            orderby Skill.SkillCode
                            select new
                            {
                                SkillID = Skill.Id,
                                SkillCode = Skill.SkillCode,
                                SkillDescr = Skill.SkillDescr,
                            };

            if (!string.IsNullOrEmpty(parmSkill.SkillCode))
            {
                Skills = Skills.Where(p => p.SkillCode.ToUpper().Contains(parmSkill.SkillCode.ToUpper()));
            }

            if (!string.IsNullOrEmpty(parmSkill.SkillDescr))
            {
                Skills = Skills.Where(p => p.SkillDescr.ToUpper().Contains(parmSkill.SkillDescr.ToUpper()));
            }

            var FilteredSkills = await Skills.ToListAsync();

            return Ok(FilteredSkills.ToList());
        }

         // GET: api/Skill/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(int id)
        {
           
            var SkillsItem = await _context.Skills.FindAsync(id);

            if (SkillsItem == null)
            {
                return NotFound();
            }

            return SkillsItem;
        }

        // Update skill
        // PUT: api/Skill/5 
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkillItem(int id, Skill item)
        {
            if (id != item.Id)
            {
                return BadRequest();    
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Add Skill
        // POST: api/Skill
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost]
        public async Task<ActionResult<Skill>> PostSkill(Skill item)
        {
            _context.Skills.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSkill), new { id = item.Id }, item);
        }

        
        // DELETE: api/Skill/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            var Skilltem = await _context.Skills.FindAsync(id);

            if (Skilltem == null)
            {
                return NotFound();
            }

            _context.Skills.Remove(Skilltem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

         // GET: api/Skill/GetSkillddlist
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("GetSkillddlist")]
        public async Task<IActionResult> GetSkillddlist( )
        {

             var GetSkillddlist = from Skills in _context.Skills
							orderby Skills.SkillCode, Skills.SkillDescr
                             select new
                             {
                                 value = Skills.Id,
                                 text = Skills.SkillCode + " - " + Skills.SkillDescr
                             };

            var FilteredSkillsddlist = await GetSkillddlist.ToListAsync();

            return Ok(FilteredSkillsddlist.ToList());
        }    
		
		

    }

}
