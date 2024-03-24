using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class Aisle
    {
        [Key]
        public int IdAisle { get; set; }
        [Required]
        public int AisleNumber { get; set; }

        public virtual ICollection<Shelf> Shelves { get; set; }
    }
}
