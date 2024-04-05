

using PortaleBiblioteca.Server.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca
{
    public class BookEditDTO : BookCreateDTO
    {
        public int IdBook { get; set; }
        [Required]
        public int availableQuantity { get; set; }
    }
}
