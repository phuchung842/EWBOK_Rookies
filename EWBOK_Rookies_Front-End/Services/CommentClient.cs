using Newtonsoft.Json;
using SharedVm;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public class CommentClient : ICommentClient
    {
        private readonly HttpClient _httpClient;
        public CommentClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IList<CommentVm>> GetCommentsByProduct(int productid)
        {
            var response = await _httpClient.GetAsync($"api/Comments/{productid}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<IList<CommentVm>>();
        }
        public async Task<CommentVm> PostComment(CommentCreateRequest commentCreateRequest)
        {
            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(commentCreateRequest), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("api/Comments", httpContent);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsAsync<CommentVm>();
        }
    }
}
