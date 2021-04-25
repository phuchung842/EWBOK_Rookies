using EWBOK_Rookies_Back_End.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SharedVm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserVm>>> GetUsers()
        {
            var users = await _context.Users.Select(x => new
            {
                Id = x.Id,
                FullName = x.FullName,
                Image = x.Image,
                UserName = x.UserName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber
            }).ToListAsync();
            var uservm = users.Select(x => new UserVm
            {
                FullName = x.FullName,
                Image = x.Image,
                UserName = x.UserName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber
            }).ToList();

            return uservm;
        }
    }
}
