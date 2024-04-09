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
            _context.Items.Add(item);


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemsEntity", new { IdBook = item.IdBook }, item);
        }


        // GET: api/Warehouse/5
        [HttpGet("{IdBook}")]
        public async Task<IActionResult> GetItemsEntity(int IdBook)
        {
            //var itemsEntities = await _context.Items.Where(i => i.IdBook == IdBook).ToListAsync();
            // include the book and the shelf
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

        // GET: api/Warehouse/aisle
        [HttpGet("aisle")]
        public async Task<ActionResult<IEnumerable<Aisle>>> GetAisle()
        {
            return await _context.Aisles.ToListAsync();
        }

    }


}

