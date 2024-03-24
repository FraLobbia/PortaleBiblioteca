namespace PortaleBiblioteca.Server.Data
{
    public class UserRole
    {
        public const string Admin = "Admin";
        public const string Librarian = "Librarian";
        public const string User = "User";
        public const string Librarian_User = Librarian + "," + User;
    }
}
