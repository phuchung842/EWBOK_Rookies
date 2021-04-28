using EWBOK_Rookies_Back_End.Controllers;
using EWBOK_Rookies_Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EWBOK_Rookies_Back_End.Test
{
    public class ProductCategoriesControllerTests
    {
        private readonly SqliteInMemoryFixture _fixture;
        public ProductCategoriesControllerTests(SqliteInMemoryFixture fixture)
        {
            _fixture = fixture;
            _fixture.CreateDatabase();
        }
        [Fact]
        public async Task PostProductCategory_Success()
        {
            var dbContext = _fixture.Context;
            var productcategory = new ProductCategoryCreateRequest { Name = "Test product category" };

            var controller = new ProductCategoriesController(dbContext);
            var result = await controller.PostProductCategory(productcategory);

            var createdActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnValue = Assert.IsType<ProductCategoryVm>(createdActionResult.Value);
            Assert.Equal("Tests product category", returnValue.Name);
        }
        [Fact]
        public async Task UpdateProductCategory_Success()
        {
            var dbContext = _fixture.Context;
            ProductCategory oldProductCategory = new ProductCategory { Name = "Test product category" };
            await dbContext.ProductCategories.AddAsync(oldProductCategory);
            await dbContext.SaveChangesAsync();
            ProductCategoryUpdateRequest newProductCategory = new ProductCategoryUpdateRequest { Name = "Test1 product category" };
            var controller = new ProductCategoriesController(dbContext);
            var result = await controller.PutProductCategory(1, newProductCategory);
            var updatAtActionResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultValue = Assert.IsType<ProductCategoryUpdateRequest>(updatAtActionResult.Value);
            Assert.Equal(oldProductCategory.Name, resultValue.Name);
            Assert.Equal(oldProductCategory.Name, newProductCategory.Name);
        }
        [Fact]
        public async Task GetProductCategory_Success()
        {
            var dbContext = _fixture.Context;
            dbContext.ProductCategories.Add(new ProductCategory { Name = "Test product category" });
            await dbContext.SaveChangesAsync();

            var controller = new ProductCategoriesController(dbContext);
            var result = await controller.GetProductCategories();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<ProductCategoryVm>>>(result);
            Assert.NotEmpty(actionResult.Value);
        }
        [Fact]
        public async Task DeleteProductCategory_Success()
        {

            var dbContext = _fixture.Context;

            ProductCategory productCategory = new ProductCategory { Name = "Test product category" };
            await dbContext.ProductCategories.AddAsync(productCategory);
            await dbContext.SaveChangesAsync();

            var productcategoriesController = new ProductCategoriesController(dbContext);
            // Act
            var result = await productcategoriesController.DeleteProductCategory(productCategory.ID);
            // Assert
            var deleteAtActionResult = Assert.IsType<NoContentResult>(result.Result);

            await Assert.ThrowsAsync<Exception>(async () =>
            {
                await productcategoriesController.GetProductCategory(productCategory.ID);
            });
        }
    }
}
