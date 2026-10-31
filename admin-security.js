import { supabase } from "./backend.js";

const loginForm = document.getElementById("loginForm");
const loginPanel = document.getElementById("loginPanel");
const panel = document.getElementById("mfaPanel");
const message = document.getElementById("mfaMessage");
let factorId = null;
let challengeId = null;

async function requireSecondFactor() {
  const { data: assurance, error: assuranceError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assuranceError) throw assuranceError;
  if (assurance.currentLevel === "aal2") {
    window.location.reload();
    return;
  }

  const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
  if (factorsError) throw factorsError;
  const verified = (factors.totp || []).find((factor) => factor.status === "verified");

  if (verified) {
    factorId = verified.id;
    document.getElementById("mfaInstructions").textContent =
      "Saisissez le code temporaire affiché dans votre application d’authentification.";
    document.getElementById("mfaQrWrap").classList.add("hidden");
  } else {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "AFA TOURS — Administration"
    });
    if (error) throw error;
    factorId = data.id;
    document.getElementById("mfaInstructions").textContent =
      "Scannez ce QR code avec votre application d’authentification, puis saisissez le code généré.";
    document.getElementById("mfaQr").src = data.totp.qr_code;
    document.getElementById("mfaSecret").textContent = data.totp.secret;
    document.getElementById("mfaQrWrap").classList.remove("hidden");
  }

  const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
  if (challengeError) throw challengeError;
  challengeId = challenge.id;
  loginPanel.classList.add("hidden");
  panel.classList.remove("hidden");
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  const form = new FormData(loginForm);
  const status = document.getElementById("loginMessage");
  status.textContent = "Connexion…";
  const { error } = await supabase.auth.signInWithPassword({
    email: form.get("email"),
    password: form.get("password")
  });
  if (error) {
    status.textContent = "Connexion refusée. Vérifiez vos identifiants.";
    return;
  }
  try {
    await requireSecondFactor();
  } catch (error) {
    message.textContent = error.message || "La vérification supplémentaire a échoué.";
    panel.classList.remove("hidden");
    loginPanel.classList.add("hidden");
  }
}, true);

document.getElementById("mfaVerifyForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const code = new FormData(event.currentTarget).get("code");
  const { error } = await supabase.auth.mfa.verify({ factorId, challengeId, code });
  if (error) {
    message.textContent = "Code incorrect ou expiré. Réessayez.";
    return;
  }
  message.textContent = "Vérification réussie. Ouverture de votre espace…";
  window.location.reload();
});

const { data: sessionData } = await supabase.auth.getSession();
if (sessionData.session) {
  const { data: assurance } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assurance?.currentLevel !== "aal2") {
    try {
      await requireSecondFactor();
    } catch (error) {
      loginPanel.classList.add("hidden");
      panel.classList.remove("hidden");
      message.textContent = error.message || "Vérification supplémentaire requise.";
    }
  }
}
