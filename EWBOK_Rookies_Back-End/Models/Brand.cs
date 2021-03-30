using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class Brand
    {
        public Brand()
        {
            Products = new HashSet<Product>();
        }
        [Key]
        public short ID { get; set; }

        [StringLength(200)]
        public string Name { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(256)]
        public string CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        [StringLength(256)]
        public string ModifiedBy { get; set; }

        public bool? Status { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
