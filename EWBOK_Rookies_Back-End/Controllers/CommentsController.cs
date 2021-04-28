using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EWBOK_Rookies_Back_End.Data;
using EWBOK_Rookies_Back_End.Models;
using SharedVm;
using EWBOK_Rookies_Back_End.Service;
using Microsoft.AspNetCore.Authorization;

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IStorageService _storageService;

        public CommentsController(ApplicationDbContext context,IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        // GET: api/Comments
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CommentVm>>> GetComments()
        {
            var comments=await _context.Comments
                .Include(x=>x.Product)
                .Include(x=>x.User)
                .ToListAsync();
            var commentvm = comments.Select(x =>
              new CommentVm
              {
                  UserName = x.User.UserName,
                  UserID=x.UserID,
                  ProductName = x.Product.Name,
                  ProductID=x.ProductID,
                  Content = x.Content,
                  CreatedDate = x.CreatedDate
              }).ToList();
            return commentvm;
        }

        // GET: api/Comments/5
        [HttpGet("{productid}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CommentVm>>> GetCommentsByProduct(long productid)
        {
            var comment = await _context.Comments.Include(x => x.User).Where(x => x.ProductID == productid).ToListAsync();
            if (comment == null)
            {
                return NotFound();
            }
            var commentvms = comment.Select(x => new CommentVm
            {
                UserID = x.UserID,
                ProductID = x.ProductID,
                Content = x.Content,
                Image = _storageService.GetFileUrl(x.Image),
                CreatedDate = x.CreatedDate,
                UserName = x.User.UserName,
                UserImage = _storageService.GetFileUrl(x.User.Image)
            }).ToList();

            return commentvms;
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutComment(long id, Comment comment)
        {
            if (id != comment.ID)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostComment(CommentVm commentVm)
        {
            var comment = new Comment
            {
                UserID = commentVm.UserID,
                ProductID = commentVm.ProductID,
                Content = commentVm.Content,
                Image = commentVm.Image
            };
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.ID }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteComment(long id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(long id)
        {
            return _context.Comments.Any(e => e.ID == id);
        }
    }
}
