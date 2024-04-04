using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    /// 
    //eslint-disable-next-line
    public partial class addgenrevirtual : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Genres_GenreIdGenre",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_GenreIdGenre",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GenreIdGenre",
                table: "Books");

            migrationBuilder.CreateIndex(
                name: "IX_Books_IdGenre",
                table: "Books",
                column: "IdGenre");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Genres_IdGenre",
                table: "Books",
                column: "IdGenre",
                principalTable: "Genres",
                principalColumn: "IdGenre",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Genres_IdGenre",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_IdGenre",
                table: "Books");

            migrationBuilder.AddColumn<int>(
                name: "GenreIdGenre",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_GenreIdGenre",
                table: "Books",
                column: "GenreIdGenre");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Genres_GenreIdGenre",
                table: "Books",
                column: "GenreIdGenre",
                principalTable: "Genres",
                principalColumn: "IdGenre");
        }
    }
}
