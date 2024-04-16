using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;
using PortaleBiblioteca.Server.Data.Models;
using System.IdentityModel.Tokens.Jwt;

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
                        loan.IdUser,
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

        // GET: api/Loans/book/5
        [HttpGet("book/{id}")]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoansByBook(int id)
        {
            // check if the book exists
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound(new { message = "Id libro non presente" });
            }

            return Ok(await _context.Loans
                    .Include(loan => loan.User)
                    .Where(loan => loan.IdBook == id
                        && !loan.Returned)
                    .Select(loan => new
                    {
                        loan.IdLoan,
                        loan.LoanDate,
                        loan.Returned,
                        loan.ReturnDate,
                        loan.IdUser,
                        User = new
                        {
                            loan.User.IdUser,
                            loan.User.FirstName,
                            loan.User.LastName,
                            loan.User.UserImage
                        }
                    })
                    .ToListAsync()
            );
        }

        // PUT: api/Loans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("return/{id}")]
        public async Task<IActionResult> PutLoan(int id)
        {
            User user = GetUserByToken();
            if (user == null)
            {
                return Unauthorized(new { message = "Utente non autorizzato" });
            }
            try
            {
                var loan = await _context.Loans.FindAsync(id);
                if (loan.IdUser != user.IdUser)
                {
                    if (user.Role != "admin" && user.Role != "librarian")
                    {
                        return Unauthorized(new { message = "Non autorizzato. Per modificare un prestito di un altro utente è necessario avere ruoli 'librarian' o 'admin'" });
                    }
                }

                loan.Returned = true;
                loan.ReturnDate = DateTime.Now;
                _context.Entry(loan).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoanExists(id))
                {
                    return NotFound(new { message = "Prestito non trovato" });
                }
                else
                {
                    throw;
                }
            }

            return Ok(await _context.Loans
                    .Where(loan => loan.IdUser == user.IdUser)
                    .Select(loan => new
                    {
                        loan.IdLoan,
                        loan.LoanDate,
                        loan.Returned,
                        loan.ReturnDate,
                        loan.IdUser,
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

        // POST: api/Loans/add
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("add")]
        public async Task<ActionResult<Loan>> PostLoan(LoanCreateDTO formLoan)
        {
            var alreadyLoaned = await _context.Loans
                .Where(loan => loan.IdBook == formLoan.IdBook && loan.IdUser == formLoan.IdUser && !loan.Returned)
                .FirstOrDefaultAsync();

            if (alreadyLoaned != null)
            {
                return BadRequest(new { message = "Hai già preso in prestito questo libro!" });
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

            return CreatedAtAction("GetLoansByUser", new { id = formLoan.IdUser }, await _context.Loans
                    .Where(loan => loan.IdUser == formLoan.IdUser)
                    .Select(loan => new
                    {
                        loan.IdLoan,
                        loan.LoanDate,
                        loan.Returned,
                        loan.ReturnDate,
                        loan.IdUser,
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

        private User GetUserByToken()
        {
            try
            {
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
                var idUser = jsonToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Jti).Value;
                return _context.Users.Find(int.Parse(idUser));
            }
            catch
            {
                return null;
            }
        }
    }
}
