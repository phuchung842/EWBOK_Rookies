using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using SharedVm;

namespace EWBOK_Rookies_Front_End.Services
{
    public class ProductCategoryClient:IProductCategoryClient
    {
        private readonly HttpClient _httpClient;
        public ProductCategoryClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IList<ProductCategoryVm>> GetProductCategories()
        {
            var response = await _httpClient.GetAsync("api/ProductCategories");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<IList<ProductCategoryVm>>();
        }
    }
}
