using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Components
{
    public class PaginationViewComponent : ViewComponent
    {

        private void SetParamsPagination(int totalRecord, int pageSize, int page, string link)
        {
            ViewBag.Link = link;
            ViewBag.Page = page;
            int maxPage = 5;
            //int totalPage = 0;
            int totalPage = (int)Math.Ceiling((double)totalRecord / pageSize);

            ViewBag.TotalPage = totalPage;
            ViewBag.MaxPage = maxPage;
            ViewBag.First = 1;
            ViewBag.Last = totalPage;
            ViewBag.Next = page + 1;
            ViewBag.Prev = page - 1;
        }
        public async Task<IViewComponentResult> InvokeAsync(int totalRecord, int page, int pageSize, string link)
        {
            SetParamsPagination(totalRecord, pageSize, page, link);
            return View();
        }
    }
}
