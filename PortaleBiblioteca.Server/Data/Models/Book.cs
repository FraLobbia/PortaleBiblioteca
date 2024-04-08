﻿using PortaleBiblioteca.Server.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
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


        public int AvailableQuantity
        {
            get
            {
                int quantity = 0;
                if (Items != null)
                {
                    foreach (var entity in Items)
                    {
                        if (entity.Status == ItemsEntity.ItemsEntityStatus.Available)
                        {
                            quantity += entity.Quantity;
                        }
                    }
                }
                return quantity;
            }
        }

        public int WarehouseQuantity
        {
            get
            {
                int quantity = 0;
                if (Items != null)
                {
                    foreach (var entity in Items)
                    {
                        if (entity.Status == ItemsEntity.ItemsEntityStatus.AtWarehouse)
                        {
                            quantity += entity.Quantity;
                        }
                    }
                }
                return quantity;
            }
        }

        public int NotAvailableQuantity
        {
            get
            {
                int quantity = 0;
                if (Items != null)
                {
                    foreach (var entity in Items)
                    {
                        if (entity.Status == ItemsEntity.ItemsEntityStatus.NotAvailable)
                        {
                            quantity += entity.Quantity;
                        }
                    }
                }
                return quantity;
            }
        }

        public int ReservedToBePickedQuantity
        {
            get
            {
                int quantity = 0;
                if (Items != null)
                {
                    foreach (var entity in Items)
                    {
                        if (entity.Status == ItemsEntity.ItemsEntityStatus.ReservedToBePicked)
                        {
                            quantity += entity.Quantity;
                        }
                    }
                }
                return quantity;
            }
        }

        public int AtLibrarianDeskPickedQuantity
        {
            get
            {
                int quantity = 0;
                if (Items != null)
                {
                    foreach (var entity in Items)
                    {
                        if (entity.Status == ItemsEntity.ItemsEntityStatus.AtLibrarianDesk)
                        {
                            quantity += entity.Quantity;
                        }
                    }
                }
                return quantity;
            }
        }

        public int CheckedOutForLoanQuantity
        {
            get
            {
                int quantity = 0;
                if (Items != null)
                {
                    foreach (var entity in Items)
                    {
                        if (entity.Status == ItemsEntity.ItemsEntityStatus.CheckedOutForLoan)
                        {
                            quantity += entity.Quantity;
                        }
                    }
                }
                return quantity;
            }
        }

        public DateTime PublicationDate { get; set; }
        public string ISBN { get; set; }
        public string CoverImage { get; set; }
        public Genre Genre { get; set; }
        [JsonIgnore]
        public virtual ICollection<ItemsEntity> Items { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Loan> Loans { get; set; }
    }

}
