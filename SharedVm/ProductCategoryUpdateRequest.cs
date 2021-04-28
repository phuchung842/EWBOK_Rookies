using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class ProductCategoryUpdateRequest
    {
        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(250)]
        public string MetaTitle { get; set; }

        public int? DisplayOrder { get; set; }

        public bool Status { get; set; }

        public bool? ShowOnHome { get; set; }
    }
}
