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
using Microsoft.EntityFrameworkCore.Storage;

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RatingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Ratings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RatingVm>>> GetRatings()
        {
            var ratings = await _context.Ratings
                .Include(x => x.Product)
                .Include(x => x.User)
                .ToListAsync();
            var ratingvm = ratings.Select(x =>
              new RatingVm
              {
                  ProductID = x.ProductID,
                  UserID = x.UserID,
                  ProductName = x.Product.Name,
                  Username = x.User.UserName,
                  Star = x.Star,
                  Status = x.Status
              }).ToList();
            return ratingvm;
        }

        // GET: api/Ratings/5
        [HttpGet("{userid}/{productid}")]
        public async Task<ActionResult<Rating>> GetRating(string userid, int productid)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(x => x.UserID == userid && x.ProductID == productid);
            if (rating == null)
            {
                return rating;
            }
            var ratingvm = new RatingVm
            {
                UserID = rating.UserID,
                ProductID = rating.ProductID,
                Star = rating.Star,
                Status = rating.Status
            };
            

            return rating;
        }

        // PUT: api/Ratings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutRating(RatingUpdateRequest ratingUpdateRequest)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var rating = await _context.Ratings.FirstOrDefaultAsync(x => x.ProductID == ratingUpdateRequest.ProductID && x.UserID == ratingUpdateRequest.UserID);
                if (rating == null)
                {
                    return NotFound();
                }
                rating.Star = ratingUpdateRequest.Star;
                rating.ModifieDate = DateTime.Now;
                await _context.SaveChangesAsync();

                var product = await _context.Products.FirstOrDefaultAsync(x => x.ID == ratingUpdateRequest.ProductID);
                var listrating = await _context.Ratings.Where(x => x.ProductID == ratingUpdateRequest.ProductID).ToListAsync();
                product.StarRating = Convert.ToInt32(listrating.Sum(x => x.Star) / listrating.Count);

                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch
            {

            }

            return Accepted();
        }

        // POST: api/Ratings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostRating(RatingCreateRequest ratingCreateRequest)
        {
            var transaction = _context.Database.BeginTransaction();
            var rating = new Rating
            {
                UserID = ratingCreateRequest.UserID,
                ProductID = ratingCreateRequest.ProductID,
                Star = ratingCreateRequest.Star,
                CreateDate = DateTime.Now,
                Status = 1
            };
            try
            {
                _context.Ratings.Add(rating);
                await _context.SaveChangesAsync();
                var product = await _context.Products.FirstOrDefaultAsync(x => x.ID == ratingCreateRequest.ProductID);
                var listrating = await _context.Ratings.Where(x => x.ProductID == ratingCreateRequest.ProductID).ToListAsync();
                product.StarRating = listrating.Sum(x => x.Star) / listrating.Count;

                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch(Exception)
            { }

            return Accepted();
        }

        // DELETE: api/Ratings/5
        [HttpDelete("{userid}/{productid}")]
        public async Task<IActionResult> DeleteRating(string userid, int productid)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(x => x.UserID == userid && x.ProductID == productid);
            if (rating == null)
            {
                return NotFound();
            }

            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RatingExists(string id)
        {
            return _context.Ratings.Any(e => e.UserID == id);
        }
    }
}
