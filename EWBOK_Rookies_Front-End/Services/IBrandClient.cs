using SharedVm;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface IBrandClient
    {
        Task<IList<BrandVm>> GetBrands();
        Task<BrandVm> GetBrand(short id);
    }
}