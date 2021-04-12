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
    public class CartClientController : BaseController
    {
        private readonly ICartClient _cartClient;
        public CartClientController(ICartClient cartClient)
        {
            _cartClient = cartClient;
        }
        public async Task<IActionResult> AddCart(int productid, int quantity)
        {
            string urlAnterior = Request.Headers["Referer"].ToString();
            var claimIdentity = User.Identity as ClaimsIdentity;
            string userid = claimIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            var cartitem = new CartRequest
            {
                ProductID = productid,
                UserID = userid,
                Quantity = quantity
            };
            await _cartClient.AddCart(cartitem);
            return Redirect(urlAnterior);
        }
    }
}
