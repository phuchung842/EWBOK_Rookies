using EWBOK_Rookies_Front_End.Services;
using Microsoft.AspNetCore.Mvc;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Controllers
{
    public class CommentClientController : BaseController
    {
        private readonly ICommentClient _commentClient;
        public CommentClientController(ICommentClient commentClient)
        {
            _commentClient = commentClient;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(int id, string content)
        {
            var claimIdentity = User.Identity as ClaimsIdentity;
            string userid = claimIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            var commentCreateRequest = new CommentCreateRequest
            {
                UserID = userid,
                ProductID = id,
                Content = content
            };

            await _commentClient.PostComment(commentCreateRequest);
            return RedirectToAction("Detail", "ProductClient", new { id = id });
        }

    }
}
