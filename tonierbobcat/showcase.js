/*
  Work items. Fields:
    category     "minecraft" | "games" | "software" | "models"
    title, type, description, tags
    image        path to a screenshot (falls back to the symbol tile if missing)
    symbol       shown on the fallback tile
    link         OPTIONAL. A URL (https://...) for the project: repo, Sketchfab, demo...
    linkLabel    OPTIONAL. Button text for the link (default: "View project")
    date         OPTIONAL. When you made it. Use "2026", "2026-03" or "2026-03-14"
                 and it is shown as "2026", "Mar 2026" or "Mar 14, 2026".
                 Any other text (e.g. "Summer 2025", "Ongoing") is shown as written.
*/

// Turns "2026-03-14" / "2026-03" / "2026" into a nice label, and leaves other text alone.
// Parsed by hand (not with new Date) so time zones can never shift the day.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(raw) {
  const text = String(raw || "").trim();
  if (!text) return null;

  const match = text.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
  if (!match) return { label: text, iso: null };

  const year = Number(match[1]);
  const month = match[2] ? Number(match[2]) : null;
  const day = match[3] ? Number(match[3]) : null;
  if (month !== null && (month < 1 || month > 12)) return { label: text, iso: null };
  if (day !== null && (day < 1 || day > new Date(year, month, 0).getDate())) return { label: text, iso: null };

  if (month === null) return { label: String(year), iso: String(year) };
  if (day === null) return { label: `${MONTHS[month - 1]} ${year}`, iso: text };
  return { label: `${MONTHS[month - 1]} ${day}, ${year}`, iso: text };
}
const workItems = [
  // {
  //   category: "minecraft",
  //   title: "Minecraft Party System",
  //   type: "Minecraft Plugin",
  //   description: "A party system that lets players create groups and play alongside bots.",
  //   image: "images/projects/party-system.jpg",
  //   symbol: "⌘",
  //   tags: ["Minecraft", "Java", "Systems"],
  //   link: "",
  //   linkLabel: ""
  // },
  {
    category: "minecraft",
    title: "Minecraft Labs Minigame",
    type: "Minigame",
    description: "A last-player-standing minigame where randomized events keep every round unpredictable.",
    image: "images/projects/labs-minigame.jpg",
    symbol: "✳",
    tags: ["Minecraft", "Gameplay", "Events"],
    link: "",
    linkLabel: ""
  },
  {
    category: "minecraft",
    title: "Forgifed Paper",
    type: "Framework",
    description: "A library that is used to create advanced paper plugins",
    tags: ["Minecraft", "Framework", "Codebase"],
    link: "https://github.com/Tonierbobcat/ForgifiedPaper",
    linkLabel: "View on GitHub"
  },
  {
    category: "minecraft",
    title: "Minecraft AI Companion",
    type: "AI Integration",
    description: "A follower companion integrated with an LLM, designed to understand its surroundings and the player's inventory.",
    image: "images/projects/ai-companion.jpg",
    symbol: "◈",
    tags: ["Minecraft", "LLM", "AI"],
    link: "",
    linkLabel: ""
  },
  {
    category: "software",
    title: "Aseprite to LibGDX Converter",
    type: "Developer Tool",
    description: "A utility that converts Aseprite sprite-sheet JSON into atlas files for the LibGDX Java framework.",
    image: "images/projects/aseprite-converter.jpg",
    symbol: "{ }",
    tags: ["Java", "LibGDX", "Tooling"],
    link: "https://github.com/Tonierbobcat/Aseprite-Sprite-Sheet-Converter-For-LibGDX",
    linkLabel: "View on GitHub"
  },
  {
    category: "minecraft",
    title: "Minecraft 3D Character Menu",
    type: "Gacha Character Menu Plugin",
    description: "A reusable 3D character menu intended for displaying characters in a gacha-style minecraft ui.",
    image: "images/projects/07.png",
    symbol: "◇",
    tags: ["3D", "UI", "Framework"],
    link: "",
    linkLabel: ""
  },
  {
    category: "games",
    title: "Melody Suite",
    type: "Package Suite",
    date: "2026-10-4",
    description: "A suite of my own game systems to reduce boilerplate when making games and to help prototype faster",
    link: "https://github.com/Tonierbobcat/Melody-Suite",
    linkLabel: "View on GitHub",
    tags: ["Framework", "Unity Package"]
  },
  {
    category: "games",
    title: "Plant Game",
    type: "Game Concept",
    description: "A botanical exploration concept about discovering plants, growing a garden, and unlocking decorations.",
    image: "images/projects/plant-game.jpg",
    symbol: "✿",
    tags: ["Exploration", "Gardening", "Design"],
    link: "",
    linkLabel: ""
  },
  {
    category: "models",
    title: "Cozy Lemon",
    type: "3D Model",
    description: "This took me several hours to make and 5 minutes to render. I have it uploaded to Sketchfab.",
    image: "images/projects/model-01.png",
    symbol: "▲",
    tags: ["3D", "Modeling", "Blender"],
    link: "https://skfb.ly/pOVr9",
    date: "2026-10-15",
    linkLabel: "View on Sketchfab"
  },
  {
    category: "models",
    title: "Pool Floaty",
    type: "3D Model",
    description: "Nothing besides a pool floaty. The only thing cool is the material set up. Made it in a few minutes for my portfolio pfp",
    image: "images/projects/pfprenderuncompressed.png",
    symbol: "▲",
      date: "2026-10-15",
    tags: ["3D", "Modeling", "Blender"]
  }, 
  {
    category: "models",
    title: "Mona",
    type: "3D Model",
    description: "This took eight hours. no tutorials, only a reference. I think that this came out pretty good.",
    image: "images/projects/monaexport.png",
    symbol: "▲",
    date: "2026-10-16",
    tags: ["3D", "Modeling", "Blender", "Genshin", "Mona"]
  }, 
];

function makeProjectCard(item, index) {
  const card = document.createElement("article");
  card.className = "project-card";

  const visual = document.createElement("a");
  visual.className = "project-visual";
  visual.href = item.image;
  visual.setAttribute("aria-label", `Open image for ${item.title}`);

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = `${item.title} project preview`;
  img.loading = "lazy";
  img.addEventListener("error", () => {
    // Keep the card attractive when a personal screenshot hasn't been added yet.
    visual.removeAttribute("href");
    visual.removeAttribute("aria-label");
    visual.classList.add("no-image");
    const fallback = document.createElement("span");
    fallback.className = "visual-symbol";
    fallback.textContent = item.symbol || "✳";
    visual.replaceChildren(fallback);
    const number = document.createElement("span");
    number.className = "visual-index";
    number.textContent = `PROJECT / ${String(index + 1).padStart(2, "0")}`;
    visual.appendChild(number);
  }, { once: true });
  visual.appendChild(img);

  const body = document.createElement("div");
  body.className = "project-body";

  const meta = document.createElement("div");
  meta.className = "project-meta";
  const type = document.createElement("span");
  type.className = "project-type";
  type.textContent = item.type;
  meta.appendChild(type);

  // Optional date, shown at the right of the type line.
  const when = formatDate(item.date);
  if (when) {
    const date = document.createElement("time");
    date.className = "project-date";
    date.textContent = when.label;
    if (when.iso) date.dateTime = when.iso;
    meta.appendChild(date);
  }

  const title = document.createElement("h4");
  title.textContent = item.title;
  const description = document.createElement("p");
  description.textContent = item.description;

  const tags = document.createElement("div");
  tags.className = "project-tags";
  (item.tags || []).forEach(tagText => {
    const tag = document.createElement("span");
    tag.textContent = tagText;
    tags.appendChild(tag);
  });

  body.append(meta, title, description, tags);

  // Optional project link. Only web links are rendered.
  const url = (item.link || "").trim();
  if (/^https?:\/\//i.test(url)) {
    const link = document.createElement("a");
    link.className = "project-link";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = (item.linkLabel || "").trim() || "View project";
    link.setAttribute("aria-label", `${link.textContent}: ${item.title} (opens in a new tab)`);
    body.appendChild(link);
  }

  card.append(visual, body);
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const destinations = {
    minecraft: document.getElementById("minecraft-projects"),
    games: document.getElementById("game-projects"),
    software: document.getElementById("software-projects"),
    models: document.getElementById("model-projects")
  };

  workItems.forEach((item, index) => {
    const destination = destinations[item.category];
    if (destination) destination.appendChild(makeProjectCard(item, index));
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Category tabs: "all" shows every section, otherwise only the chosen one.
  const tabs = document.querySelectorAll(".filter-tabs [data-filter]");
  const categorySections = document.querySelectorAll("section.category");

  function setFilter(filter) {
    tabs.forEach(tab => {
      const active = tab.dataset.filter === filter;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    categorySections.forEach(section => {
      section.hidden = filter !== "all" && section.dataset.category !== filter;
    });
  }

  tabs.forEach(tab => tab.addEventListener("click", () => setFilter(tab.dataset.filter)));

  // Links like #minecraft (nav, "See my work") switch to that tab so the target is visible.
  function showTargetFromHash() {
    const target = document.querySelector("section.category" + (location.hash || "#none"));
    if (target) {
      setFilter(target.dataset.category);
      target.scrollIntoView();
    }
  }
  window.addEventListener("hashchange", showTargetFromHash);
  showTargetFromHash();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
});