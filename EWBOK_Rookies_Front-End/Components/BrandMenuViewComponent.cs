using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Components
{
    public class BrandMenuViewComponent : ViewComponent
    {
        private readonly IBrandClient _brandClient;
        public BrandMenuViewComponent(IBrandClient brandClient)
        {
            _brandClient = brandClient;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var brands = await _brandClient.GetBrands();
            return View(brands);
        }
    }
}
