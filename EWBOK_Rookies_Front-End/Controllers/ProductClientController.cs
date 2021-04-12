using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using System.Security.Claims;
using Microsoft.Extensions.Caching.Memory;
using SharedVm;

namespace EWBOK_Rookies_Front_End.Controllers
{
    public class ProductClientController : Controller
    {
        private readonly IProductClient _productClient;
        private readonly IRatingClient _ratingClient;
        private readonly ICommentClient _commentClient;
        private readonly IMemoryCache _memoryCache;
        public ProductClientController(IProductClient productClient, IRatingClient ratingClient, ICommentClient commentClient, IMemoryCache memoryCache)
        {
            _productClient = productClient;
            _ratingClient = ratingClient;
            _commentClient = commentClient;
            _memoryCache = memoryCache;
        }
        public async Task<IActionResult> Index(short id, string type, int page = 1, int pageSize = 1)
        {
            var link = HttpContext.Request.Path.Value;
            link = link + $"?type={type}&";

            if (!_memoryCache.TryGetValue(type, out IList<ProductVm> products))
            {
                products = await _productClient.GetProductByFilter(id, type);
                var cacheExpiryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddMinutes(5),
                    Priority = CacheItemPriority.High,
                    SlidingExpiration = TimeSpan.FromMinutes(2)
                };
                _memoryCache.Set(type, products, cacheExpiryOptions);
            }

            int totalRecord = products.Count();
            var Products_EachPage = products.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            ViewData[Constants.PAGINATION_TOTALRECORD] = totalRecord;
            ViewData[Constants.PAGINATION_PAGESIZE] = pageSize;
            ViewData[Constants.PAGINATION_PAGE] = page;
            ViewData[Constants.PAGINATION_LINK] = link;

            ViewData[Constants.TYPE_BANNER] = type;
            ViewData[Constants.TYPE_BANNER_ID] = id;
            return View("Index", Products_EachPage);
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
