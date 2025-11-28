// main.js

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  loadProjects();
  loadSkills();
  loadExperience();
});

// 1) Footer year
function setCurrentYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// 2) Projects from projects.json
async function loadProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  try {
    const res = await fetch("projects.json");
    if (!res.ok) throw new Error("Failed to fetch projects.json");
    const projects = await res.json();

    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "project-card";

      const title = document.createElement("h3");
      title.textContent = project.title;

      const tag = document.createElement("p");
      tag.className = "project-tag";
      tag.textContent = project.tag;

      const desc = document.createElement("p");
      desc.textContent = project.description;

      const ul = document.createElement("ul");
      ul.className = "project-points";

      if (Array.isArray(project.points)) {
        project.points.forEach(point => {
          const li = document.createElement("li");
          li.textContent = point;
          ul.appendChild(li);
        });
      }

      card.appendChild(title);
      card.appendChild(tag);
      card.appendChild(desc);
      card.appendChild(ul);

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading projects:", err);
  }
}

// 3) Skills from skills.json
async function loadSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) return;

  try {
    const res = await fetch("skills.json");
    if (!res.ok) throw new Error("Failed to fetch skills.json");
    const categories = await res.json();

    categories.forEach(cat => {
      const card = document.createElement("div");
      card.className = "skill-card";

      const h3 = document.createElement("h3");
      h3.textContent = cat.category;

      const ul = document.createElement("ul");

      if (Array.isArray(cat.items)) {
        cat.items.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
      }

      card.appendChild(h3);
      card.appendChild(ul);

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading skills:", err);
  }
}

// 4) Experience from experience.json
async function loadExperience() {
  const container = document.getElementById("experience-timeline");
  if (!container) return;

  try {
    const res = await fetch("experience.json");
    if (!res.ok) throw new Error("Failed to fetch experience.json");
    const roles = await res.json();

    roles.forEach(role => {
      const item = document.createElement("article");
      item.className = "timeline-item";

      const title = document.createElement("h3");
      title.textContent = role.title;

      const company = document.createElement("p");
      company.className = "timeline-company";
      company.textContent = role.company;

      const date = document.createElement("p");
      date.className = "timeline-date";
      date.textContent = role.date;

      const ul = document.createElement("ul");

      if (Array.isArray(role.points)) {
        role.points.forEach(point => {
          const li = document.createElement("li");
          li.textContent = point;
          ul.appendChild(li);
        });
      }

      item.appendChild(title);
      item.appendChild(company);
      item.appendChild(date);
      item.appendChild(ul);

      container.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading experience:", err);
  }
}
