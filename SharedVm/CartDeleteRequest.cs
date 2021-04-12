using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class CartDeleteRequest
    {
        public string UserID { get; set; }

        public int ProductID { get; set; }
    }
}
