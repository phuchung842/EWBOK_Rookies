using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Moq;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using EWBOK_Rookies_Front_End.Services;
using EWBOK_Rookies_Front_End.Components;
using Microsoft.AspNetCore.Mvc;

namespace EWBOK_Rookies_Back_End.Test
{
    public class ProductCategoryMenuViewTests : IClassFixture<SqliteInMemoryFixture>
    {
        [Fact]
        public async Task PostCategory_Success()
        {
            //Arrange View Component
            var httpContext = new DefaultHttpContext();
            var viewContext = new ViewContext();
            viewContext.HttpContext = httpContext;
            var viewComponentContext = new ViewComponentContext();
            viewComponentContext.ViewContext = viewContext;

            //Arrange Mock Client
            var categoryApiClientMock = new Mock<IProductCategoryClient>();
            categoryApiClientMock.Setup(c => c.GetProductCategories()).Returns(getCategoriesValue());
            var viewComponent = new ProductCategoryMenuViewComponent(categoryApiClientMock.Object);

            //Act - Check final result is viewcomponent
            var result = viewComponent.InvokeAsync();
            var createdAtActionResult = Assert.IsType<Task<IViewComponentResult>>(result);
        }

        private Task<IList<ProductCategoryVm>> getCategoriesValue()
        {
            IList<ProductCategoryVm> categoriesValue = new List<ProductCategoryVm>();
            return Task.FromResult(categoriesValue);
        }
    }
}
