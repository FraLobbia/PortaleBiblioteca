using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PortaleBiblioteca.Server.Data.Models
{
    public class ItemsEntity
    {
        [Key]
        public int IdItemsEntity { get; set; }


        [ForeignKey("Book")]
        public int IdBook { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        [EnumDataType(typeof(ItemsEntityStatus))]
        public ItemsEntityStatus Status { get; set; }


        public Book Book { get; set; }

        public enum ItemsEntityStatus
        {
            Available,
            NotAvailable,
            ReservedToBePicked,
            AtLibrarianDesk,
            CheckedOutForLoan,
        }
    }
}
