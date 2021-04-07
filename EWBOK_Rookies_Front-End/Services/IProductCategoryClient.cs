using SharedVm;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface IProductCategoryClient
    {
        Task<IList<ProductCategoryVm>> GetProductCategories();
        Task<ProductCategoryVm> GetProductCategory(short id);
    }
}