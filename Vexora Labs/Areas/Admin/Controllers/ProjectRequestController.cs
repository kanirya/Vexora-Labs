using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Vexora_Labs.Areas.Admin.Models;
using Vexora_Labs.Areas.Admin.Services;
using Vexora_Labs.Areas.Admin.Services.Interfaces;
using Vexora_Labs.Data;

namespace Vexora_Labs.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class ProjectRequestController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IProjectRequestService _projectRequestService;

        public ProjectRequestController(ApplicationDbContext context,IProjectRequestService projectRequestService)
        {
            _context = context;
            _projectRequestService = projectRequestService;
        }

        // GET: Admin/Projects
        public async Task<IActionResult> Index()
        {
            var applicationDbContext =await _projectRequestService.GetAllAsync();
            return View(applicationDbContext);
        }

        // GET: Admin/Projects/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var projectRequest = await _context.ProjectRequests
                .Include(p => p.ApprovedBy)
                .Include(p => p.Project)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (projectRequest == null)
            {
                return NotFound();
            }

            return View(projectRequest);
        }

        // GET: Admin/Projects/Create
        public IActionResult Create()
        {
            ViewData["ApprovedById"] = new SelectList(_context.Users, "Id", "Id");
            ViewData["ProjectId"] = new SelectList(_context.Projects, "Id", "Name");
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ClientName,ClientEmail,ProjectType,Description,SubmittedAt,IsApproved,ApprovedById,ProjectId")] ProjectRequest projectRequest)
        {
            if (ModelState.IsValid)
            {
                projectRequest.Id = Guid.NewGuid();
                _context.Add(projectRequest);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ApprovedById"] = new SelectList(_context.Users, "Id", "Id", projectRequest.ApprovedById);
            ViewData["ProjectId"] = new SelectList(_context.Projects, "Id", "Name", projectRequest.ProjectId);
            return View(projectRequest);
        }

        // GET: Admin/Projects/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var projectRequest = await _context.ProjectRequests.FindAsync(id);
            if (projectRequest == null)
            {
                return NotFound();
            }
            ViewData["ApprovedById"] = new SelectList(_context.Users, "Id", "Id", projectRequest.ApprovedById);
            ViewData["ProjectId"] = new SelectList(_context.Projects, "Id", "Name", projectRequest.ProjectId);
            return View(projectRequest);
        }

        // POST: Admin/Projects/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,ClientName,ClientEmail,ProjectType,Description,SubmittedAt,IsApproved,ApprovedById,ProjectId")] ProjectRequest projectRequest)
        {
            if (id != projectRequest.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(projectRequest);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProjectRequestExists(projectRequest.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["ApprovedById"] = new SelectList(_context.Users, "Id", "Id", projectRequest.ApprovedById);
            ViewData["ProjectId"] = new SelectList(_context.Projects, "Id", "Name", projectRequest.ProjectId);
            return View(projectRequest);
        }

        // GET: Admin/Projects/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var projectRequest = await _context.ProjectRequests
                .Include(p => p.ApprovedBy)
                .Include(p => p.Project)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (projectRequest == null)
            {
                return NotFound();
            }

            return View(projectRequest);
        }

        // POST: Admin/Projects/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var projectRequest = await _context.ProjectRequests.FindAsync(id);
            if (projectRequest != null)
            {
                _context.ProjectRequests.Remove(projectRequest);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddProject(Guid id)
        {
            return RedirectToAction("Index");
        }


        private bool ProjectRequestExists(Guid id)
        {
            return _context.ProjectRequests.Any(e => e.Id == id);
        }
    }
}
