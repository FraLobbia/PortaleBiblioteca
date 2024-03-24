using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data.Models;
namespace PortaleBiblioteca.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options) { }

    // Aggiungi le tabelle con DbSet
    public DbSet<Book> Books { get; set; }
    public DbSet<Aisle> Aisles { get; set; }
    public DbSet<Shelf> Shelfs { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Loan> Loans { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Attendance> Attendances { get; set; }
    public DbSet<Event> Events { get; set; }

}

