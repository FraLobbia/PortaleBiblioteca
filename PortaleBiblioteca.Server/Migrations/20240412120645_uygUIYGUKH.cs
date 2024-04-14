using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    public partial class uygUIYGUKH : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CheangeTime",
                table: "Items",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheangeTime",
                table: "Items");
        }
    }
}
