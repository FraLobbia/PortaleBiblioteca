using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class Attendance
    {
        [Key]
        public int IdAttendance { get; set; }
        [Required]
        [ForeignKey("Event")]
        public int IdEvent { get; set; }
        [Required]
        [ForeignKey("User")]
        public int IdUser { get; set; }

        public Event Event { get; set; }
        public User User { get; set; }


    }
}
