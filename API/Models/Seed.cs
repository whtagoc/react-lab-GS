using System;
using System.Linq;
//using Models;
using System.Collections.Generic;
using TodoApi.Models;
namespace Models
{
    public class Seed
    {
  
        public static void SeedData(TodoContext context)
        {

           if (context.Modules.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                //context.TodoItems.Add(new TodoItem { Name = "Item1" });
                //context.SaveChanges();
                 context.Modules.Add(new Module
                {
                    ModuleName = "Home",
                    ModuleComponent = "Home",
                    ModuleComponentPath = "/Home",
                    ModuleSortId = 10
                });
                context.Modules.Add(new Module
                {
                    ModuleName = "Employee",
                    ModuleComponent = "EmployeeList",
                    ModuleComponentPath = "/EmployeeList",
                    ModuleSortId = 30
                });
                
            }

            if (context.Users.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                //context.TodoItems.Add(new TodoItem { Name = "Item1" });
                //context.SaveChanges();
                context.Users.Add(new User
                {
                    Username = "admin",
                    Password ="password",
                    EmployeeID = 1
                });
                context.Users.Add(new User
                {
                    Username = "user1",
                    Password = "user1",
                    EmployeeID = 2
                });
                context.SaveChanges();
            }

            if (context.UsersAccess.Count() == 0) {
                // Admin -> Home
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 1,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // Admin -> Employee
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // user1 -> Home
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 2,
                    ModuleId = 1,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                // user1 -> Employee
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 2,
                    ModuleId = 2,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                context.SaveChanges();
            }

            if (context.Employees.Count() == 0) {
               context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00001",
                    LastName = "Aguinaldo",
                    FirstName = "Emilio",
                    MiddleName =  "A",
					HomePhone = "H1111111111",
					MobilePhone = "M1111111111",
					BirthDate = DateTime.Parse("1869-2-12"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00002",
                    LastName = "Quezon",
                    FirstName = "Manuel ",
                    MiddleName = "L",
					HomePhone = "H2222222222",
					MobilePhone = "M2222222222",
					BirthDate = DateTime.Parse("1878-8-19"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00003",
                    LastName = "Osmeña",
                    FirstName = "Sergio  ",
                    MiddleName = "L",
					HomePhone = "H3333333333",
					MobilePhone = "M3333333333",
					BirthDate = DateTime.Parse("1878-9-09"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00004",
                    LastName = "Róxas",
                    FirstName = "Manuel",
                    MiddleName = "A",
					HomePhone = "H44444444444",
					MobilePhone = "M4444444444",
					BirthDate = DateTime.Parse("1892-1-1"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00005",
                    LastName = "Laurel",
                    FirstName = "Jose",
                    MiddleName = "P",
					HomePhone = "H5555555555",
					MobilePhone = "M5555555555",
					BirthDate = DateTime.Parse("1891-3-9"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00006",
                    LastName = "Quirino",
                    FirstName = "Elpidio",
                    MiddleName = "R",
					HomePhone = "H66666666666",
					MobilePhone = "M6666666666",
					BirthDate = DateTime.Parse("1890-11-16"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00007",
                    LastName = "Magsaysay",
                    FirstName = "Ramon",
                    MiddleName = "F",
					HomePhone = "H7777777777",
					MobilePhone = "M7777777777",
					BirthDate = DateTime.Parse("1907-03-31"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00008",
                    LastName = "Garcia",
                    FirstName = "Carlos",
                    MiddleName = "P",
					HomePhone = "H8888888888",
					MobilePhone = "M8888888888",
					BirthDate = DateTime.Parse("1896-11-04"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00009",
                    LastName = "Macapagal",
                    FirstName = "Diosdado",
                    MiddleName = "P",
					HomePhone = "H9999999999",
					MobilePhone = "M9999999999",
					BirthDate = DateTime.Parse("1910-09-28"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00010",
                    LastName = "Marcos",
                    FirstName = "Ferdinand",
                    MiddleName = "E",
					HomePhone = "H1010101010",
					MobilePhone = "M1010101010",
					BirthDate = DateTime.Parse("1917-09-11"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00011",
                    LastName = "Aquino",
                    FirstName = "Corazón",
                    MiddleName = "C",
					HomePhone = "H1212121212",
					MobilePhone = "M1212121212",
					BirthDate = DateTime.Parse("1933-01-02"),
                    Gender = 2
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00012",
                    LastName = "Ramos",
                    FirstName = "Fidel",
                    MiddleName = "V",
					HomePhone = "H1313131313",
					MobilePhone = "M1313131313",
                    BirthDate = DateTime.Parse("1928-03-18"),
					Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00013",
                    LastName = "Estrada",
                    FirstName = "Joseph",
                    MiddleName = "E",
					HomePhone = "P141414141414",
					MobilePhone = "M141414141414",
					BirthDate = DateTime.Parse("1937-04-19"),
                    Gender = 1
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00014",
                    LastName = "Macapagal",
                    FirstName = "Gloria",
                    MiddleName = "A",
					HomePhone = "H1515151515",
					MobilePhone = "M1515151515",
					BirthDate = DateTime.Parse("1947-04-05"),
                    Gender = 2
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00015",
                    LastName = "Aquino",
                    FirstName = "Benigno",
                    MiddleName = "C",
					HomePhone = "H1616161616",
					MobilePhone = "M1616161616",
					BirthDate = DateTime.Parse("1960-02-08"),
                    Gender = 2
                });
                context.Employees.Add(new Employee
                {
                    EmployeeNo = "EMP-00016",
                    LastName = "Duterte",
                    FirstName = "Rodrigo",
                    MiddleName = "R",
					HomePhone = "H1717171717",
					MobilePhone = "M1717171717",
					BirthDate = DateTime.Parse("1945-03-28"),
                    Gender = 1
                });

                context.SaveChanges();
            }

            if (context.Genders.Count() == 0)
            {
                context.Genders.Add(new Gender
                {
                    Code = "M",
                    GenderDescr = "Male",
                });

                context.Genders.Add(new Gender
                {
                    Code = "F",
                    GenderDescr = "Female",
                });

                context.Genders.Add(new Gender
                {
                    Code = "O",
                    GenderDescr = "Others",
                });

                context.SaveChanges();
            }

            if (context.CivilStatuses.Count() == 0)
            {
                context.CivilStatuses.Add(new CivilStatus
                {
                    CivilStatCode = "S",
                    CivilStatDescr = "Single",
                });

                context.CivilStatuses.Add(new CivilStatus
                {
                    CivilStatCode = "M",
                    CivilStatDescr = "Married",
                });

                context.CivilStatuses.Add(new CivilStatus
                {
                    CivilStatCode = "W",
                    CivilStatDescr = "Widowed ",
                });

                context.CivilStatuses.Add(new CivilStatus
                {
                    CivilStatCode = "SE",
                    CivilStatDescr = "Separated",
                });

                context.CivilStatuses.Add(new CivilStatus
                {
                    CivilStatCode = "D",
                    CivilStatDescr = "Divorced",
                });

                context.SaveChanges();
            }

            if (context.Nationalities.Count() == 0)
            {
                context.Nationalities.Add(new Nationality
                {
                    NatCode = "AU",
                    NatCodeDescr = "Australia",
                });

                context.Nationalities.Add(new Nationality
                {
                    NatCode = "FR",
                    NatCodeDescr = "France",
                });

                context.Nationalities.Add(new Nationality
                {
                    NatCode = "JP",
                    NatCodeDescr = "Japan",
                });

                context.Nationalities.Add(new Nationality
                {
                    NatCode = "PH",
                    NatCodeDescr = "Philippines ",
                });

                context.Nationalities.Add(new Nationality
                {
                    NatCode = "SG",
                    NatCodeDescr = "Singapore ",
                });

                context.Nationalities.Add(new Nationality
                {
                    NatCode = "US",
                    NatCodeDescr = "United States of America ",
                });
                context.SaveChanges();
            }
        }
    }
}