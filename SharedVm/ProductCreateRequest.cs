using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class ProductCreateRequest
    {
        [StringLength(250)]
        public string Name { get; set; }

        public string Decription { get; set; }

        public IFormFile Image1 { get; set; }

        public IFormFile Image2 { get; set; }

        public IFormFile Image3 { get; set; }

        public IFormFile Image4 { get; set; }

        public IFormFile Image5 { get; set; }

        public IFormFile Image6 { get; set; }

        public IFormFile Image7 { get; set; }

        public IFormFile Image8 { get; set; }

        public IFormFile Image9 { get; set; }

        public IFormFile Image10 { get; set; }

        public decimal? Price { get; set; }

        public decimal? PromotionPrice { get; set; }

        [StringLength(10)]
        public string Gender { get; set; }

        public int? Weight { get; set; }

        [StringLength(50)]
        public string Size { get; set; }

        public bool? IncludeVAT { get; set; }

        public int Quantity { get; set; }

        public int? PublishYear { get; set; }

        public short? BrandID { get; set; }

        public short? ProductCategoryID { get; set; }

        public short? MaterialID { get; set; }

        public string Detail { get; set; }

        public int? Warranty { get; set; }

        public bool? Status { get; set; }

        public decimal? ProductStatus { get; set; }

        public int? StarRating { get; set; }
    }
}
