using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Components
{
    public class CartBoxViewComponent :ViewComponent
    {
        private readonly ICartClient _cartClient;
        public CartBoxViewComponent(ICartClient cartClient)
        {
            _cartClient = cartClient;
        }
        public async Task<IViewComponentResult> InvokeAsync(string userid)
        {
            IList<CartVm> cart = null;
            if (userid != null)
            {
                cart = await _cartClient.GetCarts(userid);
            }
            return View(cart);
        }

    }
}
