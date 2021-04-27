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
    public class CheckoutClientController : BaseController
    {
        private readonly IOrderClient _orderClient;
        private readonly ICartClient _cartClient;
        public CheckoutClientController(IOrderClient orderClient, ICartClient cartClient)
        {
            _cartClient = cartClient;
            _orderClient = orderClient;
        }
        public async Task<IActionResult> Index()
        {
            IList<CartVm> cart = null;
            var claimIdentity = User.Identity as ClaimsIdentity;
            string userid = claimIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userid != null)
            {
                cart = await _cartClient.GetCarts(userid);
            }
            return View(cart);
        }
        [HttpPost]
        public async Task<IActionResult> Checkout()
        {
            IList<CartVm> cart = null;
            var claimIdentity = User.Identity as ClaimsIdentity;
            string userid = claimIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (userid != null)
            {
                cart = await _cartClient.GetCarts(userid);
            }
            var ordercreaterequest = new OrderCreaterequest
            {
                UserID = userid,
            };
            ordercreaterequest.OrderItems = new List<OrderItem>();
            for (int i = 0; i < cart.Count; i++)
            {
                var orderitem = new OrderItem
                {
                    ProductID = cart[i].ProductID,
                    Quantity = cart[i].Quantity,
                    ProductPrice = cart[i].ProductPrice,
                    ProductPromotionPrice = cart[i].ProductPromotionPrice
                };
                ordercreaterequest.OrderItems.Add(orderitem);
            }
            await _orderClient.PostOrder(ordercreaterequest);
            return RedirectToAction("Index", "Home");
        }
    }
}
