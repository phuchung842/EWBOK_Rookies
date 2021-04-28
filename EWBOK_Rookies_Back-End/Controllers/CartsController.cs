using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EWBOK_Rookies_Back_End.Data;
using EWBOK_Rookies_Back_End.Models;
using SharedVm;
using EWBOK_Rookies_Back_End.Service;
using Microsoft.AspNetCore.Authorization;

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    public class CartsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IStorageService _storageService;
        public CartsController(ApplicationDbContext context,IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        // GET: api/Carts
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{userid}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CartVm>>> GetCarts(string userid)
        {
            var cart = await _context.Carts.Include(x => x.Product).Where(x => x.UserID == userid).ToListAsync();
            if (cart == null)
            {
                return NotFound();
            }
            var cartvm = cart.Select(x => new CartVm
            {
                ProductID = x.ProductID,
                UserID = x.UserID,
                Quantity = x.Quantity,
                ProductName = x.Product.Name,
                ProductImage = _storageService.GetFileUrl(x.Product.Image1),
                ProductPrice = x.Product.Price,
                ProductPromotionPrice = x.Product.PromotionPrice
            }).ToList();

            return cartvm;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutCart(string id, Cart cart)
        {
            if (id != cart.UserID)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> AddCart(CartRequest cartRequest)
        {
            
            var cartitem = await _context.Carts.FirstOrDefaultAsync(x => x.ProductID == cartRequest.ProductID && x.UserID == cartRequest.UserID);
            if (cartitem == null)
            {
                var cart = new Cart
                {
                    UserID = cartRequest.UserID,
                    ProductID = cartRequest.ProductID,
                    Quantity = cartRequest.Quantity,
                };
                _context.Carts.Add(cart);
            }
            else
            {
                cartitem.Quantity = cartitem.Quantity + cartRequest.Quantity;
            }
            await _context.SaveChangesAsync();
            return Accepted();
        }

        // DELETE: api/Carts/5
        [HttpDelete("{userid}/{productid}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteCart(string userid, int productid)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(x => x.ProductID == productid & x.UserID == userid);
            if (cart == null)
            {
                return NotFound();
            }
            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool CartExists(string id)
        {
            return _context.Carts.Any(e => e.UserID == id);
        }
    }
}
