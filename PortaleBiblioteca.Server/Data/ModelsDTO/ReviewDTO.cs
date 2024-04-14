using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace PortaleBiblioteca.Server.Data.Models
{
    public class ReviewDTO
    {

        public int IdReview { get; set; }


        public int IdBook { get; set; }
        public virtual Book Book { get; set; }

        public int IdUser { get; set; }
        public virtual User User { get; set; }

        public string ReviewTitle { get; set; }

        public DateTime ReviewDate { get; set; }

        public string ReviewBody { get; set; }

    }
}
