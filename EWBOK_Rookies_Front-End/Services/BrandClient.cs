using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public class BrandClient:IBrandClient
    {
        private readonly HttpClient _httpClient;
        public BrandClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IList<BrandVm>> GetBrands()
        {
            var response = await _httpClient.GetAsync("api/Brands");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<IList<BrandVm>>();
        }
    }
}
