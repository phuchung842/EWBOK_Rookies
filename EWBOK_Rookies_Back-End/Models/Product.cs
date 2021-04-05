using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel;

namespace EWBOK_Rookies_Back_End.Models
{
    public class Product
    {
        public Product()
        {
            Comments = new HashSet<Comment>();
            Wishes = new HashSet<Wish>();
            Ratings = new HashSet<Rating>();
            DiscountDetails = new HashSet<DiscountDetail>();
        }
        [Key]
        public int ID { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Code { get; set; }

        [StringLength(250)]
        public string MetaTitle { get; set; }

        [StringLength(250)]
        public string Tag { get; set; }

        public string Decription { get; set; }

        //[StringLength(550)]
        public string Image1 { get; set; }
        //[StringLength(550)]
        public string Image2 { get; set; }
        //[StringLength(550)]
        public string Image3 { get; set; }
        //[StringLength(550)]
        public string Image4 { get; set; }
        //[StringLength(550)]
        public string Image5 { get; set; }
        //[StringLength(550)]
        public string Image6 { get; set; }
        //[StringLength(550)]
        public string Image7 { get; set; }
        //[StringLength(550)]
        public string Image8 { get; set; }
        //[StringLength(550)]
        public string Image9 { get; set; }
        //[StringLength(550)]
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

        public short? BrandID { get; set; }

        public short? ProductCategoryID { get; set; }

        public short? MaterialID { get; set; }

        public string Detail { get; set; }

        public int? Warranty { get; set; }

        public DateTime? CreatedDate { get; set; }

        [StringLength(50)]
        public string CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        [StringLength(50)]
        public string ModifiedBy { get; set; }

        [StringLength(250)]
        public string MetaKeywords { get; set; }

        [StringLength(250)]
        public string MetaDecription { get; set; }

        public bool? Status { get; set; }

        public long? ViewCount { get; set; }

        public long? SellerCount { get; set; }

        public long? WishCount { get; set; }

        public decimal? ProductStatus { get; set; }

        public int? StarRating { get; set; }

        public Brand Brand { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public Material Material { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<DiscountDetail> DiscountDetails { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<Rating> Ratings { get; set; }
        public ICollection<Wish> Wishes { get; set; }

    }
}
