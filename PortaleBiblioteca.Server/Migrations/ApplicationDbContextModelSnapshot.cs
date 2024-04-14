﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PortaleBiblioteca.Server.Data;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PortaleBiblioteca.Author", b =>
                {
                    b.Property<int>("IdAuthor")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdAuthor"));

                    b.Property<string>("Biography")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdAuthor");

                    b.ToTable("Authors");
                });

            modelBuilder.Entity("PortaleBiblioteca.Book", b =>
                {
                    b.Property<int>("IdBook")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdBook"));

                    b.Property<string>("CoverImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ISBN")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdAuthor")
                        .HasColumnType("int");

                    b.Property<int>("IdGenre")
                        .HasColumnType("int");

                    b.Property<DateTime>("PublicationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdBook");

                    b.HasIndex("IdAuthor");

                    b.HasIndex("IdGenre");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("PortaleBiblioteca.Genre", b =>
                {
                    b.Property<int>("IdGenre")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdGenre"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdGenre");

                    b.ToTable("Genres");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Aisle", b =>
                {
                    b.Property<int>("IdAisle")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdAisle"));

                    b.Property<int>("AisleNumber")
                        .HasColumnType("int");

                    b.HasKey("IdAisle");

                    b.ToTable("Aisles");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Attendance", b =>
                {
                    b.Property<int>("IdAttendance")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdAttendance"));

                    b.Property<int>("IdEvent")
                        .HasColumnType("int");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.HasKey("IdAttendance");

                    b.HasIndex("IdEvent");

                    b.HasIndex("IdUser");

                    b.ToTable("Attendances");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Event", b =>
                {
                    b.Property<int>("IdEvent")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdEvent"));

                    b.Property<DateTime>("EventDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("EventDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EventImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("EventPrice")
                        .HasColumnType("float");

                    b.Property<string>("EventType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdEvent");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.ItemsEntity", b =>
                {
                    b.Property<int>("IdItemsEntity")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdItemsEntity"));

                    b.Property<DateTime>("ChangeDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdBook")
                        .HasColumnType("int");

                    b.Property<int>("IdShelf")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("IdItemsEntity");

                    b.HasIndex("IdBook");

                    b.HasIndex("IdShelf");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Loan", b =>
                {
                    b.Property<int>("IdLoan")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdLoan"));

                    b.Property<int>("IdBook")
                        .HasColumnType("int");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.Property<DateTime>("LoanDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ReturnDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Returned")
                        .HasColumnType("bit");

                    b.HasKey("IdLoan");

                    b.HasIndex("IdBook");

                    b.HasIndex("IdUser");

                    b.ToTable("Loans");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Review", b =>
                {
                    b.Property<int>("IdReview")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdReview"));

                    b.Property<int>("IdBook")
                        .HasColumnType("int");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.Property<string>("ReviewBody")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ReviewDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("ReviewTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdReview");

                    b.HasIndex("IdBook");

                    b.HasIndex("IdUser");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Shelf", b =>
                {
                    b.Property<int>("IdShelf")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdShelf"));

                    b.Property<int>("IdAisle")
                        .HasColumnType("int");

                    b.Property<int>("ShelfBay")
                        .HasColumnType("int");

                    b.Property<int>("ShelfHeight")
                        .HasColumnType("int");

                    b.HasKey("IdShelf");

                    b.HasIndex("IdAisle");

                    b.ToTable("Shelves");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.User", b =>
                {
                    b.Property<int>("IdUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUser"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserImage")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdUser");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PortaleBiblioteca.Book", b =>
                {
                    b.HasOne("PortaleBiblioteca.Author", "Author")
                        .WithMany("Books")
                        .HasForeignKey("IdAuthor")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortaleBiblioteca.Genre", "Genre")
                        .WithMany("Books")
                        .HasForeignKey("IdGenre")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Attendance", b =>
                {
                    b.HasOne("PortaleBiblioteca.Server.Data.Models.Event", "Event")
                        .WithMany("Participants")
                        .HasForeignKey("IdEvent")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortaleBiblioteca.Server.Data.Models.User", "User")
                        .WithMany("Attendances")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.ItemsEntity", b =>
                {
                    b.HasOne("PortaleBiblioteca.Book", "Book")
                        .WithMany("Items")
                        .HasForeignKey("IdBook")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortaleBiblioteca.Server.Data.Models.Shelf", "Shelf")
                        .WithMany("Items")
                        .HasForeignKey("IdShelf")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Shelf");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Loan", b =>
                {
                    b.HasOne("PortaleBiblioteca.Book", "Book")
                        .WithMany("Loans")
                        .HasForeignKey("IdBook")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortaleBiblioteca.Server.Data.Models.User", "User")
                        .WithMany("Loans")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Review", b =>
                {
                    b.HasOne("PortaleBiblioteca.Book", "Book")
                        .WithMany("Reviews")
                        .HasForeignKey("IdBook")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PortaleBiblioteca.Server.Data.Models.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Shelf", b =>
                {
                    b.HasOne("PortaleBiblioteca.Server.Data.Models.Aisle", "Aisle")
                        .WithMany("Shelves")
                        .HasForeignKey("IdAisle")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aisle");
                });

            modelBuilder.Entity("PortaleBiblioteca.Author", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("PortaleBiblioteca.Book", b =>
                {
                    b.Navigation("Items");

                    b.Navigation("Loans");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("PortaleBiblioteca.Genre", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Aisle", b =>
                {
                    b.Navigation("Shelves");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Event", b =>
                {
                    b.Navigation("Participants");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.Shelf", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("PortaleBiblioteca.Server.Data.Models.User", b =>
                {
                    b.Navigation("Attendances");

                    b.Navigation("Loans");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
