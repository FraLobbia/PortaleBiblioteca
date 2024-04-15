using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class ItemsEntity
    {
        [Key]
        public int IdItemsEntity { get; set; }

        [ForeignKey("Book")]
        public int IdBook { get; set; }
        [JsonIgnore]
        public virtual Book Book { get; set; }
        [Required]
        public DateTime ChangeDate { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        [EnumDataType(typeof(ItemsEntityStatus))]
        public ItemsEntityStatus Status { get; set; }
        [Required]
        [ForeignKey("Shelf")]
        public int IdShelf { get; set; }
        [JsonIgnore]
        public virtual Shelf Shelf { get; set; }

        public enum ItemsEntityStatus
        {
            Available,
            NotAvailable,
            ReservedToBePicked,
            AtLibrarianDesk,
            AtWarehouse,
            CheckedOutForLoan,
        }
    }
}
