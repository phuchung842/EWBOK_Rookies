using SharedVm;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface IOrderClient
    {
        Task<OrderCreaterequest> PostOrder(OrderCreaterequest orderCreaterequest);
    }
}