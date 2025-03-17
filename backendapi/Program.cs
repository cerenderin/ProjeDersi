using Microsoft.EntityFrameworkCore;
using MamaaNoktasiApi.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// DbContext'i ekliyoruz
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// CORS politikası ekliyoruz
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .SetIsOriginAllowed(_ => true) // Tüm originlere izin ver
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins(
                "exp://10.40.56.132:8081",      // Sizin Expo Go App
                "http://10.40.56.132:8081",     // Sizin Web
                "http://localhost:8081",        // Local Web
                "http://localhost:19006",       // Expo Web
                "http://localhost:19000",       // Expo CLI
                "exp://localhost:8081"         // Local Expo
            )
            .AllowCredentials();
    });
});

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware sıralaması önemli!
app.UseHttpsRedirection();
app.UseCors("AllowAll"); // CORS'u authentication'dan önce kullan
app.UseAuthentication(); // Authentication'ı authorization'dan önce kullan
app.UseAuthorization();

app.MapControllers();

app.Run();