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
                    ModuleSortId = 20
                });
                context.Modules.Add(new Module
                {
                    ModuleName = "Skill",
                    ModuleComponent = "SkillList",
                    ModuleComponentPath = "/SkillList",
                    ModuleSortId = 30
                });
                context.Modules.Add(new Module
                {
                    ModuleName = "Project",
                    ModuleComponent = "ProjectList",
                    ModuleComponentPath = "/ProjectList",
                    ModuleSortId = 50
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
                 context.Users.Add(new User
                {
                    Username = "user2",
                    Password = "user2",
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
                // Admin -> Skill
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 3,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });
                 // Admin -> Project
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 1,
                    ModuleId = 4,
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
                // user1 -> Employee
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 2,
                    ModuleId = 3,
                    AllowView = "Y",
                    AllowInsert = "Y",
                    AllowUpdate = "Y",
                    AllowDelete = "Y"
                });

                // user2 -> Home
                context.UsersAccess.Add(new UserAccess
                {
                    UserId = 3,
                    ModuleId = 1,
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

            if (context.Skills.Count() == 0)
            {
                context.Skills.Add(new Skill
                {
                    SkillCode = "ASP",
                    SkillDescr = "MS Active Server Page classic",
                });

                 context.Skills.Add(new Skill
                {
                    SkillCode = "ASPDOTMET",
                    SkillDescr = "MS Active Server Page Dot Net",
                });

                 context.Skills.Add(new Skill
                {
                    SkillCode = "CBL",
                    SkillDescr = "COBOL Common Business Language",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "CSS",
                    SkillDescr = "Cascading Style Sheets",
                });

                 context.Skills.Add(new Skill
                {
                    SkillCode = "CSHARP",
                    SkillDescr = "C Sharp",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "HTML50",
                    SkillDescr = "Hyper Text Markup Language 5.0",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "JAVAN",
                    SkillDescr = "Java Native",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "JS",
                    SkillDescr = "JavaScript",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "JSQ",
                    SkillDescr = "JQuery",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "MSSQLSVR",
                    SkillDescr = "Microsoft SQL Server",
                });

                 context.Skills.Add(new Skill
                {
                    SkillCode = "MSSQLSVRAD",
                    SkillDescr = "Microsoft SQL Server Administrator",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "ORADB",
                    SkillDescr = "ORACLE Database",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "ORADBAD",
                    SkillDescr = "ORACLE Database Administrator",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "ORAPLSQL",
                    SkillDescr = "ORACLE PL SQL",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "PHPLAR",
                    SkillDescr = "PHP Laravel",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "PHPN",
                    SkillDescr = "PHP Native",
                });

                 context.Skills.Add(new Skill
                {
                    SkillCode = "RJS",
                    SkillDescr = "React JS",
                });

                context.Skills.Add(new Skill
                {
                    SkillCode = "VB60",
                    SkillDescr = "MS Visual Basic 6.0",
                });
                context.SaveChanges();
            }

            if (context.EmployeeSkillSets.Count() == 0)
            {
                context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 1,
                    SkillId = 1,
                    ProficiencyLevel = 8
                });

                context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 1,
                    SkillId = 2,
                    ProficiencyLevel = 9
                });

                context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 1,
                    SkillId = 3,
                    ProficiencyLevel = 10
                });

                 context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 1,
                    SkillId = 4,
                    ProficiencyLevel = 7
                });

                 context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 1,
                    SkillId = 5,
                    ProficiencyLevel = 5
                });


                 context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 2,
                    SkillId = 6,
                    ProficiencyLevel = 7
                });

                context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 2,
                    SkillId = 7,
                    ProficiencyLevel = 8
                });

                context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 2,
                    SkillId = 8,
                    ProficiencyLevel = 9
                });

                 context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 2,
                    SkillId = 9,
                    ProficiencyLevel = 10
                });

                 context.EmployeeSkillSets.Add(new EmployeeSkillSet
                {
                    EmployeeId = 2,
                    SkillId = 11,
                    ProficiencyLevel = 2
                });
                context.SaveChanges();
            }

            if (context.ProjectTypes.Count() == 0) {
                context.ProjectTypes.Add(new ProjectType
                {
                    TypeDescription = "Development" 
                });
                context.ProjectTypes.Add(new ProjectType
                {
                    TypeDescription = "Maintenace and Support" 
                });

                context.SaveChanges();
            }   

            if (context.ProjectTerms.Count() == 0) {
                context.ProjectTerms.Add(new ProjectTerms
                {
                    TermDescription = "Monthly" 
                });
                context.ProjectTerms.Add(new ProjectTerms
                {
                    TermDescription = "Quarterly" 
                });
                context.ProjectTerms.Add(new ProjectTerms
                {
                    TermDescription = "Annually" 
                });

                context.SaveChanges();
            }

            if (context.Currencies.Count() == 0) {
                context.Currencies.Add(new Currency {
                    CurrencyAbbr = "PHP" ,
                    CurrencyDescription = "Philippine Peso"
                });
                context.Currencies.Add(new Currency {
                    CurrencyAbbr = "SGD" ,
                    CurrencyDescription = "Singapore Dollar"
                });
                context.Currencies.Add(new Currency {
                    CurrencyAbbr = "USD" ,
                    CurrencyDescription = "United State Dollar"
                });
                context.Currencies.Add(new Currency {
                    CurrencyAbbr = "YEN" ,
                    CurrencyDescription = "Japaness Yen"
                });

                context.SaveChanges();
            }

            if (context.ProjectPositions.Count() == 0) { 
                context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Project Group Manager"
                });
                context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Project Manager"
                });
                 context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Project Assistant Manager"
                });
                context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Project Team Leader"
                });
                context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Project Assistant Team Leader"
                });
                context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Project Senior Developer"
                });
                context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Project Junior Developer"
                });
                context.ProjectPositions.Add(new ProjectPosition {
                    PositionDescription = "Bridge Engineer"
                });

                context.SaveChanges();
            } 


            if (context.Projects.Count() == 0) { 
                context.Projects.Add(new Project {
                    Code  = "PROJ-ZOZOTOWN",
                    CustomerId = 1,
                    TypeId = 2,
                    Name = "ZOZOTOWN eCommerce",
                    Description = "ZOZOTOWN eCommerce enhancement",
                    BillingCost = decimal.Parse("12345678912.987"),
                    BillingTermID = 3,
                    BillingCurrencyId = 4,
                    ContractStartDate = DateTime.Parse("2019-01-01"),
                    ContractEndDate =  DateTime.Parse("2020-01-31")
                });
                context.Projects.Add(new Project {
                    Code  = "PROJ-ZOZOLP",
                    CustomerId = 1,
                    TypeId = 2,
                    Name = "ZOZO Landing Page",
                    Description = "ZOZOT Landing Page Development",
                    BillingCost = decimal.Parse("12345678912.987"),
                    BillingTermID = 3,
                    BillingCurrencyId = 4,
                    ContractStartDate = DateTime.Parse("2019-01-01"),
                    ContractEndDate =  DateTime.Parse("2020-01-31")
                });
                context.Projects.Add(new Project {
                    Code  = "PROJ-ZOZOMAT",
                    CustomerId = 1,
                    TypeId = 1,
                    Name = "ZOZO MAT MAT",
                    Description = "ZOZOT MAT MAT Development",
                    BillingCost = decimal.Parse("12345678912.987"),
                    BillingTermID = 3,
                    BillingCurrencyId = 4,
                    ContractStartDate = DateTime.Parse("2019-01-01"),
                    ContractEndDate =  DateTime.Parse("2020-01-31")
                });
                context.Projects.Add(new Project {
                    Code  = "IIOFC123",
                    CustomerId = 2,
                    TypeId = 1,
                    Name = "II OFFICE APPLICATION",
                    Description = "II OFFICE Development",
                    BillingCost = decimal.Parse("12345678912.987"),
                    BillingTermID = 3,
                    BillingCurrencyId = 4,
                    ContractStartDate = DateTime.Parse("2019-01-01"),
                    ContractEndDate =  DateTime.Parse("2020-01-31")
                });
                context.SaveChanges();
            }

            if (context.CustomerCompanies.Count() == 0) { 
                context.CustomerCompanies.Add(new CustomerCompany {
                    Code  = "ZOZOCODE123",
                    Name = "ZOZO COMPANY"
                } ); 
                context.CustomerCompanies.Add(new CustomerCompany {
                    Code  = "IIOFCCODE123",
                    Name = "II OFFICE"
                });
                context.SaveChanges();
            }

            if (context.ProjectEmpAssigments.Count() == 0) { 
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 1,
                    EmployeeId = 1,
					PercentageAllocation = 10,
                    PositionId = 2,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 1, 
                    EmployeeId = 2,
					PercentageAllocation = 15,
                    PositionId = 3,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 1,
                    EmployeeId = 3,
					PercentageAllocation = 20,
                    PositionId = 4,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
  
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 2,
                    EmployeeId = 4,
					PercentageAllocation = 25,
                    PositionId = 2,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 2, 
                    EmployeeId = 5,
					PercentageAllocation = 30,
                    PositionId = 3,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 2,
                    EmployeeId = 6,
					PercentageAllocation = 35,
                    PositionId = 4,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
             
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 3,
                    EmployeeId = 7,
					PercentageAllocation = 40,
                    PositionId = 2,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 3, 
                    EmployeeId = 8,
					PercentageAllocation = 45,
                    PositionId = 3,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
                context.ProjectEmpAssigments.Add(new ProjectEmpAssigment {
                    ProjId  = 3,
                    EmployeeId = 9,
					PercentageAllocation = 50,
                    PositionId = 4,
                    AssignmentStart =  DateTime.Parse("2019-01-01"),
                    AssignmentEnd = DateTime.Parse("2019-05-31")
                });
                context.SaveChanges();
           }
        }
    }
}