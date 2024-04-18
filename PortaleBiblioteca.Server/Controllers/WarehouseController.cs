using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;
using PortaleBiblioteca.Server.Data.Models;
namespace PortaleBiblioteca.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRole.FromLibrarianToUp)]
    public class WarehouseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WarehouseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Warehouse
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemsEntity>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        // POST: api/Warehouse/addToWarehouse
        [Authorize(Roles = UserRole.FromLibrarianToUp)]
        [HttpPost("receive")]
        public async Task<IActionResult> addToWarehouse(AddToWarehouseDTO data)
        {
            var book = await _context.Books.FindAsync(data.IdBook);

            if (book == null)
            {
                return NotFound();
            }


            ItemsEntity item = new ItemsEntity();
            item.IdBook = book.IdBook;
            item.IdLoan = null;
            item.Status = ItemsEntity.ItemsEntityStatus.AtWarehouse;
            item.Quantity = data.Quantity;
            item.IdShelf = 5003; // this is the shelf for the warehouse
            item.ChangeDate = DateTime.Now;
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            var itemsList = _context.Items
            .Include(i => i.Shelf.Aisle)
            .Where(i => i.IdBook == data.IdBook)
            .Select(i => new
            {
                i.IdItemsEntity,
                i.IdLoan,
                i.Quantity,
                i.ChangeDate,
                Status = i.Status.ToString(),
                Shelf = new
                {
                    i.Shelf.IdShelf,
                    ShelfHeight = i.Shelf.ShelfHeight.ToString(),
                    i.Shelf.ShelfBay,
                    i.Shelf.ShelfName,
                    ShelfType = i.Shelf.ShelfType.ToString(),
                },
                Book = new BookDTO
                {
                    IdBook = i.Book.IdBook,
                    IdAuthor = i.Book.IdAuthor,
                    Title = i.Book.Title,
                    Description = i.Book.Description,
                    IdGenre = i.Book.IdGenre,
                    PublicationDate = i.Book.PublicationDate,
                    ISBN = i.Book.ISBN,
                    CoverImage = i.Book.CoverImage
                }
            })
            .ToList();
            return StatusCode(201, itemsList);
        }

        // GET: api/Warehouse/5/bays
        [HttpGet("{IdAisle}/bays")]
        public async Task<IActionResult> GetBays(int IdAisle)
        {
            var bays = await _context.Shelves
        .Where(s => s.IdAisle == IdAisle)
        .Select(s => s.ShelfBay)
        .Distinct()
        .ToArrayAsync();

            if (bays == null || bays.Length == 0)
            {
                return NotFound();
            }
            return Ok(bays);
        }

        // GET: api/Warehouse/5/5/heights
        [HttpGet("{IdAisle}/{ShelfBay}/heights")]
        public async Task<IActionResult> GetHeights(int IdAisle, int ShelfBay)
        {
            var heights = await _context.Shelves
                .Where(s => s.IdAisle == IdAisle)
                .Where(s => s.ShelfBay == ShelfBay)
                .Select(s => s.ShelfHeight.ToString())
                .Distinct()
                .ToArrayAsync();

            if (heights == null || heights.Length == 0)
            {
                return NotFound(new { message = "No shelves found for the given aisle and bay." });
            }
            return Ok(heights);
        }


        // GET: api/Warehouse/aisle
        [HttpGet("aisle")]
        public async Task<ActionResult<IEnumerable<Aisle>>> GetAisle()
        {
            return await _context.Aisles.ToListAsync();
        }

        // get all itemsEntity of a book
        // GET: api/Warehouse/book/5
        [HttpGet("book/{IdBook}")]
        public async Task<IActionResult> GetItemsEntityByBook(int IdBook)
        {
            var itemsEntities = await _context.Items
                .Include(i => i.Shelf.Aisle)
                .Where(i => i.IdBook == IdBook)
                .Select(i => new
                {
                    i.IdItemsEntity,
                    i.IdLoan,
                    i.Quantity,
                    Status = i.Status.ToString(),
                    Shelf = new
                    {
                        i.Shelf.IdShelf,
                        ShelfHeight = i.Shelf.ShelfHeight.ToString(),
                        i.Shelf.ShelfBay,
                        i.Shelf.ShelfName,
                        ShelfType = i.Shelf.ShelfType.ToString(),
                    },
                    Book = new
                    {
                        i.Book.IdBook,
                        i.Book.Title,
                        i.Book.Author,
                        i.Book.ISBN,
                        i.Book.Genre,
                        i.Book.Description,
                        i.Book.CoverImage
                    }
                })
                .ToListAsync();

            if (itemsEntities == null)
            {
                return NotFound();
            }

            return Ok(itemsEntities);
        }

        // ottiene la quantità totale di un libro nello scaffale
        [HttpGet("{IdShelf}/book/{IdBook}")]
        public async Task<IActionResult> GetItemsEntityByShelfAndBook(int IdShelf, int IdBook)
        {
            var itemsEntities = await _context.Items
                .Include(i => i.Shelf.Aisle)
                .Where(i => i.IdBook == IdBook)
                .Where(i => i.IdShelf == IdShelf)
                .Select(i => new
                {
                    i.IdItemsEntity,
                    i.IdLoan,
                    i.Quantity,
                    Status = i.Status.ToString(),
                    Shelf = new
                    {
                        i.Shelf.IdShelf,
                        ShelfHeight = i.Shelf.ShelfHeight.ToString(),
                        i.Shelf.ShelfBay,
                        i.Shelf.ShelfName,
                        ShelfType = i.Shelf.ShelfType.ToString(),
                    },
                    Book = new
                    {
                        i.Book.IdBook,
                        i.Book.Title,
                        i.Book.Author,
                        i.Book.ISBN,
                        i.Book.Genre,
                        i.Book.Description,
                        i.Book.CoverImage
                    }
                })
                .ToListAsync();

            if (itemsEntities == null)
            {
                return NotFound();
            }

            var quantity = itemsEntities.Sum(i => i.Quantity);

            return Ok(quantity);
        }

        // POST: api/Warehouse/move
        [HttpPost("move")]
        public async Task<IActionResult> MoveItem(MoveDTO data)
        {
            // definisco scaffale di partenza
            var sourceShelf = await _context.Shelves
            .Include(s => s.Aisle)
            .Include(s => s.Items)
            .FirstOrDefaultAsync(s => s.IdShelf == data.MoveSourceShelfId);
            if (sourceShelf == null)
            {
                return NotFound(new { message = "Scaffale di partenza non trovato." });
            }
            // definisco scaffale di destinazione
            var destinationShelf = await _context.Shelves
                .Include(s => s.Aisle)
                .FirstOrDefaultAsync(
                    s => s.ShelfHeight == data.Height
                    && s.IdAisle == data.IdAisle
                    && s.ShelfBay == data.ShelfBay);
            if (destinationShelf == null)
            {
                return NotFound(new { message = "Errore nel reperire lo scaffale di destinazione" });
            }

            int IdLoanToSave = 0; // intialize the idLoan 

            // handle the quantity of the items from the source shelf
            // each item is cycled and handled based on the quantity available in the same
            int quantityToMove = data.Quantity;
            while (quantityToMove > 0)
            {
                var item = sourceShelf.Items
                .Where(i => i.IdBook == data.IdBook)
                .FirstOrDefault();
                if (item == null)
                {
                    return BadRequest(new { message = "Non ci sono libri nello scaffale" });
                }

                // save the idLoan of the item to avoid losing it if the item is removed
                if (item.IdLoan != null)
                {
                    IdLoanToSave = item.IdLoan.Value;
                }


                if (item.Quantity <= quantityToMove)
                {
                    // remove the item from the source shelf 
                    quantityToMove -= item.Quantity;
                    _context.Items.Remove(item);
                    _context.SaveChanges();
                }
                else if (item.Quantity > quantityToMove)
                {
                    // update the quantity of the item in the source shelf
                    item.Quantity -= quantityToMove;
                    _context.Items.Update(item);
                    _context.SaveChanges();
                    quantityToMove = 0;
                }
                else
                {
                    return BadRequest(new { message = "Errore nel reperire la quantità dell'item" });
                }
            }

            // gestisco lo status dell'item in base al tipo di scaffale di destinazione
            ItemsEntity.ItemsEntityStatus typeStatus;
            if (destinationShelf.ShelfType == Shelf.Type.Warehouse)
            {
                typeStatus = ItemsEntity.ItemsEntityStatus.AtWarehouse;
            }
            else if (destinationShelf.ShelfType == Shelf.Type.LibrarianDesk)
            {
                typeStatus = ItemsEntity.ItemsEntityStatus.AtLibrarianDesk;
            }
            else if (destinationShelf.ShelfType == Shelf.Type.Physical)
            {
                typeStatus = ItemsEntity.ItemsEntityStatus.Available;
            }
            else if (destinationShelf.ShelfType == Shelf.Type.Virtual)
            {
                typeStatus = ItemsEntity.ItemsEntityStatus.CheckedOutForLoan;
            }
            else
            {
                return BadRequest(new { message = "Errore nel reperire lo status dello scaffale di destinazione" });
            }

            ItemsEntity newItemEntity = new ItemsEntity();

            // if the item was previously associated with a loan, the saved idLoan is set in the new item 
            if (IdLoanToSave != 0)
            {
                newItemEntity.IdLoan = IdLoanToSave;
            }

            newItemEntity.IdBook = data.IdBook;
            newItemEntity.Quantity = data.Quantity;
            newItemEntity.Shelf = destinationShelf;
            newItemEntity.ChangeDate = DateTime.Now;
            newItemEntity.Status = typeStatus;

            // save the new item in the database
            _context.Items.Add(newItemEntity);
            await _context.SaveChangesAsync();

            return StatusCode(201, newItemEntity.IdItemsEntity);
        }

        // GET: api/Warehouse/reservedToBePicked
        [HttpGet("reservedToBePicked")]
        public async Task<IActionResult> GetReservedToBePicked()
        {
            var itemsEntities = await _context.Items
                .Include(i => i.Shelf.Aisle)
                .Include(i => i.Loan.User)
                .Where(i =>
                    i.Status == ItemsEntity.ItemsEntityStatus.ReservedToBePicked)
                .Select(i => new
                {
                    i.IdItemsEntity,
                    i.IdLoan,
                    i.Quantity,
                    Status = i.Status.ToString(),
                    Shelf = new
                    {
                        i.Shelf.IdShelf,
                        ShelfHeight = i.Shelf.ShelfHeight.ToString(),
                        i.Shelf.ShelfBay,
                        i.Shelf.ShelfName,
                        ShelfType = i.Shelf.ShelfType.ToString(),
                    },
                    Book = new
                    {
                        i.Book.IdBook,
                        i.Book.Title,
                        i.Book.Author,
                        i.Book.ISBN,
                        i.Book.Genre,
                        i.Book.Description,
                        i.Book.CoverImage
                    },
                    User = new
                    {
                        i.Loan.User.IdUser,
                        i.Loan.User.FirstName,
                        i.Loan.User.LastName,
                        i.Loan.User.UserImage
                    }

                })
                .ToListAsync();

            if (itemsEntities == null)
            {
                return NotFound();
            }

            return Ok(itemsEntities);
        }

        // POST: api/Warehouse/moveToLibrarianDesk
        [HttpPost("moveToLibrarianDesk/{IdItemsEntityToPick}")]
        public async Task<IActionResult> MoveItemToLibrarianDesk(int IdItemsEntityToPick)
        {
            // definisco scaffale di destinazione
            var destinationShelf = await _context.Shelves
                .Include(s => s.Aisle)
                .FirstOrDefaultAsync(
                    s => s.IdShelf == 5001); // this is the shelf for the librarian desk
            if (destinationShelf == null)
            {
                return NotFound(new { message = "Errore nel reperire lo scaffale di destinazione" });
            }

            var item = await _context.Items
                .Include(i => i.Shelf.Aisle)
                .FirstOrDefaultAsync(i => i.IdItemsEntity == IdItemsEntityToPick);
            if (item == null)
            {
                return NotFound(new { message = "Errore nel reperire l'item" });
            }

            // update the status of the item
            item.Status = ItemsEntity.ItemsEntityStatus.AtLibrarianDesk;
            item.Shelf = destinationShelf;
            item.ChangeDate = DateTime.Now;

            // save the new item in the database
            _context.Items.Update(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        // GET: api/Warehouse/LibrarianDesk
        [HttpGet("LibrarianDesk")]
        public async Task<IActionResult> GetLibrarianDesk()
        {
            var itemsEntities = await _context.Items
                .Include(i => i.Shelf.Aisle)
                .Include(i => i.Loan.User)
                .Where(i =>
                    i.Status == ItemsEntity.ItemsEntityStatus.AtLibrarianDesk)
                .Select(i => new
                {
                    i.IdItemsEntity,
                    i.IdLoan,
                    i.Quantity,
                    Status = i.Status.ToString(),
                    Shelf = new
                    {
                        i.Shelf.IdShelf,
                        ShelfHeight = i.Shelf.ShelfHeight.ToString(),
                        i.Shelf.ShelfBay,
                        i.Shelf.ShelfName,
                        ShelfType = i.Shelf.ShelfType.ToString(),
                    },
                    Book = new
                    {
                        i.Book.IdBook,
                        i.Book.Title,
                        i.Book.Author,
                        i.Book.ISBN,
                        i.Book.Genre,
                        i.Book.Description,
                        i.Book.CoverImage
                    },
                    User = new
                    {
                        i.Loan.User.IdUser,
                        i.Loan.User.FirstName,
                        i.Loan.User.LastName,
                        i.Loan.User.UserImage
                    }

                })
                .ToListAsync();

            if (itemsEntities == null)
            {
                return NotFound();
            }

            return Ok(itemsEntities);
        }


        // POST: api/Warehouse/moveToVirtual
        [HttpPost("moveToVirtual/{IdItemsEntityToVirtual}")]
        public async Task<IActionResult> MoveItemToVirtual(int IdItemsEntityToVirtual)
        {
            // definisco scaffale di destinazione
            var destinationShelf = await _context.Shelves
                .Include(s => s.Aisle)
                .FirstOrDefaultAsync(
                    s => s.IdShelf == 5002); // this is the shelf for the virtual items
            if (destinationShelf == null)
            {
                return NotFound(new { message = "Errore nel reperire lo scaffale di destinazione" });
            }

            var item = await _context.Items
                .Include(i => i.Shelf.Aisle)
                .Where(i => i.Status == ItemsEntity.ItemsEntityStatus.AtLibrarianDesk)
                .FirstOrDefaultAsync(i => i.IdItemsEntity == IdItemsEntityToVirtual);
            if (item == null)
            {
                return NotFound(new { message = "Errore nel reperire l'item dal desk" });
            }

            // update the status of the item
            item.Status = ItemsEntity.ItemsEntityStatus.CheckedOutForLoan;
            item.Shelf = destinationShelf;
            item.ChangeDate = DateTime.Now;

            // save the new item in the database
            _context.Items.Update(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

    }
}
