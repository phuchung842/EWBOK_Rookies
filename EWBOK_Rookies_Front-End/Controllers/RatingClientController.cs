using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Controllers
{
    public class RatingClientController : BaseController
    {
        private readonly IRatingClient _ratingClient;
        public RatingClientController(IRatingClient ratingClient)
        {
            _ratingClient = ratingClient;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> CreateRating(int id, short star)
        {
            var claimIdentity = User.Identity as ClaimsIdentity;
            string userid = claimIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ratingCreateRequest = new RatingCreateRequest
            {
                UserID = userid,
                ProductID = id,
                Star = star,
                Status = 1
            };
            await _ratingClient.CreateRating(ratingCreateRequest);
            return RedirectToAction("Detail", "ProductClient", new { id = id });
        }
        public async Task<IActionResult> UpdateRating(int id, short star)
        {
            var claimIdentity = User.Identity as ClaimsIdentity;
            string userid = claimIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            var ratingUpdateRequest = new RatingUpdateRequest
            {
                UserID = userid,
                ProductID = id,
                Star = star,
                Status = 1
            };
            await _ratingClient.UpdateRating(ratingUpdateRequest);
            return RedirectToAction("Detail", "ProductClient", new { id = id });
        }

    }
}
