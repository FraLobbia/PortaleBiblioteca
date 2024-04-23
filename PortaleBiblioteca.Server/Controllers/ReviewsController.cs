using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;
using PortaleBiblioteca.Server.Data.Models;

namespace PortaleBiblioteca.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetReviews()
        {
            var reviews = await _context.Reviews
                .Include(r => r.Book)
                .Include(r => r.User)
                .Select(r => new ReviewDTO
                {
                    IdReview = r.IdReview,
                    IdBook = r.IdBook,
                    IdUser = r.IdUser,
                    ReviewTitle = r.ReviewTitle,
                    ReviewDate = r.ReviewDate,
                    ReviewBody = r.ReviewBody,
                    Book = new Book
                    {
                        IdBook = r.Book.IdBook,
                        Title = r.Book.Title,
                        Author = r.Book.Author,
                        Genre = r.Book.Genre,
                        CoverImage = r.Book.CoverImage

                    },
                    User = new User
                    {
                        IdUser = r.User.IdUser,
                        FirstName = r.User.FirstName,
                        UserImage = r.User.UserImage
                    }
                })
                .ToListAsync();

            return reviews;
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        //GET api/Reviews/Book/5
        [HttpGet("Book/{id}")]
        public async Task<ActionResult<IEnumerable<ReviewDTO>>> GetReviewsByBook(int id)
        {
            var reviews = await _context.Reviews
                .Include(r => r.Book)
                .Include(r => r.User)
                .Where(r => r.IdBook == id)
                .Select(r => new ReviewDTO
                {
                    IdReview = r.IdReview,
                    IdBook = r.IdBook,
                    IdUser = r.IdUser,
                    ReviewTitle = r.ReviewTitle,
                    ReviewDate = r.ReviewDate,
                    ReviewBody = r.ReviewBody,
                    Book = new Book
                    {
                        IdBook = r.Book.IdBook,
                        Title = r.Book.Title,
                        Author = r.Book.Author,
                        Genre = r.Book.Genre,
                        CoverImage = r.Book.CoverImage

                    },
                    User = new User
                    {
                        IdUser = r.User.IdUser,
                        FirstName = r.User.FirstName,
                        UserImage = r.User.UserImage
                    }
                })
                .ToListAsync();

            return reviews;
        }

        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.IdReview)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
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

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            review.ReviewDate = DateTime.Now;
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            var reviews = await _context.Reviews
                .Include(r => r.Book)
                .Include(r => r.User)
                .Select(r => new ReviewDTO
                {
                    IdReview = r.IdReview,
                    IdBook = r.IdBook,
                    IdUser = r.IdUser,
                    ReviewTitle = r.ReviewTitle,
                    ReviewDate = r.ReviewDate,
                    ReviewBody = r.ReviewBody,
                    Book = new Book
                    {
                        IdBook = r.Book.IdBook,
                        Title = r.Book.Title,
                        Author = r.Book.Author,
                        Genre = r.Book.Genre,
                        CoverImage = r.Book.CoverImage

                    },
                    User = new User
                    {
                        IdUser = r.User.IdUser,
                        FirstName = r.User.FirstName,
                        UserImage = r.User.UserImage
                    }
                })
                .ToListAsync();

            return CreatedAtAction("GetReview", new { id = review.IdReview }, reviews);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.IdReview == id);
        }
    }
}
