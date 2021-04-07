using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public class ProductClient : IProductClient
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly HttpClient _httpClient;

        public ProductClient(IHttpClientFactory httpClientFactory,HttpClient httpClient)
        {
            _httpClientFactory = httpClientFactory;
            _httpClient = httpClient;
        }

        public async Task<IList<ProductVm>> GetProducts()
        {
            var response = await _httpClient.GetAsync("api/Products");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<IList<ProductVm>>();
        }
        public async Task<ProductVm> GetProduct(int id)
        {
            var reponse = await _httpClient.GetAsync("api/Products/" + id.ToString());
            reponse.EnsureSuccessStatusCode();
            return await reponse.Content.ReadAsAsync<ProductVm>();
        }
    }
}
