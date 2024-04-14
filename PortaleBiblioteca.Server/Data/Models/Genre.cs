using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace PortaleBiblioteca
{
    public class Genre
    {
        [Key]
        public int IdGenre { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public virtual ICollection<Book> Books { get; set; }
    }
}
