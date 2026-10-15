/*
  profile.js
  Fills the page with everything about you from profile.json.
  Edit profile.json, not the HTML.

  How the HTML opts in (attributes on any element):
    data-profile="name.first"        -> sets the element's text
        data-prefix=" · "            -> optional text placed before the value (hidden along with it when empty)
    data-profile-href="x" + data-href-prefix="mailto:"  -> sets the link target
    data-profile-content="site.description"            -> sets a content="" attribute (meta tags)
    data-profile-bg="avatar"         -> sets a CSS background image
    data-profile-list="chips"        -> rebuilds the element's children from an array
        data-item-tag="p"            -> tag for plain-text items (default "li")
        list items can be:  "text"
                            { "label": "...", "value": "..." }      (renders dt/dd facts)
                            { "label": "...", "url": "...", "style": "primary|ghost" }  (renders buttons)

  Rules:
    - If a field is missing from the JSON, the text already in the HTML stays as a fallback.
    - If a field exists but is empty (""), the element is hidden.
    - All text is inserted as plain text, so characters like & and < are safe.

  Note: browsers block fetch() on file:// pages. Open the site through a local server
  (VS Code "Live Server", `npx serve`, or `python -m http.server`) or host it normally.
*/
(function () {
  "use strict";

  const PROFILE_URL = "profile.json";

  function get(obj, path) {
    return path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), obj);
  }

  function isBlank(value) {
    return value === null || String(value).trim() === "";
  }

  function make(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function renderItem(item, tagName) {
    if (typeof item === "string") {
      return make(tagName || "li", item);
    }
    if (item && typeof item === "object" && item.url !== undefined) {
      const link = make("a", item.label || item.url, "button " + (item.style || "ghost"));
      link.href = item.url;
      if (/^https?:/i.test(item.url)) link.rel = "noopener";
      return link;
    }
    if (item && typeof item === "object" && item.value !== undefined) {
      const wrap = document.createElement("div");
      wrap.append(make("dt", item.label), make("dd", item.value));
      return wrap;
    }
    return null;
  }

  function applyProfile(profile) {
    // Page title
    const title = get(profile, "site.title");
    if (typeof title === "string" && !isBlank(title)) document.title = title;

    // Text
    document.querySelectorAll("[data-profile]").forEach(node => {
      const value = get(profile, node.dataset.profile);
      if (value === undefined) return;
      if (isBlank(value)) {
        node.hidden = true;
      } else {
        node.hidden = false;
        node.textContent = (node.dataset.prefix || "") + value;
      }
    });

    // Links
    document.querySelectorAll("[data-profile-href]").forEach(node => {
      const value = get(profile, node.dataset.profileHref);
      if (value === undefined || isBlank(value)) return;
      node.setAttribute("href", (node.dataset.hrefPrefix || "") + value);
    });

    // content="" attributes (meta description)
    document.querySelectorAll("[data-profile-content]").forEach(node => {
      const value = get(profile, node.dataset.profileContent);
      if (value !== undefined && !isBlank(value)) node.setAttribute("content", value);
    });

    // Background images (avatar)
    document.querySelectorAll("[data-profile-bg]").forEach(node => {
      const value = get(profile, node.dataset.profileBg);
      if (value !== undefined && !isBlank(value)) {
        node.style.backgroundImage = "url(" + JSON.stringify(value) + ")";
      }
    });

    // Lists
    document.querySelectorAll("[data-profile-list]").forEach(node => {
      const items = get(profile, node.dataset.profileList);
      if (!Array.isArray(items)) return;
      const rendered = items
        .map(item => renderItem(item, node.dataset.itemTag))
        .filter(Boolean);
      node.replaceChildren(...rendered);
    });
  }

  async function loadProfile() {
    try {
      const response = await fetch(PROFILE_URL, { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      applyProfile(await response.json());
    } catch (error) {
      console.warn(
        "profile.js: could not load " + PROFILE_URL + " (" + error.message + "). " +
        "Showing the text already in the HTML. If you opened the page straight from disk, " +
        "serve it from a local server instead (see the note at the top of profile.js)."
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadProfile);
  } else {
    loadProfile();
  }
})();
