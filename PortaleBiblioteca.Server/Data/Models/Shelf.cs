using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PortaleBiblioteca.Server.Data.Models
{
    public class Shelf
    {
        [Key]
        public int IdShelf { get; set; }
        public int ShelfHeight { get; set; }
        public int ShelfBay { get; set; }
        [Required]
        [ForeignKey("Aisle")]
        public int IdAisle { get; set; }

        public virtual ICollection<Location> Locations { get; set; }

        public Aisle Aisle { get; set; }

    }
}
