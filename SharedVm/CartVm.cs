using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class CartVm
    {
        public string UserID { get; set; }

        public int ProductID { get; set; }

        public int Quantity { get; set; }

        public string ProductName { get; set; }

        public string ProductImage { get; set; }

        public decimal? ProductPrice { get; set; }

        public decimal? ProductPromotionPrice { get; set; }

    }
}
