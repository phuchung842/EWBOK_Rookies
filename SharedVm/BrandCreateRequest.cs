using System.ComponentModel.DataAnnotations;

namespace SharedVm
{
    public class BrandCreateRequest
    {
        [StringLength(200)]
        public string Name { get; set; }

        public bool? Status { get; set; }
    }
}
