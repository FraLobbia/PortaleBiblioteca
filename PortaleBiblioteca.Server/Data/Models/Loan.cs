using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public virtual Book Book { get; set; }

        public virtual User User { get; set; }

    }
}
