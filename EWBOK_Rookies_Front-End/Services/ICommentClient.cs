using SharedVm;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface ICommentClient
    {
        Task<CommentVm> GetComment(int productid);
    }
}