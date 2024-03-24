using System.ComponentModel.DataAnnotations;

namespace PortaleBiblioteca.Server.Data.Models
{
    public class Event
    {
        [Key]
        public int IdEvent { get; set; }
        [Required]
        public string EventName { get; set; }
        [Required]
        public DateTime EventDate { get; set; }
        [Required]
        public string EventDescription { get; set; }

        public string EventImage { get; set; }
        [Required]
        public string EventType { get; set; }
        public double EventPrice { get; set; }


        public virtual ICollection<Attendance> Participants { get; set; }
    }
}
