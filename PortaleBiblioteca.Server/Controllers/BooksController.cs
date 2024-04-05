using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;

namespace PortaleBiblioteca.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /Books
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: /Books/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: /Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = UserRole.FromLibrarianToUp)]
        public async Task<IActionResult> PutBook(int id, BookEditDTO formBook)
        {
            if (id != formBook.IdBook)
            {
                return BadRequest();
            }

            // get the book from the database
            Book book = _context.Books.Find(id);

            if (book == null)
            {
                return NotFound(new { message = "Sembra che il libro non sia stato trovato!" });
            }

            try
            {
                book.Author = formBook.Author;
                book.Title = formBook.Title;
                book.Description = formBook.Description;
                book.IdGenre = formBook.IdGenre;

                book.PublicationDate = formBook.PublicationDate;
                book.ISBN = formBook.ISBN;
                book.CoverImage = formBook.CoverImage;
                _context.Entry(book).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(await _context.Books.ToListAsync());

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw new Exception("Error updating the book");
                }
            }
        }

        // POST: /Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = UserRole.FromLibrarianToUp)]
        [HttpPost("add")]
        public async Task<ActionResult<Book>> PostBook(BookCreateDTO formBook)
        {

            Book book = new Book
            {
                Author = formBook.Author,
                Title = formBook.Title,
                Description = formBook.Description,
                IdGenre = Convert.ToInt32(formBook.IdGenre),
                PublicationDate = formBook.PublicationDate,
                ISBN = formBook.ISBN,
                CoverImage = formBook.CoverImage
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            // return the updated booklist with code 201 (created)
            return CreatedAtAction("GetBooks", new { id = book.IdBook }, await _context.Books.ToListAsync());

        }

        // DELETE: /Books/5
        [Authorize(Roles = UserRole.FromLibrarianToUp)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound(new { message = "Sembra che il libro non sia stato trovato oppure sia stato già cancellato!" });
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            // ritorna la lista dei libri aggiornata
            return Ok(await _context.Books.ToListAsync());
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.IdBook == id);
        }
    }
}
