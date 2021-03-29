using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            string test = "";
            return View();
        }
    }
}
