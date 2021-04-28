using SharedVm;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface IProductClient
    {
        Task<IList<ProductVm>> GetProducts();
        Task<IList<ProductVm>> GetProductsTake(int take);
        Task<ProductVm> GetProduct(int id);
        Task<PaginationVm> GetProductByFilter(int id, string type, int page, int pageSize);
        //Task<IList<ProductVm>> GetProductByFilter(int id, string type, int page, int pageSize);
    }
}