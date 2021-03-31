using EWBOK_Rookies_Front_End.Models;
using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IProductClient _productClient;

        public HomeController(ILogger<HomeController> logger,IProductClient productClient)
        {
            _logger = logger;
            _productClient = productClient;
        }

        public async Task<IActionResult> Index()
        {
            var products = await _productClient.GetProducts();
            return View(products);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
