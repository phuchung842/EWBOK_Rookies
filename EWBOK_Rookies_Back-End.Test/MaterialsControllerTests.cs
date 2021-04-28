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
    public class MaterialsControllerTests: IClassFixture<SqliteInMemoryFixture>
    {
        private readonly SqliteInMemoryFixture _fixture;
        public MaterialsControllerTests(SqliteInMemoryFixture fixture)
        {
            _fixture = fixture;
            _fixture.CreateDatabase();
        }
        [Fact]
        public async Task PostMaterial_Success()
        {
            var dbContext = _fixture.Context;
            var material = new MaterialCreateRequest { Name = "Test material" };

            var controller = new MaterialsController(dbContext);
            var result = await controller.PostMaterial(material);

            var createdActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnValue = Assert.IsType<MaterialVm>(createdActionResult.Value);
            Assert.Equal("Tests material", returnValue.Name);
        }
        [Fact]
        public async Task UpdateMaterial_Success()
        {
            var dbContext = _fixture.Context;
            Material oldMaterial = new Material { Name = "Test material" };
            await dbContext.Materials.AddAsync(oldMaterial);
            await dbContext.SaveChangesAsync();
            MaterialUpdateRequest newMaterial = new MaterialUpdateRequest { Name = "Test1 material" };
            var controller = new MaterialsController(dbContext);
            var result = await controller.PutMaterial(1, newMaterial);
            var updatAtActionResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultValue = Assert.IsType<MaterialUpdateRequest>(updatAtActionResult.Value);
            Assert.Equal(oldMaterial.Name, resultValue.Name);
            Assert.Equal(oldMaterial.Name, newMaterial.Name);
        }
        [Fact]
        public async Task GetMaterial_Success()
        {
            var dbContext = _fixture.Context;
            dbContext.Materials.Add(new Material { Name = "Test material" });
            await dbContext.SaveChangesAsync();

            var controller = new MaterialsController(dbContext);
            var result = await controller.GetMaterials();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<MaterialVm>>>(result);
            Assert.NotEmpty(actionResult.Value);
        }
        [Fact]
        public async Task DeleteMaterial_Success()
        {

            var dbContext = _fixture.Context;

            Material material = new Material { Name = "Test material" };
            await dbContext.Materials.AddAsync(material);
            await dbContext.SaveChangesAsync();

            var materialsController = new MaterialsController(dbContext);
            // Act
            var result = await materialsController.DeleteMaterial(material.ID);
            // Assert
            var deleteAtActionResult = Assert.IsType<NoContentResult>(result.Result);

            await Assert.ThrowsAsync<Exception>(async () =>
            {
                await materialsController.GetMaterial(material.ID);
            });
        }
    }
}
