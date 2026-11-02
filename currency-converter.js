(() => {
  if (document.querySelector(".afa-fx-widget")) return;
  const MARGIN = 0.03; // Marge commerciale AFA TOURS, modifiable dans cette configuration.
  const base = "XOF";
  const widget = document.createElement("section");
  widget.className = "afa-fx-widget";
  widget.setAttribute("aria-label","Convertisseur de devises AFA TOURS");
  widget.innerHTML = '<div class="afa-fx-heading"><div><span class="afa-fx-kicker">AFA TOURS · INTERNATIONAL</span><h2>Convertisseur de devises</h2><p>Estimez le prix de votre expérience dans votre monnaie.</p></div><span class="afa-fx-badge">FCFA · XOF</span></div><div class="afa-fx-controls"><label>Montant<input class="afa-fx-amount" type="number" min="0" step="any" value="25000" inputmode="decimal"></label><label>De<select class="afa-fx-from"><option value="XOF">XOF — Franc CFA</option></select></label><label>Vers<select class="afa-fx-to"><option value="EUR">EUR — Euro</option><option value="USD">USD — Dollar américain</option></select></label><button type="button" class="afa-fx-swap" aria-label="Inverser les devises">⇄</button></div><div class="afa-fx-result" aria-live="polite"><span>Montant estimé</span><strong>Chargement des taux…</strong></div><p class="afa-fx-note">Marge de change AFA TOURS : 3 %. Taux indicatifs, actualisés automatiquement. Le montant final est confirmé par AFA TOURS au moment du paiement.</p><p class="afa-fx-updated"></p><p class="afa-fx-error" role="status"></p></section>';
  const header=document.querySelector(".site-header");
  if(header) header.insertAdjacentElement("afterend",widget); else document.body.prepend(widget);
  const from=widget.querySelector(".afa-fx-from"),to=widget.querySelector(".afa-fx-to"),amount=widget.querySelector(".afa-fx-amount");
  const result=widget.querySelector(".afa-fx-result strong"),updated=widget.querySelector(".afa-fx-updated"),error=widget.querySelector(".afa-fx-error");
  let rates=null, rateDate=null;
  const names=new Intl.DisplayNames(["fr"],{type:"currency"});
  const fmt=(n,c)=>new Intl.NumberFormat("fr-FR",{style:"currency",currency:c,maximumFractionDigits:["XOF","JPY","KRW"].includes(c)?0:2}).format(n);
  function populate(select,selected){const codes=Object.keys(rates||{}).sort();select.innerHTML=codes.map(c=>{let label;try{label=names.of(c)||c}catch{label=c}return '<option value="'+c+'">'+c+' — '+label+'</option>'}).join("");select.value=selected&&rates[selected]?selected:(select===from?"XOF":"EUR");}
  function convert(){if(!rates)return;const value=Number(amount.value);if(!Number.isFinite(value)||value<0){result.textContent="Saisissez un montant valide.";return;}const a=from.value,b=to.value;if(!rates[a]||!rates[b]){result.textContent="Devise non disponible.";return;}const raw=value/rates[a]*rates[b];const converted=raw*(1+MARGIN);result.textContent=fmt(converted,b);updated.textContent="Taux de référence du "+rateDate+" · Marge AFA incluse : "+(MARGIN*100).toFixed(1)+" %";}
  async function load(){try{const response=await fetch("https://open.er-api.com/v6/latest/XOF",{cache:"no-store"});if(!response.ok)throw new Error("Service de taux indisponible.");const data=await response.json();if(data.result!=="success"||!data.rates)throw new Error("Réponse de taux invalide.");rates=data.rates;rates.XOF=1;rateDate=data.time_last_update_utc?new Date(data.time_last_update_utc).toLocaleDateString("fr-FR",{day:"2-digit",month:"long",year:"numeric"}):"dernière mise à jour";populate(from,"XOF");populate(to,"EUR");convert();}catch(e){error.textContent="Impossible de charger les taux en direct. Réessayez plus tard.";result.textContent="Conversion temporairement indisponible.";}}
  amount.addEventListener("input",convert);from.addEventListener("change",convert);to.addEventListener("change",convert);
  widget.querySelector(".afa-fx-swap").addEventListener("click",()=>{const old=from.value;from.value=to.value;to.value=old;convert();});
  load();
})();