using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortaleBiblioteca.Server.Data.Models
{
  public class LoanFormCreate
  {
    [Key]
    public int IdLoan { get; set; }
    [Required]
    [ForeignKey("User")]
    public int IdUser { get; set; }
    [Required]
    [ForeignKey("Book")]
    public int IdBook { get; set; }

  }
}
