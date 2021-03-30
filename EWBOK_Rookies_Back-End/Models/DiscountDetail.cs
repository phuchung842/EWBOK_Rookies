using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class DiscountDetail
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductID { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int DiscountID { get; set; }

        public decimal? PctDisount { get; set; }

        public Discount Discount { get; set; }

        public Product Product { get; set; }
    }
}
