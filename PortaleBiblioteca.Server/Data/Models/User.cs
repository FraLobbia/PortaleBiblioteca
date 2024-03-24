using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class User
    {
        [Key]
        public int IdUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string UserImage { get; set; }

        public virtual ICollection<Attendance> Attendances { get; set; }
        public virtual ICollection<Loan> Loans { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }

    }
}
