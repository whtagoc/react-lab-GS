1. Open terminal to run API

> cd API

> dotnet dev-certs https

> dotnet dev-certs https --trust 

> dotnet watch run

2. Open another terminal to run React-App

> cd react-app

> npm start


UserID : user1
Password : user1



Install/add Swashbuckle.AspNetCore.SwaggerGen v5.6.3

1.) ctrl + shift P
2.) select  NuGet Package Manager: Add Package
3.) enter Swashbuckle.AspNetCore.SwaggerGen
4.) select Swashbuckle.AspNetCore.SwaggerGen
5.) enter the version v5.6.3
6.) To whcih project file do you wish to add this depency?
    select your csproj (example TodoApi) 

Install/add Swashbuckle.AspNetCore.SwaggerUI v5.6.3

1.) ctrl + shift P
2.) select  NuGet Package Manager: Add Package
3.) enter Swashbuckle.AspNetCore.SwaggerUI
4.) select Swashbuckle.AspNetCore.SwaggerUI
5.) enter the version v5.6.3
6.) To whcih project file do you wish to add this depency?
    select your csproj (example TodoApi) 
	
II.  Register Swagger Client in startup.cs file

	Add the Swagger generator to the services collection in the Startup.ConfigureServices method,
	
	......
	
	using Microsoft.OpenApi.Models;
	
	......

	// This method gets called by the runtime. Use this method to add services to the container.
	public void ConfigureServices(IServiceCollection services)
	{
		// Register the Swagger generator, defining 1 or more Swagger documents
		services.AddSwaggerGen(c =>
		{
			c.SwaggerDoc("v2", new OpenApiInfo { Title = "MVCCallWebAPI", Version = "v2" });
		});
		......
	}	


III. Enable the middleware for serving the generated JSON document and the Swagger UI, in the Startup.Configure method.

	// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
	public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		// Enable middleware to serve generated Swagger as a JSON endpoint.
		app.UseSwagger();

		// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
		// specifying the Swagger JSON endpoint.
		app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v2/swagger.json", "MVCCallWebAPI");
    });
    ......
}
