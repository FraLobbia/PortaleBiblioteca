using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace PortaleBiblioteca.Server.Data.Models
{
    public class Shelf
    {
        [Key]
        public int IdShelf { get; set; }
        [Required]
        [ForeignKey("Aisle")]
        public int IdAisle { get; set; }
        public virtual Aisle Aisle { get; set; }

        [Required]
        [EnumDataType(typeof(Height))]
        public Height ShelfHeight { get; set; } // A, B, C, D, E

        [Required]
        [Range(1, 100)]
        public int ShelfBay { get; set; }

        public string ShelfName
        {
            get
            {   // something like 1-A1 or 6-C3
                if (Aisle.AisleNumber >= 200)
                {
                    return "Magazzino " + Aisle.AisleNumber + " - " + ShelfHeight + ShelfBay;
                }
                else
                {

                    return "Corsia " + Aisle.AisleNumber + " - " + ShelfHeight + ShelfBay;
                }
            }
        }

        [Required]
        [EnumDataType(typeof(Type))]
        public Type ShelfType
        {
            get
            {
                if (Aisle.AisleNumber < 200)
                {
                    switch (Aisle.AisleNumber)
                    {
                        case 110:
                            return Type.LibrarianDesk;
                        case 120:
                            return Type.Virtual;
                        default:
                            return Type.Physical;
                    }
                }
                else
                {
                    return Type.Warehouse;
                }

            }
        }

        [JsonIgnore]
        public virtual ICollection<ItemsEntity> Items { get; set; }


        public enum Type
        {
            LibrarianDesk, // 0 nel db
            Warehouse, // 1
            Virtual, // 2
            Physical // 3
        }

        public enum Height
        {
            A, // 0 nel db
            B, // 1 
            C, // 2
            D, // 3
            E, // 4
        }
    }
}
