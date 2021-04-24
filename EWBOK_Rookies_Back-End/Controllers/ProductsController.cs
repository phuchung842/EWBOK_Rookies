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
using System.Net.Http.Headers;
using System.IO;
using Common;
using Microsoft.AspNetCore.Authorization;

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("Bearer")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IStorageService _storageService;

        public ProductsController(ApplicationDbContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        // GET: api/Products
        [HttpGet]
        //[AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProductVm>>> GetProducts()
        {
            var product = await _context.Products.Select(x => new
            {
                ID = x.ID,
                Name = x.Name,
                Code = x.Code,
                Tag = x.Tag,
                Decription = x.Decription,
                Image1 = x.Image1,
                Image2 = x.Image2,
                Image3 = x.Image3,
                Image4 = x.Image4,
                Image5 = x.Image5,
                Image6 = x.Image6,
                Image7 = x.Image7,
                Image8 = x.Image8,
                Image9 = x.Image9,
                Image10 = x.Image10,
                Price = x.Price,
                PromotionPrice = x.PromotionPrice,
                Gender = x.Gender,
                Weight = x.Weight,
                Size = x.Size,
                IncludeVAT = x.IncludeVAT,
                Quantity = x.Quantity,
                PublishYear = x.PublishYear,
                BrandName = x.Brand.Name,
                ProductCategoryName = x.ProductCategory.Name,
                MaterialName = x.Material.Name,
                StarRating = 5,
                Detail = x.Detail
            }).ToListAsync();

            var productvms = product.Select(x =>
              new ProductVm
              {
                  ID = x.ID,
                  Name = x.Name,
                  Code = x.Code,
                  Tag = x.Tag,
                  Decription = x.Decription,
                  Image1 = _storageService.GetFileUrl(x.Image1),
                  Image2 = _storageService.GetFileUrl(x.Image2),
                  Image3 = _storageService.GetFileUrl(x.Image3),
                  Image4 = _storageService.GetFileUrl(x.Image4),
                  Image5 = _storageService.GetFileUrl(x.Image5),
                  Image6 = _storageService.GetFileUrl(x.Image6),
                  Image7 = _storageService.GetFileUrl(x.Image7),
                  Image8 = _storageService.GetFileUrl(x.Image8),
                  Image9 = _storageService.GetFileUrl(x.Image9),
                  Image10 = _storageService.GetFileUrl(x.Image10),
                  Price = x.Price,
                  PromotionPrice = x.PromotionPrice,
                  Gender = x.Gender,
                  Weight = x.Weight,
                  Size = x.Size,
                  IncludeVAT = x.IncludeVAT,
                  Quantity = x.Quantity,
                  PublishYear = x.PublishYear,
                  BrandName = x.BrandName,
                  ProductCategoryName = x.ProductCategoryName,
                  MaterialName = x.MaterialName,
                  StarRating=x.StarRating,
                  Detail = x.Detail
              }).ToList();

            return productvms;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        //[AllowAnonymous]
        public async Task<ActionResult<ProductVm>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(x => x.Brand)
                .Include(x => x.ProductCategory)
                .Include(x => x.Material)
                .FirstOrDefaultAsync(x => x.ID.Equals(id));
            if (product == null)
            {
                return NotFound();
            }
            var productvm = new ProductVm
            {
                ID = product.ID,
                Name = product.Name,
                Code = product.Code,
                Tag = product.Tag,
                Decription = product.Decription,
                Image1 = _storageService.GetFileUrl(product.Image1),
                Image2 = _storageService.GetFileUrl(product.Image2),
                Image3 = _storageService.GetFileUrl(product.Image3),
                Image4 = _storageService.GetFileUrl(product.Image4),
                Image5 = _storageService.GetFileUrl(product.Image5),
                Image6 = _storageService.GetFileUrl(product.Image6),
                Image7 = _storageService.GetFileUrl(product.Image7),
                Image8 = _storageService.GetFileUrl(product.Image8),
                Image9 = _storageService.GetFileUrl(product.Image9),
                Image10 = _storageService.GetFileUrl(product.Image10),
                Price = product.Price,
                PromotionPrice = product.PromotionPrice,
                Gender = product.Gender,
                Weight = product.Weight,
                Size = product.Size,
                IncludeVAT = product.IncludeVAT,
                Quantity = product.Quantity,
                PublishYear = product.PublishYear,
                BrandName = product.Brand.Name,
                BrandID = product.BrandID,
                ProductCategoryID = product.ProductCategoryID,
                MaterialID = product.MaterialID,
                ProductCategoryName = product.ProductCategory.Name,
                MaterialName = product.Material.Name,
                StarRating = product.StarRating,
                Detail = product.Detail
            };

            return productvm;
        }

        [HttpGet("{id}/{page}/{pageSize}/{type}")]
        //[AllowAnonymous]
        public async Task<ActionResult<PaginationVm>> GetProductByFilter(short id, string type, int page, int pageSize)
        {
            var queryable = _context.Products.AsQueryable();
            if (type == Constants.TYPE_BANNER_BRAND.ToString())
                queryable = queryable.Where(x => x.BrandID == id);
            else if (type == Constants.TYPE_BANNER_MATERIAL.ToString())
                queryable = queryable.Where(x => x.MaterialID == id);
            else
                queryable = queryable.Where(x => x.ProductCategoryID == id);
            var totalRecord = queryable.Count();
            var product = await queryable.Select(x => new
            {
                ID = x.ID,
                Name = x.Name,
                Code = x.Code,
                Tag = x.Tag,
                Decription = x.Decription,
                Image1 = x.Image1,
                Image2 = x.Image2,
                Image3 = x.Image3,
                Image4 = x.Image4,
                Image5 = x.Image5,
                Image6 = x.Image6,
                Image7 = x.Image7,
                Image8 = x.Image8,
                Image9 = x.Image9,
                Image10 = x.Image10,
                Price = x.Price,
                PromotionPrice = x.PromotionPrice,
                Gender = x.Gender,
                Weight = x.Weight,
                Size = x.Size,
                IncludeVAT = x.IncludeVAT,
                Quantity = x.Quantity,
                PublishYear = x.PublishYear,
                BrandName = x.Brand.Name,
                ProductCategoryName = x.ProductCategory.Name,
                MaterialName = x.Material.Name,
                Detail = x.Detail
            }).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            var productvms = product.Select(x =>
              new ProductVm
              {
                  ID = x.ID,
                  Name = x.Name,
                  Code = x.Code,
                  Tag = x.Tag,
                  Decription = x.Decription,
                  Image1 = _storageService.GetFileUrl(x.Image1),
                  Image2 = _storageService.GetFileUrl(x.Image2),
                  Image3 = _storageService.GetFileUrl(x.Image3),
                  Image4 = _storageService.GetFileUrl(x.Image4),
                  Image5 = _storageService.GetFileUrl(x.Image5),
                  Image6 = _storageService.GetFileUrl(x.Image6),
                  Image7 = _storageService.GetFileUrl(x.Image7),
                  Image8 = _storageService.GetFileUrl(x.Image8),
                  Image9 = _storageService.GetFileUrl(x.Image9),
                  Image10 = _storageService.GetFileUrl(x.Image10),
                  Price = x.Price,
                  PromotionPrice = x.PromotionPrice,
                  Gender = x.Gender,
                  Weight = x.Weight,
                  Size = x.Size,
                  IncludeVAT = x.IncludeVAT,
                  Quantity = x.Quantity,
                  PublishYear = x.PublishYear,
                  BrandName = x.BrandName,
                  ProductCategoryName = x.ProductCategoryName,
                  MaterialName = x.MaterialName,
                  Detail = x.Detail
              }).ToList();
            var pagination = new PaginationVm
            {
                productVms = productvms,
                totalRecord = totalRecord
            };
            return pagination;
        }

        //// PUT: api/Products/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPut("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> PutProduct(int id,[FromForm] ProductUpdateRequest productUpdateRequest)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.ID == id);

            if (product == null)
            {
                return NotFound();
            }
            product.Name = productUpdateRequest.Name;
            product.Decription = productUpdateRequest.Decription;
            product.Price = productUpdateRequest.Price;
            product.PromotionPrice = productUpdateRequest.PromotionPrice;
            product.Gender = productUpdateRequest.Gender;
            product.Weight = productUpdateRequest.Weight;
            product.Size = productUpdateRequest.Size;
            product.IncludeVAT = productUpdateRequest.IncludeVAT;
            product.Quantity = productUpdateRequest.Quantity;
            product.BrandID = productUpdateRequest.BrandID;
            product.ProductCategoryID = productUpdateRequest.ProductCategoryID;
            product.MaterialID = productUpdateRequest.MaterialID;
            product.PublishYear = productUpdateRequest.PublishYear;
            product.Status = productUpdateRequest.Status;

            if (productUpdateRequest.Image1 != null)
            {
                await _storageService.DeleteFileAsync(product.Image1);
                product.Image1 = await SaveFile(productUpdateRequest.Image1);
            }
            if (productUpdateRequest.Image2 != null)
            {
                await _storageService.DeleteFileAsync(product.Image2);
                product.Image2 = await SaveFile(productUpdateRequest.Image2);
            }
            if (productUpdateRequest.Image3 != null)
            {
                await _storageService.DeleteFileAsync(product.Image3);
                product.Image3 = await SaveFile(productUpdateRequest.Image3);
            }
            if (productUpdateRequest.Image4 != null)
            {
                await _storageService.DeleteFileAsync(product.Image4);
                product.Image4 = await SaveFile(productUpdateRequest.Image4);
            }
            if (productUpdateRequest.Image5 != null)
            {
                await _storageService.DeleteFileAsync(product.Image5);
                product.Image5 = await SaveFile(productUpdateRequest.Image5);
            }
            if (productUpdateRequest.Image6 != null)
            {
                await _storageService.DeleteFileAsync(product.Image6);
                product.Image6 = await SaveFile(productUpdateRequest.Image6);
            }
            if (productUpdateRequest.Image7 != null)
            {
                await _storageService.DeleteFileAsync(product.Image7);
                product.Image7 = await SaveFile(productUpdateRequest.Image7);
            }
            if (productUpdateRequest.Image8 != null)
            {
                await _storageService.DeleteFileAsync(product.Image8);
                product.Image8 = await SaveFile(productUpdateRequest.Image8);
            }
            if (productUpdateRequest.Image9 != null)
            {
                await _storageService.DeleteFileAsync(product.Image9);
                product.Image9 = await SaveFile(productUpdateRequest.Image9);
            }
            if (productUpdateRequest.Image10 != null)
            {
                await _storageService.DeleteFileAsync(product.Image10);
                product.Image10 = await SaveFile(productUpdateRequest.Image10);
            }

            await _context.SaveChangesAsync();
            return Accepted();
        }
        //// POST: api/Products
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[AllowAnonymous]
        public async Task<ActionResult> PostProduct(ProductCreateRequest productCreateRequest)
        {
            var product = new Product
            {
                Name = productCreateRequest.Name,
                Decription = productCreateRequest.Decription,
                Price = productCreateRequest.Price,
                PromotionPrice = productCreateRequest.PromotionPrice,
                Gender = productCreateRequest.Gender,
                Weight = productCreateRequest.Weight,
                Size = productCreateRequest.Size,
                IncludeVAT = productCreateRequest.IncludeVAT,
                Quantity = productCreateRequest.Quantity,
                BrandID = productCreateRequest.BrandID,
                ProductCategoryID = productCreateRequest.ProductCategoryID,
                MaterialID = productCreateRequest.MaterialID,
                PublishYear = productCreateRequest.PublishYear,
                Status = productCreateRequest.Status
            };
            if (productCreateRequest.Image1 != null)
            {
                product.Image1 = await SaveFile(productCreateRequest.Image1);
            }
            if (productCreateRequest.Image2 != null)
            {
                product.Image2 = await SaveFile(productCreateRequest.Image2);
            }
            if (productCreateRequest.Image3 != null)
            {
                product.Image3 = await SaveFile(productCreateRequest.Image3);
            }
            if (productCreateRequest.Image4 != null)
            {
                product.Image4 = await SaveFile(productCreateRequest.Image4);
            }
            if (productCreateRequest.Image5 != null)
            {
                product.Image5 = await SaveFile(productCreateRequest.Image5);
            }
            if (productCreateRequest.Image6 != null)
            {
                product.Image6 = await SaveFile(productCreateRequest.Image6);
            }
            if (productCreateRequest.Image7 != null)
            {
                product.Image7 = await SaveFile(productCreateRequest.Image7);
            }
            if (productCreateRequest.Image8 != null)
            {
                product.Image8 = await SaveFile(productCreateRequest.Image8);
            }
            if (productCreateRequest.Image9 != null)
            {
                product.Image9 = await SaveFile(productCreateRequest.Image9);
            }
            if (productCreateRequest.Image10 != null)
            {
                product.Image10 = await SaveFile(productCreateRequest.Image10);
            }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ID }, null);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        //[AllowAnonymous]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ID == id);
        }
        private async Task<string> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
            return fileName;
        }
    }
}
