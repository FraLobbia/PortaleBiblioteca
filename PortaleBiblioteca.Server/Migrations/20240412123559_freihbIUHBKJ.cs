using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    public partial class freihbIUHBKJ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CheangeTime",
                table: "Items",
                newName: "ChangeTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ChangeTime",
                table: "Items",
                newName: "CheangeTime");
        }
    }
}
