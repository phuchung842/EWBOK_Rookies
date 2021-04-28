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
using Microsoft.AspNetCore.Authorization;

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    public class ProductCategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductCategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProductCategories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProductCategoryVm>>> GetProductCategories()
        {
            var productcategoryvm = await _context.ProductCategories.Select(x => new ProductCategoryVm
            {
                ID = x.ID,
                Name = x.Name,
                MetaTitle = x.MetaTitle,
                DisplayOrder = x.DisplayOrder,
                Status = x.Status,
                ShowOnHome = x.ShowOnHome
            }).ToListAsync();
            return productcategoryvm;
        }

        // GET: api/ProductCategories/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ProductCategoryVm>> GetProductCategory(short id)
        {
            var productCategory = await _context.ProductCategories.FindAsync(id);
            var productcategoryvm = new ProductCategoryVm
            {
                ID = productCategory.ID,
                Name = productCategory.Name,
                Status = productCategory.Status,
                DisplayOrder = productCategory.DisplayOrder,
                MetaTitle = productCategory.MetaTitle,
                ShowOnHome = productCategory.ShowOnHome
            };

            if (productCategory == null)
            {
                return NotFound();
            }

            return productcategoryvm;
        }

        // PUT: api/ProductCategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> PutProductCategory(short id, ProductCategory productCategory)
        {
            if (id != productCategory.ID)
            {
                return BadRequest();
            }

            _context.Entry(productCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCategoryExists(id))
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

        // POST: api/ProductCategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<ProductCategory>> PostProductCategory(ProductCategoryCreateRequest productCategoryCreateRequest)
        {
            var productCategory = new ProductCategory
            {
                Name = productCategoryCreateRequest.Name,
                MetaTitle = productCategoryCreateRequest.MetaTitle,
                DisplayOrder = productCategoryCreateRequest.DisplayOrder,
                Status = productCategoryCreateRequest.Status,
                ShowOnHome = productCategoryCreateRequest.ShowOnHome
            };
            _context.ProductCategories.Add(productCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductCategory", new { id = productCategory.ID }, productCategory);
        }

        // DELETE: api/ProductCategories/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteProductCategory(short id)
        {
            var productCategory = await _context.ProductCategories.FindAsync(id);
            if (productCategory == null)
            {
                return NotFound();
            }

            _context.ProductCategories.Remove(productCategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductCategoryExists(short id)
        {
            return _context.ProductCategories.Any(e => e.ID == id);
        }
    }
}
