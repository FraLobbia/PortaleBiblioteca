using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [Required]
        public string ReviewBody { get; set; }
    }
}
