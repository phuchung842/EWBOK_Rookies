using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Components
{
    public class MaterialMenuViewComponent : ViewComponent
    {
        private readonly IMaterialClient _materialClient;
        public MaterialMenuViewComponent(IMaterialClient materialClient)
        {
            _materialClient = materialClient;
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var material = await _materialClient.GetMaterials();
            return View(material);
        }
    }
}
