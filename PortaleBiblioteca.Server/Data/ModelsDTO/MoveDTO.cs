using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class MoveDTO
    {
        public char HeightChar { get; set; }

        public Height Height
        {
            get
            {
                return HeightChar switch
                {
                    'A' => Height.A,
                    'B' => Height.B,
                    'C' => Height.C,
                    'D' => Height.D,
                    'E' => Height.E,
                    _ => Height.A,
                };
            }
        }

        public int IdAisle { get; set; }

        public int ShelfBay { get; set; }

        public int IdBook { get; set; }

        public int Quantity { get; set; }

        public int MoveSourceShelfId { get; set; }

    }
}
