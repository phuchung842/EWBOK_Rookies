using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SharedVm
{
    public class OrderCreaterequest
    {
        public IList<OrderItem> OrderItems { get; set; }
        public string UserID { get; set; }
        [StringLength(100)]
        public string ShipName { get; set; }

        [StringLength(50)]
        public string ShipMobile { get; set; }

        [StringLength(100)]
        public string ShipAddress { get; set; }

        [StringLength(100)]
        public string ShipEmail { get; set; }
    }
}
