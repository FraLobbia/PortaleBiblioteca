namespace PortaleBiblioteca.Server.Data
{
    public static class UserRole
    {
        public const string Admin = "admin";
        public const string FromLibrarianToUp = "librarian" + "," + "admin";
        public const string FromUserToUp = "admin" + "," + "librarian" + "," + "user";

    }
}
