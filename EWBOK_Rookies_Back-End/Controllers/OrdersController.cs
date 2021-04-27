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

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(long id, Order order)
        {
            if (id != order.ID)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderCreaterequest orderCreaterequest)
        {
            var order = new Order
            {
                CustomerID = orderCreaterequest.UserID,
                CreateDate = DateTime.Now,
                ShipAddress = orderCreaterequest.ShipAddress,
                ShipEmail = orderCreaterequest.ShipEmail,
                ShipMobile = orderCreaterequest.ShipMobile,
                ShipName = orderCreaterequest.ShipName
            };
            var transaction = _context.Database.BeginTransaction();
            try
            {
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
                var orderid = order.ID;
                for (int i = 0; i < orderCreaterequest.OrderItems.Count; i++)
                {
                    var orderdetail = new OrderDetail
                    {
                        OrderID = orderid,
                        ProductID = orderCreaterequest.OrderItems[i].ProductID,
                        Quantity = orderCreaterequest.OrderItems[i].Quantity,
                        Price = orderCreaterequest.OrderItems[i].ProductPrice,
                        PromotionPrice = orderCreaterequest.OrderItems[i].ProductPromotionPrice
                    };

                    var product = _context.Products.Find(orderdetail.ProductID);
                    product.Quantity = product.Quantity - orderdetail.Quantity.Value;
                    await _context.SaveChangesAsync();
                    _context.OrderDetails.Add(orderdetail);
                    await _context.SaveChangesAsync();
                }
                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch
            {

            }
            return Accepted();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(long id)
        {
            return _context.Orders.Any(e => e.ID == id);
        }
    }
}
