using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class Discount
    {
        public Discount()
        {
            DiscountDetails = new HashSet<DiscountDetail>();
        }
        [Key]
        public int ID { get; set; }

        [StringLength(500)]

        public string Name { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public bool? Status { get; set; }
        public ICollection<DiscountDetail> DiscountDetails { get; set; }
    }
}
