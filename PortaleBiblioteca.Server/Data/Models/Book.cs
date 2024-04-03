using PortaleBiblioteca.Server.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortaleBiblioteca
{
    public class Book
    {
        [Key]
        public int IdBook { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [ForeignKey("Genre")]
        public int IdGenre { get; set; }
        public int AvailableQuantity { get; set; }

        public DateTime PublicationDate { get; set; }
        public string ISBN { get; set; }
        public string CoverImage { get; set; }

        public Genre Genre { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Loan> Loans { get; set; }

    }

}
