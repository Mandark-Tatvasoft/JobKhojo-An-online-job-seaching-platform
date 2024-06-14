using BusinessLogic.Repository;
using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ILogin, Login>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IJobs, Jobs>();
builder.Services.AddScoped<ILocations, Locations>();
builder.Services.AddScoped<IUsers, Users>();
builder.Services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; });
builder.Services.AddDistributedMemoryCache();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
    builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
