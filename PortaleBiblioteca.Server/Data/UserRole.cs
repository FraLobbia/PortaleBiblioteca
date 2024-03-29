namespace PortaleBiblioteca.Server.Data
{
    public static class UserRole
    {
        public const string Admin = "Admin" + "," + "Librarian" + "," + "User";
        public const string FromLibrarianToUp = "Librarian" + "," + "User";
        public const string FromUserToUp = "User";

    }
}
