using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using System.Security.Claims;

namespace EWBOK_Rookies_Front_End.Controllers
{
    public class ProductClientController : Controller
    {
        private readonly IProductClient _productClient;
        private readonly IRatingClient _ratingClient;
        private readonly ICommentClient _commentClient;
        public ProductClientController(IProductClient productClient, IRatingClient ratingClient, ICommentClient commentClient)
        {
            _productClient = productClient;
            _ratingClient = ratingClient;
            _commentClient = commentClient;

        }
        public async Task<IActionResult> Index(short id, string type)
        {
            var product = await _productClient.GetProductByFilter(id, type);
            ViewData[Constants.TYPE_BANNER] = type;
            ViewData[Constants.TYPE_BANNER_ID] = id;
            return View("Index", product);
        }
        public async Task<IActionResult> Detail(int id)
        {
            var product = await _productClient.GetProduct(id);
            ViewData[Constants.TYPE_BANNER] = Constants.TYPE_BANNER_BRAND;
            ViewData[Constants.DATA_COMMENTS_CLIENT] = await _commentClient.GetCommentsByProduct(id);
            if (User.Identity.IsAuthenticated)
            {
                var claimIdentity = User.Identity as ClaimsIdentity;
                string userid = claimIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
                var rating = await _ratingClient.GetRating(userid, id);
                ViewData[Constants.DATA_RATING_CLIENT] = rating;
            }
            return View(product);
        }
    }
}
