using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class PaginationVm
    {
        public IList<ProductVm> productVms { get; set; }
        public int totalRecord { get; set; }
    }
}
