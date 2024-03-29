using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortaleBiblioteca.Server.Data;
using PortaleBiblioteca.Server.Data.Models;
using PortaleBiblioteca.Server.Data.ModelsForms;


namespace PortaleBiblioteca.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;

        public UsersController(ApplicationDbContext context, IConfiguration configuration)
        {
            _db = context;
            _configuration = configuration;
        }


        // GET: /Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }

        // GET: /Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _db.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: /Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserEditForm formUser)
        {
            if (id != formUser.IdUser)
            {
                return BadRequest();
            }

            User userToUpdate = await _db.Users.FindAsync(id);

            userToUpdate.FirstName = formUser.FirstName;
            userToUpdate.LastName = formUser.LastName;
            userToUpdate.Email = formUser.Email;
            userToUpdate.UserImage = formUser.UserImage;


            _db.Entry(userToUpdate).State = EntityState.Modified;

            try
            {

                await _db.SaveChangesAsync();
                var tokenString = TokenHandler.BuildToken(userToUpdate, _configuration);
                
                return Ok(new
                {
                    token = tokenString,
                    user = userToUpdate
                }
                        );
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

        }

        // POST: /Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754


        [HttpPost("signup")]
        public async Task<ActionResult<User>> PostUser(SignUpFormModel userForm)
        {
            User user = new User
            {
                FirstName = userForm.FirstName,
                LastName = userForm.LastName,
                Email = userForm.Email,
                Password = userForm.Password,
                Role = "user",
                UserImage = "https://unsplash.it/640/425?random"
            };

            try
            {
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.IdUser))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.IdUser }, user);
        }

        // DELETE: /Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _db.Users.Any(e => e.IdUser == id);
        }
    }
}
