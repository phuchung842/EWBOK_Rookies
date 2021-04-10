using SharedVm;
using System.Net.Http;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public class CommentClient:ICommentClient
    {
        private readonly HttpClient _httpClient;
        public CommentClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<CommentVm> GetComment(int productid)
        {
            var response = await _httpClient.GetAsync($"api/Comments/{productid}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<CommentVm>();
        }
    }
}
