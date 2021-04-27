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
    public class OrderClient : IOrderClient
    {
        private readonly HttpClient _httpClient;
        public OrderClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<OrderCreaterequest> PostOrder(OrderCreaterequest orderCreaterequest)
        {
            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(orderCreaterequest), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("api/Orders", httpContent);

            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<OrderCreaterequest>();
        }
    }
}
