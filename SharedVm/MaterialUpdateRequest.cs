using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class MaterialUpdateRequest
    {
        [StringLength(200)]
        public string Name { get; set; }

        public bool? Status { get; set; }
    }
}
