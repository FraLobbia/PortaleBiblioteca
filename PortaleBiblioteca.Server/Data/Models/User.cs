using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class User
    {
        [Key]
        public int IdUser { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
        public string UserImage { get; set; }

        public virtual ICollection<Loan> Loans { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }

    }
}
