using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    public partial class rsgardUYGUYH : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Shelves_ShelfIdShelf",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_ShelfIdShelf",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "ShelfIdShelf",
                table: "Items");

            migrationBuilder.CreateIndex(
                name: "IX_Items_IdShelf",
                table: "Items",
                column: "IdShelf");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Shelves_IdShelf",
                table: "Items",
                column: "IdShelf",
                principalTable: "Shelves",
                principalColumn: "IdShelf",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Shelves_IdShelf",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_IdShelf",
                table: "Items");

            migrationBuilder.AddColumn<int>(
                name: "ShelfIdShelf",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_ShelfIdShelf",
                table: "Items",
                column: "ShelfIdShelf");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Shelves_ShelfIdShelf",
                table: "Items",
                column: "ShelfIdShelf",
                principalTable: "Shelves",
                principalColumn: "IdShelf");
        }
    }
}
