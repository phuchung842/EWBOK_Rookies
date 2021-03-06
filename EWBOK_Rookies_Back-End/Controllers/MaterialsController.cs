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
using Microsoft.AspNetCore.Authorization;

namespace EWBOK_Rookies_Back_End.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    public class MaterialsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MaterialsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Materials
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MaterialVm>>> GetMaterials()
        {
            var materials = await _context.Materials.Select(x => new MaterialVm
            {
                ID = x.ID,
                Name = x.Name,
                Status = x.Status
            }).ToListAsync();
            return materials;
        }

        // GET: api/Materials/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<MaterialVm>> GetMaterial(short id)
        {
            var material = await _context.Materials.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }
            var materialvm = new MaterialVm
            {
                ID = material.ID,
                Name = material.Name,
                Status = material.Status
            };
            

            return materialvm;
        }

        // PUT: api/Materials/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<MaterialVm>> PutMaterial(short id, MaterialUpdateRequest materialUpdateRequest)
        {
            var material = await _context.Materials.FirstOrDefaultAsync(x => x.ID == id);

            material.Name = materialUpdateRequest.Name;
            material.Status = materialUpdateRequest.Status;
            
            if (id != material.ID)
            {
                return BadRequest();
            }

            _context.Entry(material).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
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

        // POST: api/Materials
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Material>> PostMaterial(MaterialCreateRequest materialCreateRequest)
        {
            var material = new Material
            {
                Name = materialCreateRequest.Name,
                Status = materialCreateRequest.Status
            };
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaterial", new { id = material.ID }, material);
        }

        // DELETE: api/Materials/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<MaterialVm>> DeleteMaterial(short id)
        {
            var material = await _context.Materials.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MaterialExists(short id)
        {
            return _context.Materials.Any(e => e.ID == id);
        }
    }
}
