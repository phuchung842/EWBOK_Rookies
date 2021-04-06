using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;

namespace EWBOK_Rookies_Front_End.Components
{
    public class ProductCategoryMenuViewComponent : ViewComponent
    {
        private readonly IProductCategoryClient _productCategoryClient;
        public ProductCategoryMenuViewComponent(IProductCategoryClient productCategoryClient)
        {
            _productCategoryClient = productCategoryClient;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var ProductCategory = await _productCategoryClient.GetProductCategories();
            return View(ProductCategory);
        }
    }
}
