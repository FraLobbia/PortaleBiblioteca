using PortaleBiblioteca.Server.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca
{
    public class Book
    {
        [Key]
        public int IdBook { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Genre { get; set; }
        public int AvailableQuantity { get; set; }

        public DateTime PublicationDate { get; set; }
        public string ISBN { get; set; }
        public string CoverImage { get; set; }

        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Loan> Loans { get; set; }

    }

}
