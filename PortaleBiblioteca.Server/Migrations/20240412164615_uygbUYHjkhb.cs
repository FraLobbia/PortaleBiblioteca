using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    public partial class uygbUYHjkhb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ChangeTime",
                table: "Items",
                newName: "ChangeDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviewDate",
                table: "Reviews",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewDate",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "ChangeDate",
                table: "Items",
                newName: "ChangeTime");
        }
    }
}
