using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class Color
    {
        [Key]
        public long ID { get; set; }

        public int ProductID { get; set; }

        [StringLength(500)]
        public string Name { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(256)]
        public string CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        [StringLength(256)]
        public string ModifiedBy { get; set; }

        public bool? Status { get; set; }

        public Product Product { get; set; }
    }
}
