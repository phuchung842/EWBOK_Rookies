using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Models
{
    public class Size
    {
        public Size()
        {
            ProductSizes = new HashSet<ProductSize>();
        }
        [Key]
        public short ID { get; set; }

        [StringLength(256)]
        public string Name { get; set; }

        public bool? Status { get; set; }

        public ICollection<ProductSize> ProductSizes { get; set; }
    }
}
