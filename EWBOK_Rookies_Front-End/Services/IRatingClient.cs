using SharedVm;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface IRatingClient
    {
        Task<RatingVm> GetRating(string userid, int productid);
        Task<RatingCreateRequest> CreateRating(RatingCreateRequest ratingCreateRequest);
        Task<RatingUpdateRequest> UpdateRating(RatingUpdateRequest ratingUpdateRequest);
    }
}