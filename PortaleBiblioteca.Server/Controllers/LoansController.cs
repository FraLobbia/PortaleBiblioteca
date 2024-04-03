using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;
using PortaleBiblioteca.Server.Data.Models;

namespace PortaleBiblioteca.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoansController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Loans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
        {
            return await _context.Loans.ToListAsync();
        }

        // GET: api/Loans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);

            if (loan == null)
            {
                return NotFound();
            }

            return loan;
        }

        // GET: api/Loans/user/5
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoansByUser(int id)
        {
            // check if the user exists
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Id utente non presente" });
            }


            return Ok(await _context.Loans
                    .Where(loan => loan.IdUser == id)
                    .Select(loan => new
                    {
                        loan.IdLoan,
                        loan.LoanDate,
                        loan.Returned,
                        loan.ReturnDate,
                        Book = new
                        {
                            loan.Book.IdBook,
                            loan.Book.Author,
                            loan.Book.Title,
                            loan.Book.Description,
                            loan.Book.IdGenre,
                            loan.Book.PublicationDate,
                            loan.Book.ISBN,
                            loan.Book.CoverImage,
                        }
                    })
                    .ToListAsync()

            );

        }

        // PUT: api/Loans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoan(int id, Loan loan)
        {
            if (id != loan.IdLoan)
            {
                return BadRequest();
            }

            _context.Entry(loan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanExists(id))
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

        // POST: api/Loans/add
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("add")]
        public async Task<ActionResult<Loan>> PostLoan(LoanFormCreate formLoan)
        {
            var alreadyLoaned = await _context.Loans
                .Where(loan => loan.IdBook == formLoan.IdBook && loan.IdUser == formLoan.IdUser && !loan.Returned)
                .FirstOrDefaultAsync();

            if (alreadyLoaned != null)
            {
                return BadRequest(new { message = "Libro già in prestito" });
            }

            Loan loan = new Loan
            {
                IdBook = formLoan.IdBook,
                IdUser = formLoan.IdUser,
                LoanDate = DateTime.Now,
                Returned = false,
                ReturnDate = null
            };


            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoan", new { id = loan.IdLoan }, loan);
        }

        // DELETE: api/Loans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null)
            {
                return NotFound();
            }

            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoanExists(int id)
        {
            return _context.Loans.Any(e => e.IdLoan == id);
        }
    }
}
