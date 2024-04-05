using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class Aisle
    {
        [Key]
        public int IdAisle { get; set; }
        [Required]
        public int AisleNumber { get; set; }

        // Corsie VIRTUALI:
        // corsia 110: Librarian Desk
        // corsia 120: Magazzino
        // corsia 130: Per prestiti, ciò che è fuori sede

        // Corsie FISICHE:
        // da corsia 200 in poi

        public virtual ICollection<Shelf> Shelves { get; set; }
    }
}
