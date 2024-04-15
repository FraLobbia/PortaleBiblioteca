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
            item.Book = book;
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
            var sourceShelf = await _context.Shelves
            .Include(s => s.Aisle)
            .Include(s => s.Items)
            .FirstOrDefaultAsync(s => s.IdShelf == data.MoveSourceShelfId);
            if (sourceShelf == null)
            {
                return NotFound(new { message = "Source shelf not found." });
            }

            var destinationShelf = await _context.Shelves
                .Include(s => s.Aisle)
                .FirstOrDefaultAsync(
                    s => s.ShelfHeight == data.Height
                    && s.IdAisle == data.IdAisle
                    && s.ShelfBay == data.ShelfBay);




            // foreach (var item in sourceShelf.Items)
            // {
            //     if (item.Quantity <= data.Quantity)
            //     {
            //         item.IdShelf = data.MoveDestinationShelfId;
            //         item.ChangeDate = DateTime.Now;
            //         await _context.SaveChangesAsync();
            //     }
            //     else
            //     {
            //         return BadRequest(new { message = "Quantity to move is greater than the quantity in the source shelf." });

            //     }
            // }



            return Ok(sourceShelf);


        }

    }
}
