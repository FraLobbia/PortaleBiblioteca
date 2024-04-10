using PortaleBiblioteca.Server.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace PortaleBiblioteca
{
  public class Author
  {
    [Key]
    public int IdAuthor { get; set; }
    [Required]
    public string Name { get; set; }
    public string Biography { get; set; }
    public string Image { get; set; }
    [JsonIgnore]
    public virtual ICollection<Book> Books { get; set; }

  }
}