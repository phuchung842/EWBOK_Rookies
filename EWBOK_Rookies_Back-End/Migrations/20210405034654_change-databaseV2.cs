using Microsoft.EntityFrameworkCore.Migrations;

namespace EWBOK_Rookies_Back_End.Migrations
{
    public partial class changedatabaseV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "ProductCategories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "ProductCategories",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: true);
        }
    }
}
