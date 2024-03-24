using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortaleBiblioteca.Server.Migrations
{
    /// <inheritdoc />
    public partial class firstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aisles",
                columns: table => new
                {
                    IdAisle = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AisleNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aisles", x => x.IdAisle);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    IdBooks = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvailableQuantity = table.Column<int>(type: "int", nullable: false),
                    LoanQuantity = table.Column<int>(type: "int", nullable: false),
                    PublicationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ISBN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoverImage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.IdBooks);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    IdEvent = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EventDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventPrice = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.IdEvent);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserImage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IdUser);
                });

            migrationBuilder.CreateTable(
                name: "Shelfs",
                columns: table => new
                {
                    IdShelf = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShelfHeight = table.Column<int>(type: "int", nullable: false),
                    ShelfBay = table.Column<int>(type: "int", nullable: false),
                    IdAisle = table.Column<int>(type: "int", nullable: false),
                    AisleIdAisle = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shelfs", x => x.IdShelf);
                    table.ForeignKey(
                        name: "FK_Shelfs_Aisles_AisleIdAisle",
                        column: x => x.AisleIdAisle,
                        principalTable: "Aisles",
                        principalColumn: "IdAisle");
                });

            migrationBuilder.CreateTable(
                name: "Attendances",
                columns: table => new
                {
                    IdAttendance = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdEvent = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    EventIdEvent = table.Column<int>(type: "int", nullable: true),
                    UserIdUser = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendances", x => x.IdAttendance);
                    table.ForeignKey(
                        name: "FK_Attendances_Events_EventIdEvent",
                        column: x => x.EventIdEvent,
                        principalTable: "Events",
                        principalColumn: "IdEvent");
                    table.ForeignKey(
                        name: "FK_Attendances_Users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "Users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "Loans",
                columns: table => new
                {
                    IdLoan = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LoanDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    IdBook = table.Column<int>(type: "int", nullable: false),
                    BookIdBooks = table.Column<int>(type: "int", nullable: true),
                    UserIdUser = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loans", x => x.IdLoan);
                    table.ForeignKey(
                        name: "FK_Loans_Books_BookIdBooks",
                        column: x => x.BookIdBooks,
                        principalTable: "Books",
                        principalColumn: "IdBooks");
                    table.ForeignKey(
                        name: "FK_Loans_Users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "Users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    IdReview = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdBook = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    ReviewTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReviewBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BookIdBooks = table.Column<int>(type: "int", nullable: true),
                    UserIdUser = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.IdReview);
                    table.ForeignKey(
                        name: "FK_Reviews_Books_BookIdBooks",
                        column: x => x.BookIdBooks,
                        principalTable: "Books",
                        principalColumn: "IdBooks");
                    table.ForeignKey(
                        name: "FK_Reviews_Users_UserIdUser",
                        column: x => x.UserIdUser,
                        principalTable: "Users",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    IdLocation = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdShelf = table.Column<int>(type: "int", nullable: false),
                    IdBook = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    BookIdBooks = table.Column<int>(type: "int", nullable: true),
                    ShelfIdShelf = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.IdLocation);
                    table.ForeignKey(
                        name: "FK_Locations_Books_BookIdBooks",
                        column: x => x.BookIdBooks,
                        principalTable: "Books",
                        principalColumn: "IdBooks");
                    table.ForeignKey(
                        name: "FK_Locations_Shelfs_ShelfIdShelf",
                        column: x => x.ShelfIdShelf,
                        principalTable: "Shelfs",
                        principalColumn: "IdShelf");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_EventIdEvent",
                table: "Attendances",
                column: "EventIdEvent");

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_UserIdUser",
                table: "Attendances",
                column: "UserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Loans_BookIdBooks",
                table: "Loans",
                column: "BookIdBooks");

            migrationBuilder.CreateIndex(
                name: "IX_Loans_UserIdUser",
                table: "Loans",
                column: "UserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_BookIdBooks",
                table: "Locations",
                column: "BookIdBooks");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_ShelfIdShelf",
                table: "Locations",
                column: "ShelfIdShelf");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_BookIdBooks",
                table: "Reviews",
                column: "BookIdBooks");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserIdUser",
                table: "Reviews",
                column: "UserIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Shelfs_AisleIdAisle",
                table: "Shelfs",
                column: "AisleIdAisle");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attendances");

            migrationBuilder.DropTable(
                name: "Loans");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Shelfs");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Aisles");
        }
    }
}
