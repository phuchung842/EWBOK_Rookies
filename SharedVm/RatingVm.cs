using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class RatingVm
    {
        public string UserID { get; set; }

        public string Username { get; set; }

        public int ProductID { get; set; }

        public string ProductName { get; set; }

        public short Star { get; set; }

        public int? Status { get; set; }
    }
}
