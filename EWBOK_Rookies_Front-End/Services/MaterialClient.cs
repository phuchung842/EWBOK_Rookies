using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public class MaterialClient : IMaterialClient
    {
        private readonly HttpClient _httpClient;
        public MaterialClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IList<MaterialVm>> GetMaterials()
        {
            var response = await _httpClient.GetAsync("api/Materials");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<IList<MaterialVm>>();
        }
    }
}
