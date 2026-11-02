import { supabase } from "./backend.js";
const grid = document.querySelector(".destination-grid-section .destination-grid");
const text = (tag, value) => { const el = document.createElement(tag); el.textContent = value || ""; return el; };
const safeUrl = value => { try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : ""; } catch { return ""; } };
async function loadCircuits() {
  if (!grid) return;
  const { data, error } = await supabase.from("tours")
    .select("id,slug,title,summary,description,location,country,duration,price_from,currency,cover_image,gallery,itinerary,translations,destination:destinations(name)")
    .eq("status", "published").eq("content_type", "tour")
    .not("slug", "in", '("porto-novo-patrimoine","adjarra-au-fil-de-leau")').order("sort_order");
  if (error) { console.error("AFA circuits:", error); return; }
  for (const item of data || []) {
    const translated = window.AFA_TRANSLATE ? window.AFA_TRANSLATE(item, ["title", "summary", "description", "itinerary"]) : item;
    const title = String(translated.title || item.title || "").trim();
    if (!title) continue;
    const exists = Array.from(grid.querySelectorAll(".destination-copy h2"))
      .some(heading => heading.textContent.trim().toLocaleLowerCase() === title.toLocaleLowerCase());
    if (exists) continue;
    const place = item.destination?.name || item.location || "Bénin";
    const article = document.createElement("article"); article.className = "destination-card reveal"; article.id = item.slug || "";
    const link = document.createElement("a"); link.className = "destination-image"; link.href = "contact.html?content=" + encodeURIComponent(item.slug || title) + "#booking";
    link.append(text("span", String(grid.children.length + 1).padStart(2, "0")));
    const imageUrl = safeUrl(item.cover_image);
    if (imageUrl) { const image = document.createElement("img"); image.src = imageUrl; image.alt = title + " — " + place; image.loading = "lazy"; image.decoding = "async"; image.style.cssText = "width:100%;height:100%;object-fit:cover;position:absolute;inset:0"; link.append(image); }
    const copy = document.createElement("div"); copy.className = "destination-copy";
    const eyebrow = text("p", place.toUpperCase() + " · CIRCUIT AFA"); eyebrow.className = "eyebrow"; copy.append(eyebrow);
    copy.append(text("h2", title), text("p", translated.description || translated.summary || ""));
    if (Array.isArray(item.gallery) && item.gallery.length) { const gallery = document.createElement("div"); gallery.className = "destination-mini-gallery"; gallery.setAttribute("aria-label", "Photos de " + title); item.gallery.slice(0, 4).forEach((url, index) => { const src = safeUrl(url); if (!src) return; const img = document.createElement("img"); img.src = src; img.alt = title + " — photo " + (index + 1); img.loading = "lazy"; img.decoding = "async"; gallery.append(img); }); copy.append(gallery); }
    if (translated.itinerary || item.itinerary) { const stops = text("p", "Étapes : " + (translated.itinerary || item.itinerary)); copy.append(stops); }
    copy.append(text("p", "Durée indicative : " + (item.duration || "À confirmer")));
    copy.append(text("p", "Tarif : " + (item.price_from ? Number(item.price_from).toLocaleString("fr-FR") + " " + (item.currency || "XOF") : "Sur demande")));
    const action = text("a", "Demander ce circuit ↗"); action.className = "text-link"; action.href = link.href; copy.append(action);
    article.append(link, copy); grid.append(article);
  }
}
loadCircuits();