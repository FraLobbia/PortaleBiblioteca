using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    public partial class uyvUOYGVrg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Users_OwnerId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Loans_Books_IdBook",
                table: "Loans");

            migrationBuilder.DropIndex(
                name: "IX_Loans_IdBook",
                table: "Loans");

            migrationBuilder.DropIndex(
                name: "IX_Items_OwnerId",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "IdBook",
                table: "Loans");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Items",
                newName: "IdLoan");

            migrationBuilder.CreateIndex(
                name: "IX_Items_IdLoan",
                table: "Items",
                column: "IdLoan",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Loans_IdLoan",
                table: "Items",
                column: "IdLoan",
                principalTable: "Loans",
                principalColumn: "IdLoan",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Loans_IdLoan",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_IdLoan",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "IdLoan",
                table: "Items",
                newName: "OwnerId");

            migrationBuilder.AddColumn<int>(
                name: "IdBook",
                table: "Loans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Loans_IdBook",
                table: "Loans",
                column: "IdBook");

            migrationBuilder.CreateIndex(
                name: "IX_Items_OwnerId",
                table: "Items",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Users_OwnerId",
                table: "Items",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "IdUser",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_Books_IdBook",
                table: "Loans",
                column: "IdBook",
                principalTable: "Books",
                principalColumn: "IdBook",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
