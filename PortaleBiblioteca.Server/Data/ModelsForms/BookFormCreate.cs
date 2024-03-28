using PortaleBiblioteca.Server.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca
{
    public class BookFormCreate
    {
        [Key]
        public int IdBooks { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        public DateTime PublicationDate { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string CoverImage { get; set; }
    }
}
