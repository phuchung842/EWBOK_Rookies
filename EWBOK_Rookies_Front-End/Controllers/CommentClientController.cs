using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Controllers
{
    public class CommentClientController : BaseController
    {
        public CommentClientController()
        {

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
