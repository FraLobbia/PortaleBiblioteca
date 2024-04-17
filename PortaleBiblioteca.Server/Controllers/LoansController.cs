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
                    .Include(loan => loan.Item)
                    .ThenInclude(item => item.Book)
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
                            loan.Item.Book.IdBook,
                            loan.Item.Book.Author,
                            loan.Item.Book.Title,
                            loan.Item.Book.Description,
                            loan.Item.Book.IdGenre,
                            loan.Item.Book.PublicationDate,
                            loan.Item.Book.ISBN,
                            loan.Item.Book.CoverImage,
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
                    .Where(loan => loan.Item.IdBook == id
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
                            loan.Item.Book.IdBook,
                            loan.Item.Book.Author,
                            loan.Item.Book.Title,
                            loan.Item.Book.Description,
                            loan.Item.Book.IdGenre,
                            loan.Item.Book.PublicationDate,
                            loan.Item.Book.ISBN,
                            loan.Item.Book.CoverImage,
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

            User user = GetUserByToken();
            if (user == null)
            {
                return Unauthorized(new { message = "Utente non autorizzato" });
            }
            if (user.IdUser != formLoan.IdUser)
            {
                return Unauthorized(new { message = "Non autorizzato. Per aggiungere un prestito per un altro utente è necessario avere ruoli 'librarian' o 'admin'" });
            }

            // check if the user has already loaned the book
            var alreadyLoaned = await _context.Loans
                .Include(loan => loan.Item)
                .Where(loan =>
                loan.Item.IdBook == formLoan.IdBook &&
                loan.IdUser == formLoan.IdUser &&
                !loan.Returned)
                .FirstOrDefaultAsync();

            // if already loaned, return an error
            if (alreadyLoaned != null)
            {
                return BadRequest(new { message = "Hai già preso in prestito questo libro!" });
            }

            try // handle moving the book from "Available" to "ReservedToBePicked"
            {
                ItemsEntity item;
                try // get an item with status "Available"
                {
                    item = await _context.Items
                        .Where(item =>
                            item.IdBook == formLoan.IdBook &&
                            item.Status == ItemsEntity.ItemsEntityStatus.Available)
                        .FirstOrDefaultAsync();
                }
                catch
                {
                    return BadRequest(new { message = "Libro non disponibile" });
                }

                // save the shelf id in order to transpose 
                // to item with status "ReservedToBePicked"
                int shelfIdToTranspose = item.IdShelf;

                // decrement the quantity of the book in order to 
                // add again the same book with status "ReservedToBePicked"
                switch (true)
                {
                    case var _ when item.Quantity > 1:
                        item.Quantity--;
                        _context.Entry(item).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                        break;
                    case var _ when item.Quantity == 1:
                        _context.Items.Remove(item);
                        await _context.SaveChangesAsync();
                        break;
                }

                ItemsEntity newItem = new ItemsEntity
                {
                    IdBook = formLoan.IdBook,
                    ChangeDate = DateTime.Now,
                    Quantity = 1,
                    Status = ItemsEntity.ItemsEntityStatus.ReservedToBePicked,
                    IdShelf = shelfIdToTranspose,
                    Loan = new Loan
                    {
                        IdUser = formLoan.IdUser,
                        LoanDate = DateTime.Now,
                        Returned = false,
                        ReturnDate = null
                    }
                };

                // // create a new loan
                // Loan newLoan = new Loan
                // {
                //     IdUser = formLoan.IdUser,
                //     LoanDate = DateTime.Now,
                //     Returned = false,
                //     ReturnDate = null

                // };

                _context.Items.Add(newItem);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

            return StatusCode(201, await _context.Loans
                    .Include(loan => loan.Item)
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
                            loan.Item.Book.IdBook,
                            loan.Item.Book.Author,
                            loan.Item.Book.Title,
                            loan.Item.Book.Description,
                            loan.Item.Book.IdGenre,
                            loan.Item.Book.PublicationDate,
                            loan.Item.Book.ISBN,
                            loan.Item.Book.CoverImage,
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
