using System.ComponentModel.DataAnnotations;

namespace MamaaNoktasiApi.Entities
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string? Location { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}

