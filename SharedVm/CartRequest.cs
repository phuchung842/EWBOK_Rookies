using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class CartRequest
    {
        public string UserID { get; set; }

        public int ProductID { get; set; }

        public int Quantity { get; set; }
    }
}
