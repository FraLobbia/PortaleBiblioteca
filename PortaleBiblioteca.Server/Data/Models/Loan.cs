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

        public bool Returned { get; set; }

        public DateTime? ReturnDate { get; set; }

        [Required]
        [ForeignKey("User")]
        public int IdUser { get; set; }
        [JsonInclude]
        public User User { get; set; }

        public ItemsEntity Item { get; set; }

    }
}
