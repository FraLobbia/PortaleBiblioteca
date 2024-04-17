using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    public partial class idLoanNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Loans_IdLoan",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_IdLoan",
                table: "Items");

            migrationBuilder.AlterColumn<int>(
                name: "IdLoan",
                table: "Items",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Items_IdLoan",
                table: "Items",
                column: "IdLoan",
                unique: true,
                filter: "[IdLoan] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Loans_IdLoan",
                table: "Items",
                column: "IdLoan",
                principalTable: "Loans",
                principalColumn: "IdLoan");
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

            migrationBuilder.AlterColumn<int>(
                name: "IdLoan",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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
    }
}
