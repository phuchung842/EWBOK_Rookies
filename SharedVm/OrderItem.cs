using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class OrderItem
    {
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public decimal? ProductPrice { get; set; }
        public decimal? ProductPromotionPrice { get; set; }
    }
}
