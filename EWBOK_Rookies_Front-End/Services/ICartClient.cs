using SharedVm;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface ICartClient
    {
        Task<IList<CartVm>> GetCarts(string userid);
        Task<CartRequest> AddCart(CartRequest cartRequest);
    }
}