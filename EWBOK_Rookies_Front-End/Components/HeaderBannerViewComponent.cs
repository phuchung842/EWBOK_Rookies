using Common;
using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Components
{
    public class HeaderBannerViewComponent : ViewComponent
    {
        private readonly IBrandClient _brandClient;
        private readonly IMaterialClient _materialClient;
        private readonly IProductCategoryClient _productCategoryClient;
        public HeaderBannerViewComponent(IBrandClient brandClient,IMaterialClient materialClient,IProductCategoryClient productCategoryClient)
        {
            _brandClient = brandClient;
            _materialClient = materialClient;
            _productCategoryClient = productCategoryClient;
        }
        public async Task<IViewComponentResult> InvokeAsync(short id, string type)
        {
            if (type == Constants.TYPE_BANNER_BRAND.ToString())
                ViewData[Constants.DATA_BANNER] = await _brandClient.GetBrand(id);
            else if (type == Constants.TYPE_BANNER_MATERIAL.ToString())
                ViewData[Constants.DATA_BANNER] = await _materialClient.GetMaterial(id);
            else
                ViewData[Constants.DATA_BANNER] = await _productCategoryClient.GetProductCategory(id);
            ViewData[Constants.TYPE_BANNER] = type;
            return View();
        }
    }
}
