using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<CivilStatus> CivilStatuses { get; set; }
        public DbSet<Nationality> Nationalities {get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<UserAccess> UsersAccess { get; set; }
        public DbSet<UserSession> UsersSession { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
       {
           base.OnModelCreating(builder);
           builder.Entity<User>().HasKey(p => p.Id);
           builder.Entity<User>().Property(p => p.Username).HasColumnType("varchar(15)").IsRequired();
           builder.Entity<User>().HasIndex(p => p.Username).IsUnique();
           builder.Entity<User>().Property(p => p.Password).HasColumnType("varchar(15)").IsRequired();

           builder.Entity<Module>().HasKey(p => p.Id);
           builder.Entity<Module>().Property(p => p.ModuleName).HasColumnType("varchar(50)").IsRequired();
           builder.Entity<Module>().Property(p => p.ModuleComponent).HasColumnType("varchar(50)").IsRequired();
           builder.Entity<Module>().Property(p => p.ModuleSortId).HasColumnType("varchar(50)").IsRequired();
           builder.Entity<Module>().HasIndex(p => p.ModuleSortId).IsUnique();

           builder.Entity<UserAccess>().HasKey(p => p.Id);
           builder.Entity<UserAccess>().Property(p => p.UserId).IsRequired();
           builder.Entity<UserAccess>().Property(p => p.ModuleId).IsRequired();
           builder.Entity<UserAccess>().Property(p => p.AllowView).HasColumnType("char(1)");
           builder.Entity<UserAccess>().Property(p => p.AllowInsert).HasColumnType("char(1)");
           builder.Entity<UserAccess>().Property(p => p.AllowUpdate).HasColumnType("char(1)");
           builder.Entity<UserAccess>().Property(p => p.AllowDelete).HasColumnType("char(1)");

            builder.Entity<Employee>().HasKey(p => p.ID);
            builder.Entity<Employee>().Property(p => p.EmployeeNo).HasColumnType("varchar(50)").IsRequired();
            builder.Entity<Employee>().Property(p => p.LastName).HasColumnType("varchar(30)").IsRequired();
            builder.Entity<Employee>().Property(p => p.FirstName).HasColumnType("varchar(30)").IsRequired();
            builder.Entity<Employee>().Property(p => p.MiddleName).HasColumnType("varchar(30)").IsRequired();
            builder.Entity<Employee>().Property(p => p.HomePhone).HasColumnType("varchar(30)").IsRequired();
            builder.Entity<Employee>().Property(p => p.MobilePhone).HasColumnType("varchar(30)").IsRequired();
            builder.Entity<Employee>().Property(p => p.BirthDate).IsRequired();
            builder.Entity<Employee>().Property(p => p.Gender).IsRequired();
            //builder.Entity<Employee>().Property(p => p.CivilStatusID).IsRequired();
            //builder.Entity<Employee>().Property(p => p.NationalityID).IsRequired();
            //builder.Entity<Employee>().Property(p => p.WorkEmailAddress).HasColumnType("varchar(100)").IsRequired();
            //builder.Entity<Employee>().Property(p => p.OtherEmailAddress).HasColumnType("varchar(100)");

            builder.Entity<Gender>().Property(p => p.Id);
            builder.Entity<Gender>().Property(p => p.Code).HasColumnType("char(1)").IsRequired();
            builder.Entity<Gender>().Property(p => p.GenderDescr).HasColumnType("varchar(30)").IsRequired();

        }

    }
}