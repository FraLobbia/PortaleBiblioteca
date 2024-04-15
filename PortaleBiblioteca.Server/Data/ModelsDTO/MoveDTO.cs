using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class MoveDTO
    {
        public Height Height { get; set; }

        public int IdAisle { get; set; }

        public int ShelfBay { get; set; }

        public int IdBook { get; set; }

        public int Quantity { get; set; }

        public int MoveSourceShelfId { get; set; }

    }
}
