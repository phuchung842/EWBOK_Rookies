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
    public class BrandsControllerTests : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly SqliteInMemoryFixture _fixture;
        public BrandsControllerTests(SqliteInMemoryFixture fixture)
        {
            _fixture = fixture;
            _fixture.CreateDatabase();
        }
        [Fact]
        public async Task PostBrand_Success()
        {
            var dbContext = _fixture.Context;
            var brand = new BrandCreateRequest { Name = "Test brand" };

            var controller = new BrandsController(dbContext);
            var result = await controller.PostBrand(brand);

            var createdActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnValue = Assert.IsType<BrandVm>(createdActionResult.Value);
            Assert.Equal("Tests brand", returnValue.Name);
        }

        [Fact]
        public async Task UpdateBrand_Success()
        {
            var dbContext = _fixture.Context;
            Brand oldBrand = new Brand { Name = "Test brand" };
            await dbContext.Brands.AddAsync(oldBrand);
            await dbContext.SaveChangesAsync();
            BrandUpdateRequest newBrand = new BrandUpdateRequest { Name = "Test1 brand" };
            var controller = new BrandsController(dbContext);
            var result = await controller.PutBrand(1, newBrand);
            var updatAtActionResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultValue = Assert.IsType<BrandUpdateRequest>(updatAtActionResult.Value);
            Assert.Equal(oldBrand.Name, resultValue.Name);
            Assert.Equal(oldBrand.Name, newBrand.Name);
        }

        [Fact]
        public async Task GetBrand_Success()
        {
            var dbContext = _fixture.Context;
            dbContext.Brands.Add(new Brand { Name = "Test brand" });
            await dbContext.SaveChangesAsync();

            var controller = new BrandsController(dbContext);
            var result = await controller.GetBrands();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<BrandVm>>>(result);
            Assert.NotEmpty(actionResult.Value);
        }
        [Fact]
        public async Task DeleteBrand_Success()
        {

            var dbContext = _fixture.Context;

            Brand brand = new Brand { Name = "Test brand" };
            await dbContext.Brands.AddAsync(brand);
            await dbContext.SaveChangesAsync();

            var brandsController = new BrandsController(dbContext);
            // Act
            var result = await brandsController.DeleteBrand(brand.ID);
            // Assert
            var deleteAtActionResult = Assert.IsType<NoContentResult>(result.Result);

            await Assert.ThrowsAsync<Exception>(async () =>
            {
                await brandsController.GetBrand(brand.ID);
            });
        }
    }
}
