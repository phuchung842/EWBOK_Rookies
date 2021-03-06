using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class User : IdentityUser
    {
        public User() : base()
        {
            Comments = new HashSet<Comment>();
            Wishes = new HashSet<Wish>();
            Ratings = new HashSet<Rating>();
            Carts = new HashSet<Cart>();
        }

        public User(string userName) : base(userName)
        {
        }

        [PersonalData]
        [StringLength(100)]
        public string FullName { get; set; }

        public string Image { get; set; }

        public ICollection<Rating> Ratings { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Wish> Wishes { get; set; }
        public ICollection<Cart> Carts { get; set; }
    }
}
