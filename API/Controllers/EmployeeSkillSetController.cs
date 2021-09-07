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
    public class EmployeeSkillSetController : ControllerBase
    {
        private readonly TodoContext _context;

         public EmployeeSkillSetController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/EmployeeSkillSet/GetEmployeeSkillSets
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("GetEmployeeSkillSets")]
        public async Task<IActionResult> GetEmployeeSkillSets([Bind("EmpId")] BEmpSkillSetParm parmEmpSkillSet)
        {

            var SkillSets = from EmpSkillSet in _context.EmployeeSkillSets 
                            join Skills in _context.Skills on EmpSkillSet.SkillId equals Skills.Id
                            where EmpSkillSet.EmployeeId == parmEmpSkillSet.EmpId
                            select new
                             {
								EmpSkillSetId = EmpSkillSet.Id, 
                                EmpId = EmpSkillSet.EmployeeId,
                                EmpSkillProfLevel = EmpSkillSet.ProficiencyLevel,
                                SkillId = Skills.Id,
                                SkillCode = Skills.SkillCode,
                                SkillDescr = Skills.SkillDescr
                             };

           
            var FilteredSkillSets = await SkillSets.ToListAsync();

            return Ok(FilteredSkillSets);

        }
		
		// GET: api/EmployeeSkillSet/GetEmployeeSkillSetPerSkill
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("GetEmployeeSkillSetPerSkill")]
        public async Task<IActionResult> GetEmployeeSkillSetPerSkill(EmployeeSkillSet parmEmpSkillSet)
        {

            var Skill = from EmpSkillSet in _context.EmployeeSkillSets 
                            join Skills in _context.Skills on EmpSkillSet.SkillId equals Skills.Id
                            where EmpSkillSet.Id == parmEmpSkillSet.Id
                            select new
                             {
								EmpSkillSetId = EmpSkillSet.Id, 
                                EmpId = EmpSkillSet.EmployeeId,
                                EmpSkillProfLevel = EmpSkillSet.ProficiencyLevel,
                                SkillId = Skills.Id,
                                SkillCode = Skills.SkillCode,
                                SkillDescr = Skills.SkillDescr
                             };

           
            var FilteredSkill = await Skill.FirstOrDefaultAsync();

            return Ok(FilteredSkill);

        }
		
		// POST: api/EmployeeSkillSet
		// Insert Employee Skill Set
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost]
        public async Task<ActionResult<EmployeeSkillSet>> PostEmployeeSkillSet(EmployeeSkillSet item)
        {
            _context.EmployeeSkillSets.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployeeSkillSetPerSkill), new { Id = item.Id }, item);
        }		
		
		// PUT: api/EmployeeSkillSet/5
		// update Update Employee SkillSets
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpSkillSet(int id, EmployeeSkillSet item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
		
				// DELETE: api/EmployeeSkillSet/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpSkillSet(int id)
        {
            var EmpSkillSetItem = await _context.EmployeeSkillSets.FindAsync(id);

            if (EmpSkillSetItem == null)
            {
                return NotFound();
            }

            _context.EmployeeSkillSets.Remove(EmpSkillSetItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
		
    }

}
