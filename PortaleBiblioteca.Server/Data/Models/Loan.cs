using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class Loan
    {
        [Key]
        public int IdLoan { get; set; }
        [Required]
        public DateTime LoanDate { get; set; }
        [Required]
        [ForeignKey("User")]
        public int IdUser { get; set; }
        [Required]
        [ForeignKey("Book")]
        public int IdBook { get; set; }

        public bool Returned { get; set; }

        public DateTime? ReturnDate { get; set; }

        public Book Book { get; set; }
        public User User { get; set; }

    }
}
