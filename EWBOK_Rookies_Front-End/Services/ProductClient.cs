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
        public async Task<IList<ProductVm>> GetProductsTake(int take)
        {
            var response = await _httpClient.GetAsync($"api/Products/take/{take}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<IList<ProductVm>>();
        }
        public async Task<ProductVm> GetProduct(int id)
        {
            var reponse = await _httpClient.GetAsync("api/Products/" + id.ToString());
            reponse.EnsureSuccessStatusCode();
            return await reponse.Content.ReadAsAsync<ProductVm>();
        }

        public async Task<PaginationVm> GetProductByFilter(int id, string type, int page, int pageSize)
        {
            var response = await _httpClient.GetAsync($"api/Products/{id.ToString()}/{page.ToString()}/{pageSize.ToString()}/{type}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<PaginationVm>();
        }
    }
}
