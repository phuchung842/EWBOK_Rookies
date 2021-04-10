using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class RatingUpdateRequest
    {
        public string UserID { get; set; }

        public int ProductID { get; set; }

        public short Star { get; set; }

        public int? Status { get; set; }
    }
}
