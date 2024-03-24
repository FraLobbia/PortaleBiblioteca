using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;
using PortaleBiblioteca.Server.Data.Models;

namespace PortaleBiblioteca.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelvesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShelvesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Shelves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shelf>>> GetShelfs()
        {
            return await _context.Shelfs.ToListAsync();
        }

        // GET: api/Shelves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shelf>> GetShelf(int id)
        {
            var shelf = await _context.Shelfs.FindAsync(id);

            if (shelf == null)
            {
                return NotFound();
            }

            return shelf;
        }

        // PUT: api/Shelves/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShelf(int id, Shelf shelf)
        {
            if (id != shelf.IdShelf)
            {
                return BadRequest();
            }

            _context.Entry(shelf).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShelfExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Shelves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Shelf>> PostShelf(Shelf shelf)
        {
            _context.Shelfs.Add(shelf);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShelf", new { id = shelf.IdShelf }, shelf);
        }

        // DELETE: api/Shelves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShelf(int id)
        {
            var shelf = await _context.Shelfs.FindAsync(id);
            if (shelf == null)
            {
                return NotFound();
            }

            _context.Shelfs.Remove(shelf);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShelfExists(int id)
        {
            return _context.Shelfs.Any(e => e.IdShelf == id);
        }
    }
}
