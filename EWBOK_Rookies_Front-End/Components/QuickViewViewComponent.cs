using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Components
{
    public class QuickViewViewComponent :ViewComponent
    {
        private readonly IProductClient _productClient;
        public QuickViewViewComponent(IProductClient productClient)
        {
            _productClient = productClient;
        }
        public async Task<IViewComponentResult> InvokeAsync(int productid)
        {
            var product = await _productClient.GetProduct(productid);
            return View(product);
        }
    }
}
