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
        public HeaderBannerViewComponent(IBrandClient brandClient)
        {
            _brandClient = brandClient;
        }
        public async Task<IViewComponentResult> InvokeAsync(short id)
        {
            var brand = await _brandClient.GetBrand(id);
            return View(brand);
        }
    }
}
