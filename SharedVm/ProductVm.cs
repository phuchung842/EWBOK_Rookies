using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedVm
{
    public class ProductVm
    {
        public int ID { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Code { get; set; }


        [StringLength(250)]
        public string Tag { get; set; }

        public string Decription { get; set; }

        [StringLength(550)]
        public string Image1 { get; set; }
        [StringLength(550)]
        public string Image2 { get; set; }
        [StringLength(550)]
        public string Image3 { get; set; }
        [StringLength(550)]
        public string Image4 { get; set; }
        [StringLength(550)]
        public string Image5 { get; set; }
        [StringLength(550)]
        public string Image6 { get; set; }
        [StringLength(550)]
        public string Image7 { get; set; }
        [StringLength(550)]
        public string Image8 { get; set; }
        [StringLength(550)]
        public string Image9 { get; set; }
        [StringLength(550)]
        public string Image10 { get; set; }

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

        public string BrandName { get; set; }

        public short? BrandID { get; set; }

        public string ProductCategoryName { get; set; }

        public string MaterialName { get; set; }

        public string Detail { get; set; }

        public int? Warranty { get; set; }

        public bool? Status { get; set; }

        public long? ViewCount { get; set; }

        public long? SellerCount { get; set; }

        public long? WishCount { get; set; }

        public decimal? ProductStatus { get; set; }

        public int? StarRating { get; set; }
    }
}
