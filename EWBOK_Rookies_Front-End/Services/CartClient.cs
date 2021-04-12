using Newtonsoft.Json;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public class CartClient : ICartClient
    {
        private readonly HttpClient _httpClient;
        public CartClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IList<CartVm>> GetCarts(string userid)
        {
            var response = await _httpClient.GetAsync($"api/Carts/{userid}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<IList<CartVm>>();
        }
        public async Task<CartRequest> AddCart(CartRequest cartRequest)
        {
            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(cartRequest), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("api/Carts", httpContent);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<CartRequest>();
        }
    }
}
