using SharedVm;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface ICommentClient
    {
        Task<IList<CommentVm>> GetCommentsByProduct(int productid);
        Task<CommentVm> PostComment(CommentCreateRequest commentCreateRequest);
    }
}