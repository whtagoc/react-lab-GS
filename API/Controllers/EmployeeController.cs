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
    public class EmployeeController : ControllerBase
    {
        private readonly TodoContext _context;

         public EmployeeController(TodoContext context) 
        {
            _context = context;
        }   

        // GET: api/Employee
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // POST: api/Employee/GetEmployeesList
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost("GetEmployeeList")]
        public async Task<IActionResult> GetEmployeeList([Bind("EmpNo,EmpLastName,EmpFirstName,EmpMiddleName")] BEmployeesParm parmEmployee)
        {
            var Employees = from Emp in _context.Employees
                            join Gender in _context.Genders on Emp.Gender equals Gender.Id
                            orderby Emp.ID
                            select new
                            {
                                EmpID = Emp.ID,
                                EmpNo = Emp.EmployeeNo,
                                EmpLastName = Emp.LastName,
                                EmpFirstName = Emp.FirstName,
                                EmpMiddleName = Emp.MiddleName,
                                EmpGenderId = Emp.Gender,
                                EmpGenderDescr = Gender.GenderDescr,
                                EmpBirthDate = Emp.BirthDate
                            };

            if (!string.IsNullOrEmpty(parmEmployee.EmpNo))
            {
                Employees = Employees.Where(p => p.EmpNo.ToUpper().Contains(parmEmployee.EmpNo.ToUpper()));
            }

            if (!string.IsNullOrEmpty(parmEmployee.EmpLastName))
            {
                Employees = Employees.Where(p => p.EmpLastName.ToUpper().Contains(parmEmployee.EmpLastName.ToUpper()));
            }

            if (!string.IsNullOrEmpty(parmEmployee.EmpFirstName))
            {
                Employees = Employees.Where(p => p.EmpFirstName.ToUpper().Contains(parmEmployee.EmpFirstName.ToUpper()));
            }

            if (!string.IsNullOrEmpty(parmEmployee.EmpMiddleName))
            {
                Employees = Employees.Where(p => p.EmpMiddleName.ToUpper().Contains(parmEmployee.EmpMiddleName.ToUpper()));
            }

            var FilteredEmployees = await Employees.ToListAsync();

            return Ok(FilteredEmployees.ToList());
        }

        // GET: api/Employee/GetEmployeeddlist
        [EnableCors("_myAllowSpecificOrigins")] 
        [HttpGet("GetEmployeeddlist")]
        public async Task<IActionResult> GetEmployeeddlist( )
        {

            var Employeeddlist = from emp in _context.Employees
								 orderby emp.LastName, emp.FirstName, emp.MiddleName
								 select new
								 {
									value = emp.ID,
									text = emp.LastName + ",     " + emp.FirstName + "     " + emp.MiddleName + "        (" + emp.EmployeeNo + ")"
								 };

            var FilteredEmployeeddlist = await Employeeddlist.ToListAsync();

            return Ok(FilteredEmployeeddlist.ToList());
        }

         // GET: api/Employee/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
           
            var EmployeesItem = await _context.Employees.FindAsync(id);

            if (EmployeesItem == null)
            {
                return NotFound();
            }

            return EmployeesItem;
        }

        // Update Employee
        // PUT: api/Employee/5 
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, Employee item)
        {
            if (id != item.ID)
            {
                return BadRequest();    
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

         // Add employee
        // POST: api/Employee
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmpplyee(Employee item)
        {
            _context.Employees.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = item.ID }, item);
        }

        // DELETE: api/Employee/5
        [EnableCors("_myAllowSpecificOrigins")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var EmployeeItem = await _context.Employees.FindAsync(id);

            if (EmployeeItem == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(EmployeeItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

       
    }

}
