using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }
        [Key]
        public long ID { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(450)]
        public string CustomerID { get; set; }

        public short? PctDiscount { get; set; }

        public decimal? Total { get; set; }

        public decimal? TotalDiscount { get; set; }

        public decimal? TotalVAT { get; set; }

        [StringLength(100)]
        public string ShipName { get; set; }

        [StringLength(50)]
        public string ShipMobile { get; set; }

        [StringLength(100)]
        public string ShipAddress { get; set; }

        [StringLength(100)]
        public string ShipEmail { get; set; }

        public int? Status { get; set; }

        public bool? IsPay { get; set; }

        public User User { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

