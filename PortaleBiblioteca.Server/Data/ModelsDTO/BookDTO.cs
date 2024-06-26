using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca
{
    public class BookDTO
    {
        [Key]
        public int IdBook { get; set; }
        [Required]
        public int IdAuthor { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int IdGenre { get; set; }
        [Required]
        public DateTime PublicationDate { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string CoverImage { get; set; }
    }
}
