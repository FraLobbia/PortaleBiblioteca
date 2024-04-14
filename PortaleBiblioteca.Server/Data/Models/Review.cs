using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace PortaleBiblioteca.Server.Data.Models
{
    public class Review
    {
        [Key]
        public int IdReview { get; set; }
        [Required]
        [ForeignKey("Book")]
        public int IdBook { get; set; }
        [Required]
        [ForeignKey("User")]
        public int IdUser { get; set; }
        [Required]
        public string ReviewTitle { get; set; }

        public DateTime ReviewDate { get; set; }
        [Required]
        public string ReviewBody { get; set; }

        public virtual Book Book { get; set; }

        public virtual User User { get; set; }
    }
}
