import { supabase } from "./backend.js";
const grid = document.querySelector(".destination-grid-section .destination-grid");
const text = (tag, value) => { const el = document.createElement(tag); el.textContent = value || ""; return el; };
const safeUrl = value => { try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : ""; } catch { return ""; } };
async function loadDestinations() {
  if (!grid) return;
  const { data, error } = await supabase.from("destinations")
    .select("id,slug,name,country,region,summary,description,cover_image,gallery,status,sort_order,translations")
    .eq("status", "published").order("sort_order");
  if (error) { console.error("AFA destinations:", error); return; }
  for (const item of data || []) {
    const translated = window.AFA_TRANSLATE ? window.AFA_TRANSLATE(item, ["name", "summary", "description"]) : item;
    const title = String(translated.name || item.name || "").trim();
    if (!title) continue;
    const exists = Array.from(grid.querySelectorAll(".destination-copy h2"))
      .some(heading => heading.textContent.trim().toLocaleLowerCase() === title.toLocaleLowerCase());
    if (exists) continue;
    const article = document.createElement("article");
    article.className = "destination-card reveal";
    const link = document.createElement("a");
    link.className = "destination-image";
    link.href = "contact.html?destination=" + encodeURIComponent(item.name) + "#booking";
    link.append(text("span", String(grid.children.length + 1).padStart(2, "0")));
    const imageUrl = safeUrl(item.cover_image);
    if (imageUrl) { const image = document.createElement("img"); image.src = imageUrl; image.alt = title + " — " + (item.country || "Bénin"); image.loading = "lazy"; image.decoding = "async"; image.style.cssText = "width:100%;height:100%;object-fit:cover;position:absolute;inset:0"; link.append(image); }
    const copy = document.createElement("div"); copy.className = "destination-copy";
    copy.append(text("p", window.AFA_TEXT ? window.AFA_TEXT(item.region || item.country || "Bénin") : (item.region || item.country || "Bénin"))); copy.lastChild.className = "eyebrow";
    copy.append(text("h2", title));
    copy.append(text("p", translated.summary || translated.description || (window.AFA_TEXT ? window.AFA_TEXT("Découvrez cette destination avec AFA TOURS.") : "Découvrez cette destination avec AFA TOURS.")));
    if (Array.isArray(item.gallery) && item.gallery.length) {
      const gallery = document.createElement("div"); gallery.className = "destination-mini-gallery"; gallery.setAttribute("aria-label", "Galerie de " + title);
      item.gallery.slice(0, 4).forEach((url, index) => { const src = safeUrl(url); if (!src) return; const img = document.createElement("img"); img.src = src; img.alt = title + " — photo " + (index + 1); img.loading = "lazy"; img.decoding = "async"; gallery.append(img); });
      copy.append(gallery);
    }
    const action = text("a", (window.AFA_TEXT ? window.AFA_TEXT("Préparer cette découverte") : "Préparer cette découverte") + " ↗"); action.className = "text-link"; action.href = link.href; copy.append(action);
    article.append(link, copy); grid.append(article);
  }
}
loadDestinations();