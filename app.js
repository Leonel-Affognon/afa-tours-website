import { supabase, submitIntake } from "./backend.js";

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = event.currentTarget;
    const button = form.querySelector('[type="submit"]');
    const original = button.textContent;
    const data = new FormData(form);
    button.disabled = true; button.textContent = "Envoi en cours…";
    try {
      const result = await submitIntake({
        action: "booking",
        request_type: data.get("bookingType") === "Demander un circuit personnalisé" ? "custom_trip" : "existing_tour",
        full_name: data.get("name"), email: data.get("email"),
        preferred_date: data.get("date"), party_size: Number(data.get("people") || 1),
        tour_name: data.get("tour"), message: data.get("message")
      });
      form.reset();
      const note = document.getElementById("bookingFeedback");
      note.textContent = "Demande enregistrée. Référence : " + result.reference + ". Notre équipe vous contactera.";
      note.hidden = false;
    } catch (error) {
      const note = document.getElementById("bookingFeedback");
      note.textContent = error.message + " Vous pouvez aussi nous joindre sur WhatsApp.";
      note.hidden = false;
    } finally { button.disabled = false; button.textContent = original; }
  }, true);
}

async function loadPublishedTours() {
  const grid = document.querySelector(".tour-grid");
  if (!grid) return;
  const { data, error } = await supabase.from("tours").select("id,slug,title,summary,location,duration,price_from,currency,cover_image,featured").eq("status","published").order("sort_order");
  if (error || !data?.length) return; // Keep editorial fallback cards until tours are added in the admin.
  grid.innerHTML = data.map(t => `
    <article class="tour-card">
      <div class="tour-image" style="${t.cover_image ? `background-image:url('${t.cover_image.replace(/'/g,"%27")}')` : ""}"><span class="image-label">${escapeHtml(t.location || "BÉNIN")}</span></div>
      <div class="tour-info"><div class="tour-meta">${escapeHtml(t.duration || "CIRCUIT AFA")}</div>
      <h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.summary)}</p>
      ${t.price_from ? `<p class="tour-price">À partir de ${Number(t.price_from).toLocaleString("fr-FR")} ${escapeHtml(t.currency)}</p>` : ""}
      <a href="#booking" class="text-link dynamic-tour" data-tour="${escapeHtml(t.title)}">Demander les détails <span>↗</span></a></div></article>`).join("");
  grid.querySelectorAll(".dynamic-tour").forEach(a => a.addEventListener("click", () => {
    const select = document.getElementById("tourSelect");
    if (select && ![...select.options].some(o => o.value === a.dataset.tour)) {
      select.add(new Option(a.dataset.tour, a.dataset.tour));
    }
    if (select) select.value = a.dataset.tour;
  }));
}
function escapeHtml(v) { return String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
loadPublishedTours();
