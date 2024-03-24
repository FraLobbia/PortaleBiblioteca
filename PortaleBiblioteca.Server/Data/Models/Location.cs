using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class Location
    {
        [Key]
        public int IdLocation { get; set; }

        [ForeignKey("Shelf")]
        public int IdShelf { get; set; }

        [ForeignKey("Book")]
        public int IdBook { get; set; }
        public int Quantity { get; set; }
    }
}
