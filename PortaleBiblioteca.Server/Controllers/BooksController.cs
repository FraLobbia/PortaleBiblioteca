﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;

namespace PortaleBiblioteca.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: api/Books/5
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

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, BookFormEdit formBook)
        {
            if (id != formBook.IdBook)
            {
                return BadRequest();
            }

            // get the book from the database
            Book book = _context.Books.Find(id);
            try
            {
                book.Author = formBook.Author;
                book.Title = formBook.Title;
                book.Description = formBook.Description;
                book.Genre = formBook.Genre;
                book.AvailableQuantity = formBook.availableQuantity;
                book.PublicationDate = formBook.PublicationDate;
                book.ISBN = formBook.ISBN;
                book.CoverImage = formBook.CoverImage;
                _context.Entry(book).State = EntityState.Modified;
                await _context.SaveChangesAsync();

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

            return NoContent();
        }

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("add")]
        public async Task<ActionResult<Book>> PostBook(BookFormCreate formBook)
        {

            Book book = new Book
            {
                Author = formBook.Author,
                Title = formBook.Title,
                Description = formBook.Description,
                Genre = formBook.Genre,
                AvailableQuantity = 0,
                LoanQuantity = 0,
                PublicationDate = formBook.PublicationDate,
                ISBN = formBook.ISBN,
                CoverImage = formBook.CoverImage
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.IdBook }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.IdBook == id);
        }
    }
}
