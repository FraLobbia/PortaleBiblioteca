

using PortaleBiblioteca.Server.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca
{
    public class BookFormEdit : BookFormCreate
    {
        public int IdBook { get; set; }
        [Required]
        public int availableQuantity { get; set; }
    }
}
