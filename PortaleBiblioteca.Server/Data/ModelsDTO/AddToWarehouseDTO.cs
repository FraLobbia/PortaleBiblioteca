using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca
{
    public class AddToWarehouseDTO
    {
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int IdBook { get; set; }
    }
}
