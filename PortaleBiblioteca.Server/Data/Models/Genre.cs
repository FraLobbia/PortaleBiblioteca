using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca
{
    public class Genre
    {
        [Key]
        public int IdGenre { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }

}
