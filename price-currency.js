(() => {
  const endpoint = "https://open.er-api.com/v6/latest/XOF";
  let ratesPromise = null, rates = null, updated = "";
  const fmt = (value, currency) => new Intl.NumberFormat("fr-FR", {
    style: "currency", currency,
    maximumFractionDigits: ["XOF","JPY","KRW","CLP","VND"].includes(currency) ? 0 : 2
  }).format(value);
  async function getRates() {
    if (rates) return rates;
    if (!ratesPromise) ratesPromise = fetch(endpoint, {cache:"no-store"}).then(async response => {
      if (!response.ok) throw new Error("Taux indisponibles");
      const data = await response.json();
      if (data.result !== "success" || !data.rates) throw new Error("Taux invalides");
      rates = {...data.rates, XOF:1};
      updated = data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toLocaleDateString("fr-FR")
        : "";
      return rates;
    }).catch(error => { ratesPromise = null; throw error; });
    return ratesPromise;
  }
  function update(widget) {
    if (!rates) return;
    const amount = Number(widget.dataset.amount), base = widget.dataset.base || "XOF";
    const output = widget.querySelector("[data-currency-output]");
    const select = widget.querySelector("[data-currency-select]");
    if (!Number.isFinite(amount) || !rates[base] || !rates[select.value]) {
      output.textContent = "Conversion indisponible."; return;
    }
    const converted = amount / rates[base] * rates[select.value];
    output.textContent = "≈ " + fmt(converted, select.value);
    const date = widget.querySelector("[data-currency-date]");
    if (date) date.textContent = updated ? "Taux indicatifs du " + updated : "Taux indicatifs";
  }
  document.addEventListener("click", async event => {
    const button = event.target.closest("[data-price-currency-toggle]");
    if (!button) return;
    const widget = button.closest("[data-price-currency]");
    const panel = widget?.querySelector("[data-currency-panel]");
    if (!widget || !panel) return;
    panel.hidden = !panel.hidden;
    button.setAttribute("aria-expanded",String(!panel.hidden));
    if (panel.hidden) return;
    if (widget.dataset.loaded === "1") return;
    const output = widget.querySelector("[data-currency-output]");
    output.textContent = "Chargement…";
    try {
      const currentRates = await getRates();
      const select = widget.querySelector("[data-currency-select]");
      const labels = new Intl.DisplayNames(["fr"], {type:"currency"});
      const options = Object.keys(currentRates).sort().map(code => {
        let name = code; try { name = labels.of(code) || code; } catch(e) {}
        return '<option value="' + code + '">' + code + ' — ' + name + '</option>';
      }).join("");
      select.innerHTML = options;
      select.value = "EUR";
      widget.dataset.loaded = "1";
      update(widget);
    } catch(error) {
      output.textContent = "Taux momentanément indisponibles. Réessayez.";
    }
  });
  document.addEventListener("change", event => {
    if (!event.target.matches("[data-currency-select]")) return;
    const widget = event.target.closest("[data-price-currency]");
    if (widget) update(widget);
  });
  window.AfaPriceCurrency = {
    markup(amount, currency="XOF") {
      const value = Number(amount);
      if (!Number.isFinite(value) || value <= 0) return "";
      return '<span class="afa-price-currency" data-price-currency data-amount="' + value + '" data-base="' + currency + '">' +
        '<button type="button" class="afa-price-currency-button" data-price-currency-toggle aria-expanded="false">Voir dans ma monnaie</button>' +
        '<span class="afa-price-currency-panel" data-currency-panel hidden>' +
        '<span class="afa-price-currency-value" data-currency-output>Choisissez une devise</span>' +
        '<select aria-label="Choisir une devise" data-currency-select><option value="EUR">EUR</option></select>' +
        '<small data-currency-date>Taux indicatifs</small></span></span>';
    }
  };
})();