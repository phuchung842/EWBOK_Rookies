using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class Comment
    {
        [Key]
        public long ID { get; set; }
        public int ProductID { get; set; }

        [StringLength(450)]
        public string UserID { get; set; }

        public string Content { get; set; }

        public string Image { get; set; }

        public bool? Status { get; set; }
        public Product Product { get; set; }
        public User User { get; set; }
    }
}
