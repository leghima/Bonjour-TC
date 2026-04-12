// ── Données du réseau ────────────────────────────────────────────────────────
const lignes = [
  {
    id: "M1", type: "metro", nom: "Métro Ligne 1",
    couleur: "#006B3F", status: "ok",
    terminus: "Haï Bainem ↔ Place des Martyrs",
    stations: ["Haï Bainem","Aïn Naâdja","Bachdjerrah 2","Bachdjerrah 1",
      "El Harrach Centre","El Harrach Gare","Les Fusillés","Hamma",
      "Khelifa Boukhalfa","Tafourah Grande Poste","Université",
      "Place du 1er Mai","Réparation","Bourouba","Place des Martyrs"],
    horaires: ["3 min","11 min","19 min"],
    direction: "Direction → El Harrach"
  },
  {
    id: "M2", type: "metro", nom: "Métro Ligne 2",
    couleur: "#1565C0", status: "warn",
    terminus: "Place du 1er Mai ↔ Aïn Naâdja",
    stations: ["Place du 1er Mai","Jardin d'Essai","Les Fusillés",
      "Djamaâ El Djazaïr","Aïn Naâdja"],
    horaires: ["7 min","15 min","23 min"],
    direction: "Direction → Aïn Naâdja"
  },
  {
    id: "M3", type: "metro", nom: "Métro Ligne 3",
    couleur: "#6A0DAD", status: "ok",
    terminus: "Alger Centre ↔ Dar El Beïda",
    stations: ["Alger Centre","Hussein Dey","Dar El Beïda"],
    horaires: ["5 min","13 min","21 min"],
    direction: "Direction → Dar El Beïda"
  },
  {
    id: "T1", type: "tramway", nom: "Tramway Alger",
    couleur: "#E8A020", status: "ok",
    terminus: "Les Bananiers ↔ Bab Ezzouar",
    stations: ["Les Bananiers","Mohammadia","Ruisseau","Hamma",
      "Tafourah Grande Poste","Palais de la Culture",
      "Dergana","Bordj El Kiffan","Bab Ezzouar"],
    horaires: ["6 min","14 min","22 min"],
    direction: "Direction → Bab Ezzouar"
  },
  {
    id: "T2", type: "tramway", nom: "Tramway Sétif",
    couleur: "#D4780A", status: "ok",
    terminus: "Aïn Oulmène ↔ Aïn Abessa",
    stations: ["Aïn Oulmène","Centre-Ville Sétif","Aïn Abessa"],
    horaires: ["8 min","16 min","24 min"],
    direction: "Direction → Aïn Abessa"
  },
  {
    id: "21", type: "bus", nom: "Bus Ligne 21",
    couleur: "#C0392B", status: "ok",
    terminus: "El Biar ↔ Grande Poste",
    stations: ["El Biar","Télemly","Didouche Mourad","Grande Poste"],
    horaires: ["10 min","20 min","30 min"],
    direction: "Direction → Grande Poste"
  },
  {
    id: "34", type: "bus", nom: "Bus Ligne 34",
    couleur: "#A93226", status: "warn",
    terminus: "Bab El Oued ↔ Hussein Dey",
    stations: ["Bab El Oued","Place des Martyrs","Hussein Dey"],
    horaires: ["15 min","25 min","40 min"],
    direction: "Direction → Hussein Dey"
  },
  {
    id: "55", type: "bus", nom: "Bus Ligne 55",
    couleur: "#922B21", status: "err",
    terminus: "Bir Mourad Raïs ↔ Kouba",
    stations: ["Bir Mourad Raïs","Hydra","Kouba"],
    horaires: ["—","—","—"],
    direction: "Service interrompu"
  }
];
// ── AUTHENTIFICATION ─────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = "Lw--kynH_tBmsrPY0";
const EMAILJS_SERVICE_ID = "service_leghima1";
const EMAILJS_TEMPLATE_ID = "template_leghima1";

emailjs.init(EMAILJS_PUBLIC_KEY);

let codeConfirmation = null;
let codeExpiration = null;
let pendingUser = null;

function verifierAuth() {
  const user = JSON.parse(localStorage.getItem("btc-user") || "null");
  if (!user) {
    document.getElementById("auth-screen").classList.remove("hidden");
  } else {
    document.getElementById("auth-screen").classList.add("hidden");
    mettreAJourNavbar(user);
  }
}

// Indicateur force mot de passe en temps réel
document.addEventListener("DOMContentLoaded", () => {
  const pwd = document.getElementById("reg-password");
  const confirm = document.getElementById("reg-confirm");

  if (pwd) {
    pwd.addEventListener("input", () => {
      const el = document.getElementById("password-strength");
      const v = pwd.value;
      if (v.length === 0) { el.textContent = ""; return; }
      if (v.length < 6) { el.textContent = "⚠️ Trop court"; el.style.color = "#C0392B"; }
      else if (v.length < 10) { el.textContent = "✓ Correct"; el.style.color = "#E8A020"; }
      else { el.textContent = "✓✓ Fort"; el.style.color = "#006B3F"; }
    });
  }

  if (confirm) {
    confirm.addEventListener("input", () => {
      const el = document.getElementById("password-match");
      const pwd = document.getElementById("reg-password").value;
      if (confirm.value.length === 0) { el.textContent = ""; return; }
      if (confirm.value === pwd) {
        el.textContent = "✓ Les mots de passe correspondent";
        el.style.color = "#006B3F";
      } else {
        el.textContent = "✗ Les mots de passe ne correspondent pas";
        el.style.color = "#C0392B";
      }
    });
  }
});

function switchAuth(mode, btn) {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("form-connexion").classList.toggle("hidden", mode !== "connexion");
  document.getElementById("form-inscription").classList.toggle("hidden", mode !== "inscription");
  document.getElementById("form-verification").classList.add("hidden");
}

// ── Inscription ──────────────────────────────────────────────────────────────
function sInscrire() {
  const nom = document.getElementById("reg-nom").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (!nom || !email || !password || !confirm) {
    afficherErreur("reg", "Veuillez remplir tous les champs."); return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    afficherErreur("reg", "Adresse email invalide."); return;
  }
  if (password.length < 6) {
    afficherErreur("reg", "Le mot de passe doit contenir au moins 6 caractères."); return;
  }
  if (password !== confirm) {
    afficherErreur("reg", "Les mots de passe ne correspondent pas."); return;
  }

  // Récupérer les comptes existants
  let comptes = [];
  try {
    comptes = JSON.parse(localStorage.getItem("btc-comptes") || "[]");
  } catch(e) {
    comptes = [];
  }

  // Vérifier si email déjà utilisé
  if (comptes.find(c => c.email === email)) {
    afficherErreur("reg", "Cet email est déjà utilisé."); return;
  }

  // Si EmailJS configuré → envoyer code
  if (EMAILJS_PUBLIC_KEY !== "VOTRE_PUBLIC_KEY") {
    codeConfirmation = Math.floor(100000 + Math.random() * 900000).toString();
    codeExpiration = Date.now() + 10 * 60 * 1000;
    pendingUser = { nom, email, password };

    const btn = document.querySelector("#form-inscription .btn-primary");
    btn.textContent = "Envoi en cours...";
    btn.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      nom, email, code: codeConfirmation,
    }).then(() => {
      btn.textContent = "Créer mon compte →";
      btn.disabled = false;
      afficherVerification(email);
    }).catch(() => {
      btn.textContent = "Créer mon compte →";
      btn.disabled = false;
      // Si EmailJS échoue → créer le compte directement
      creerCompte(nom, email, password);
    });
  } else {
    // Pas de EmailJS configuré → créer directement
    creerCompte(nom, email, password);
  }
}

function creerCompte(nom, email, password) {
  let comptes = [];
  try {
    comptes = JSON.parse(localStorage.getItem("btc-comptes") || "[]");
  } catch(e) {
    comptes = [];
  }

  const user = { nom, email, password, createdAt: new Date().toISOString() };
  comptes.push(user);

  localStorage.setItem("btc-comptes", JSON.stringify(comptes));
  localStorage.setItem("btc-user", JSON.stringify({ nom, email }));

  document.getElementById("auth-screen").classList.add("hidden");
  mettreAJourNavbar({ nom, email });
}

function afficherVerification(email) {
  document.getElementById("form-inscription").classList.add("hidden");
  document.getElementById("form-connexion").classList.add("hidden");
  document.getElementById("form-verification").classList.remove("hidden");
  document.getElementById("verif-email-display").textContent = email;

  // Démarrer le compte à rebours
  let secondes = 600;
  const timer = setInterval(() => {
    secondes--;
    const min = Math.floor(secondes / 60);
    const sec = secondes % 60;
    const el = document.getElementById("verif-timer");
    if (el) el.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
    if (secondes <= 0) {
      clearInterval(timer);
      if (el) el.textContent = "Expiré";
    }
  }, 1000);
}

function verifierCode() {
  const code = document.getElementById("verif-code").value.trim();

  if (!code) {
    afficherErreur("verif", "Entrez le code reçu par email."); return;
  }
  if (Date.now() > codeExpiration) {
    afficherErreur("verif", "Code expiré. Recommencez l'inscription."); return;
  }
  if (code !== codeConfirmation) {
    afficherErreur("verif", "Code incorrect. Vérifiez votre email."); return;
  }

  // Code correct — créer le compte
  const comptes = JSON.parse(localStorage.getItem("btc-comptes") || "[]");
  comptes.push({ ...pendingUser, createdAt: new Date().toISOString() });
  localStorage.setItem("btc-comptes", JSON.stringify(comptes));
  localStorage.setItem("btc-user", JSON.stringify({ nom: pendingUser.nom, email: pendingUser.email }));

  document.getElementById("auth-screen").classList.add("hidden");
  mettreAJourNavbar({ nom: pendingUser.nom });

  codeConfirmation = null;
  pendingUser = null;
}

function renvoyerCode() {
  if (!pendingUser) return;
  codeConfirmation = Math.floor(100000 + Math.random() * 900000).toString();
  codeExpiration = Date.now() + 10 * 60 * 1000;

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    nom: pendingUser.nom,
    email: pendingUser.email,
    code: codeConfirmation,
  }).then(() => {
    afficherSucces("verif", "Nouveau code envoyé !");
  });
}

// ── Connexion ────────────────────────────────────────────────────────────────
function seConnecter() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    afficherErreur("login", "Veuillez remplir tous les champs."); return;
  }

  let comptes = [];
  try {
    comptes = JSON.parse(localStorage.getItem("btc-comptes") || "[]");
  } catch(e) {
    comptes = [];
  }

  // Vérifier email
  const emailExiste = comptes.find(c => c.email === email);
  if (!emailExiste) {
    afficherErreur("login", "Aucun compte trouvé avec cette adresse email."); return;
  }

  // Vérifier mot de passe
  const user = comptes.find(c => c.email === email && c.password === password);
  if (!user) {
    afficherErreur("login", "Mot de passe incorrect."); return;
  }

  localStorage.setItem("btc-user", JSON.stringify({ nom: user.nom, email: user.email }));
  document.getElementById("auth-screen").classList.add("hidden");
  mettreAJourNavbar(user);
}

// ── MOT DE PASSE OUBLIÉ ──────────────────────────────────────────────────────
let resetCode = null;
let resetExpiration = null;
let resetEmail = null;

function afficherOublie() {
  document.getElementById("form-connexion").classList.add("hidden");
  document.getElementById("form-inscription").classList.add("hidden");
  document.getElementById("form-verification").classList.add("hidden");
  document.getElementById("form-reset").classList.add("hidden");
  document.getElementById("form-oublie").classList.remove("hidden");
}

function envoyerCodeReset() {
  const email = document.getElementById("oublie-email").value.trim();

  if (!email) {
    afficherErreur("oublie", "Veuillez entrer votre adresse email."); return;
  }

  // Vérifier si l'email existe
  let comptes = [];
  try {
    comptes = JSON.parse(localStorage.getItem("btc-comptes") || "[]");
  } catch(e) { comptes = []; }

  const userExiste = comptes.find(c => c.email === email);
  if (!userExiste) {
    afficherErreur("oublie", "Aucun compte trouvé avec cette adresse email."); return;
  }

  // Générer le code
  resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  resetExpiration = Date.now() + 10 * 60 * 1000;
  resetEmail = email;

  // Si EmailJS configuré → envoyer email
  if (EMAILJS_PUBLIC_KEY !== "VOTRE_PUBLIC_KEY") {
    const btn = document.querySelector("#form-oublie .btn-primary");
    btn.textContent = "Envoi en cours...";
    btn.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      nom: userExiste.nom,
      email: email,
      code: resetCode,
    }).then(() => {
      btn.textContent = "Envoyer le code →";
      btn.disabled = false;
      afficherFormulaireReset(email);
    }).catch(() => {
      btn.textContent = "Envoyer le code →";
      btn.disabled = false;
      // Si EmailJS pas configuré → afficher le code directement (mode dev)
      alert("Code de réinitialisation (mode dev) : " + resetCode);
      afficherFormulaireReset(email);
    });
  } else {
    // Mode dev sans EmailJS
    alert("Code de réinitialisation (mode dev) : " + resetCode);
    afficherFormulaireReset(email);
  }
}

function afficherFormulaireReset(email) {
  document.getElementById("form-oublie").classList.add("hidden");
  document.getElementById("form-reset").classList.remove("hidden");

  // Indicateur force mot de passe
  const pwd = document.getElementById("reset-password");
  const confirm = document.getElementById("reset-confirm");

  pwd.addEventListener("input", () => {
    const el = document.getElementById("reset-strength");
    const v = pwd.value;
    if (v.length === 0) { el.textContent = ""; return; }
    if (v.length < 6) { el.textContent = "⚠️ Trop court"; el.style.color = "#C0392B"; }
    else if (v.length < 10) { el.textContent = "✓ Correct"; el.style.color = "#E8A020"; }
    else { el.textContent = "✓✓ Fort"; el.style.color = "#006B3F"; }
  });

  confirm.addEventListener("input", () => {
    const el = document.getElementById("reset-match");
    if (confirm.value.length === 0) { el.textContent = ""; return; }
    if (confirm.value === pwd.value) {
      el.textContent = "✓ Les mots de passe correspondent";
      el.style.color = "#006B3F";
    } else {
      el.textContent = "✗ Ne correspondent pas";
      el.style.color = "#C0392B";
    }
  });
}

function reinitialiserMotDePasse() {
  const code = document.getElementById("reset-code").value.trim();
  const newPassword = document.getElementById("reset-password").value;
  const confirm = document.getElementById("reset-confirm").value;

  if (!code) {
    afficherErreur("reset", "Entrez le code reçu par email."); return;
  }
  if (Date.now() > resetExpiration) {
    afficherErreur("reset", "Code expiré. Recommencez."); return;
  }
  if (code !== resetCode) {
    afficherErreur("reset", "Code incorrect."); return;
  }
  if (newPassword.length < 6) {
    afficherErreur("reset", "Le mot de passe doit contenir au moins 6 caractères."); return;
  }
  if (newPassword !== confirm) {
    afficherErreur("reset", "Les mots de passe ne correspondent pas."); return;
  }

  // Mettre à jour le mot de passe
  let comptes = [];
  try {
    comptes = JSON.parse(localStorage.getItem("btc-comptes") || "[]");
  } catch(e) { comptes = []; }

  const index = comptes.findIndex(c => c.email === resetEmail);
  if (index !== -1) {
    comptes[index].password = newPassword;
    localStorage.setItem("btc-comptes", JSON.stringify(comptes));
  }

  afficherSucces("reset", "Mot de passe modifié avec succès !");

  // Rediriger vers connexion après 2 secondes
  setTimeout(() => {
    document.getElementById("form-reset").classList.add("hidden");
    document.getElementById("form-connexion").classList.remove("hidden");
    document.querySelectorAll(".auth-tab")[0].classList.add("active");
    document.querySelectorAll(".auth-tab")[1].classList.remove("active");
    document.getElementById("login-email").value = resetEmail;
    resetCode = null;
    resetEmail = null;
  }, 2000);
}

function verifierAuth() {
  let user = null;
  try {
    const data = localStorage.getItem("btc-user");
    if (data && data !== "null" && data !== "undefined") {
      user = JSON.parse(data);
    }
  } catch(e) {
    user = null;
    localStorage.removeItem("btc-user");
  }

  const authScreen = document.getElementById("auth-screen");

  if (!user || !user.email || !user.nom) {
    authScreen.classList.remove("hidden");
  } else {
    authScreen.classList.add("hidden");
    mettreAJourNavbar(user);
  }
}

function seDeconnecter() {
  if (confirm("Voulez-vous vous déconnecter ?")) {
    localStorage.removeItem("btc-user");
    document.getElementById("auth-screen").classList.remove("hidden");
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("nav-avatar").textContent = "?";
    document.getElementById("nav-nom").textContent = "";
    document.getElementById("form-connexion").classList.remove("hidden");
    document.getElementById("form-inscription").classList.add("hidden");
    document.getElementById("form-verification").classList.add("hidden");
    document.querySelectorAll(".auth-tab")[0].classList.add("active");
    document.querySelectorAll(".auth-tab")[1].classList.remove("active");
  }
}


// ── Helpers ──────────────────────────────────────────────────────────────────
function mettreAJourNavbar(user) {
  const initiales = user.nom.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  document.getElementById("nav-avatar").textContent = initiales;
  document.getElementById("nav-nom").textContent = user.nom.split(" ")[0];
}

function afficherErreur(prefix, msg) {
  let el = document.getElementById(prefix + "-erreur");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 4000);
}

function afficherSucces(prefix, msg) {
  let el = document.getElementById(prefix + "-succes");
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 4000);
}

verifierAuth();
// Vérifier au chargement
verifierAuth();
// ── Affichage des lignes ─────────────────────────────────────────────────────
// ── Géolocalisation ──────────────────────────────────────────────────────────
function stationsProches() {
  if (!navigator.geolocation) {
    alert("La géolocalisation n'est pas supportée par votre navigateur.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    // Calculer la distance entre 2 points GPS (formule Haversine)
    function distance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    // Trouver les 3 stations les plus proches
    const stationsAvecDistance = Object.entries(stationsGPS).map(([nom, coords]) => ({
      nom,
      distance: distance(latitude, longitude, coords[0], coords[1])
    }));

    stationsAvecDistance.sort((a, b) => a.distance - b.distance);
    const top3 = stationsAvecDistance.slice(0, 3);

    // Afficher une alerte avec les résultats
    const message = top3.map((s, i) =>
      `${i + 1}. ${s.nom} — ${(s.distance * 1000).toFixed(0)} m`
    ).join("\n");

    alert("Stations les plus proches :\n\n" + message);

  }, () => {
    alert("Impossible d'accéder à votre position.");
  });
}

// ── MÉTÉO ────────────────────────────────────────────────────────────────────
async function chargerMeteo() {
  try {
    // Open-Meteo : gratuit, aucune clé API requise
    // Coordonnées d'Alger : 36.737, 3.086
    const url = "https://api.open-meteo.com/v1/forecast?latitude=36.737&longitude=3.086&current=temperature_2m,weathercode,windspeed_10m&timezone=Africa%2FAlgiers";

    const res = await fetch(url);
    const data = await res.json();

    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weathercode;
    const vent = Math.round(data.current.windspeed_10m);

    // Interpréter le code météo WMO
    let icon, description, conseil;

    if (code === 0) {
      icon = "☀️"; description = "Ciel dégagé";
      conseil = "☀️ Beau temps — tous les transports circulent normalement";
    } else if (code <= 2) {
      icon = "⛅"; description = "Partiellement nuageux";
      conseil = "⛅ Temps nuageux — trafic normal sur toutes les lignes";
    } else if (code === 3) {
      icon = "☁️"; description = "Couvert";
      conseil = "☁️ Ciel couvert — trafic normal, pensez à votre veste";
    } else if (code <= 49) {
      icon = "🌫️"; description = "Brouillard";
      conseil = "🌫️ Visibilité réduite — métro et tramway recommandés";
    } else if (code <= 59) {
      icon = "🌦️"; description = "Bruine";
      conseil = "🌦️ Bruine — privilégiez le métro ou le tramway";
    } else if (code <= 69) {
      icon = "🌧️"; description = "Pluie";
      conseil = "🌧️ Il pleut — privilégiez le métro, évitez les bus";
    } else if (code <= 79) {
      icon = "❄️"; description = "Neige";
      conseil = "❄️ Neige — restez en sécurité, prenez le métro";
    } else if (code <= 84) {
      icon = "🌧️"; description = "Averses";
      conseil = "🌧️ Averses — le métro et tramway sont vos meilleurs alliés";
    } else if (code <= 99) {
      icon = "⛈️"; description = "Orage";
      conseil = "⛈️ Orage — évitez de sortir, prenez le métro absolument";
    } else {
      icon = "🌤️"; description = "Variable";
      conseil = "🌤️ Temps variable — trafic normal";
    }

    // Ajouter info vent si fort
    if (vent > 40) {
      conseil += ` — ⚠️ Vent fort (${vent} km/h)`;
    }

    // Mettre à jour l'affichage
    document.getElementById("meteo-icon").textContent = icon;
    document.getElementById("meteo-temp").textContent = `${temp}°C — ${description}`;
    document.getElementById("meteo-conseil").textContent = conseil;

  } catch(e) {
    // Fallback selon l'heure si pas de connexion
    const heure = new Date().getHours();
    let icon, conseil, temp;

    if (heure >= 6 && heure < 12) {
      icon = "🌤️"; temp = "18°C";
      conseil = "🌤️ Matinée agréable — trafic normal sur toutes les lignes";
    } else if (heure >= 12 && heure < 18) {
      icon = "☀️"; temp = "24°C";
      conseil = "☀️ Beau temps — tous les transports circulent normalement";
    } else if (heure >= 18 && heure < 21) {
      icon = "🌆"; temp = "20°C";
      conseil = "🌆 Heure de pointe — le métro est plus rapide que le bus";
    } else {
      icon = "🌙"; temp = "16°C";
      conseil = "🌙 Soirée fraîche — derniers départs dans 1h";
    }

    document.getElementById("meteo-icon").textContent = icon;
    document.getElementById("meteo-temp").textContent = temp + " — Alger";
    document.getElementById("meteo-conseil").textContent = conseil;
  }
}

chargerMeteo();

function afficherLignes(filtre = "tous") {
  const container = document.getElementById("lignes-container");
  container.innerHTML = "";

  const lignesFiltrees = filtre === "tous"
    ? lignes
    : lignes.filter(l => l.type === filtre);

  lignesFiltrees.forEach(ligne => {
    const statusLabel = { ok: "Trafic normal", warn: "Perturbé", err: "Interrompu" };
    const stationsAffichees = ligne.stations.slice(0, 4);
    const reste = ligne.stations.length - 4;

    const card = document.createElement("div");
    card.className = "ligne-card";
    card.style.setProperty("--ligne-color", ligne.couleur);

    card.innerHTML = `
      <div class="ligne-card-header">
        <div class="ligne-badge" style="background:${ligne.couleur}">${ligne.id}</div>
        <div class="ligne-info">
          <h3>${ligne.nom}</h3>
          <p>${ligne.terminus}</p>
        </div>
        <span class="ligne-status status-${ligne.status}">${statusLabel[ligne.status]}</span>
      </div>
      <div class="stations-preview">
        ${stationsAffichees.map(s => `<span class="station-chip">${s}</span>`).join("")}
        ${reste > 0 ? `<span class="station-chip more">+${reste} stations</span>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}

// ── Affichage des horaires ───────────────────────────────────────────────────
function afficherHoraires() {
  const container = document.getElementById("horaires-container");
  container.innerHTML = "";

  lignes.filter(l => l.status !== "err").slice(0, 4).forEach(ligne => {
    const div = document.createElement("div");
    div.className = "horaire-card";
    div.innerHTML = `
      <div class="horaire-header">
        <div class="ligne-badge" style="background:${ligne.couleur}; width:36px; height:36px; font-size:12px; border-radius:9px;">${ligne.id}</div>
        <div>
          <div style="font-weight:600; font-size:14px;">${ligne.nom}</div>
          <div style="font-size:12px; color:var(--muted);">Prochain passage</div>
        </div>
      </div>
      <div class="horaire-times">
        <span class="time-chip time-next">${ligne.horaires[0]}</span>
        <span class="time-chip time-after">${ligne.horaires[1]}</span>
        <span class="time-chip time-later">${ligne.horaires[2]}</span>
      </div>
      <div class="horaire-direction">${ligne.direction}</div>
    `;
    container.appendChild(div);
  });
}

// ── Remplir le datalist pour l'autocomplétion ────────────────────────────────
function remplirStations() {
  const datalist = document.getElementById("stations-list");
  const toutesStations = [...new Set(lignes.flatMap(l => l.stations))];
  toutesStations.forEach(s => {
    const option = document.createElement("option");
    option.value = s;
    datalist.appendChild(option);
  });
}

// ── Filtre des lignes ────────────────────────────────────────────────────────
function filtrer(type, btn) {
  document.querySelectorAll(".filtre-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  afficherLignes(type);
}


// ── Swap départ / arrivée ────────────────────────────────────────────────────
function swapStations() {
  const dep = document.getElementById("depart");
  const arr = document.getElementById("arrivee");
  const tmp = dep.value;
  dep.value = arr.value;
  arr.value = tmp;
}

// ── Graphe du réseau (BFS) ───────────────────────────────────────────────────
function construireGraphe() {
  const graphe = {};

  lignes.forEach(ligne => {
    ligne.stations.forEach((station, index) => {
      if (!graphe[station]) graphe[station] = [];

      if (index > 0) {
        const voisin = ligne.stations[index - 1];
        if (!graphe[station].find(v => v.station === voisin)) {
          graphe[station].push({ station: voisin, ligne: ligne });
        }
      }
      if (index < ligne.stations.length - 1) {
        const voisin = ligne.stations[index + 1];
        if (!graphe[station].find(v => v.station === voisin)) {
          graphe[station].push({ station: voisin, ligne: ligne });
        }
      }
    });
  });

  return graphe;
}

function bfs(graphe, depart, arrivee) {
  if (!graphe[depart] || !graphe[arrivee]) return null;

  const visite = new Set();
  const file = [[{ station: depart, ligne: null }]];
  visite.add(depart);

  while (file.length > 0) {
    const chemin = file.shift();
    const derniere = chemin[chemin.length - 1];

    if (derniere.station === arrivee) return chemin;

    const voisins = graphe[derniere.station] || [];
    voisins.forEach(voisin => {
      if (!visite.has(voisin.station)) {
        visite.add(voisin.station);
        file.push([...chemin, voisin]);
      }
    });
  }

  return null;
}

// ── Graphe du réseau (BFS) ───────────────────────────────────────────────────
function construireGraphe() {
  const graphe = {};

  lignes.forEach(ligne => {
    ligne.stations.forEach((station, index) => {
      if (!graphe[station]) graphe[station] = [];

      // Relier chaque station à sa voisine suivante et précédente
      if (index > 0) {
        const voisin = ligne.stations[index - 1];
        if (!graphe[station].find(v => v.station === voisin)) {
          graphe[station].push({ station: voisin, ligne: ligne });
        }
      }
      if (index < ligne.stations.length - 1) {
        const voisin = ligne.stations[index + 1];
        if (!graphe[station].find(v => v.station === voisin)) {
          graphe[station].push({ station: voisin, ligne: ligne });
        }
      }
    });
  });

  return graphe;
}

function bfs(graphe, depart, arrivee) {
  if (!graphe[depart] || !graphe[arrivee]) return null;

  const visite = new Set();
  const file = [[{ station: depart, ligne: null }]];
  visite.add(depart);

  while (file.length > 0) {
    const chemin = file.shift();
    const derniere = chemin[chemin.length - 1];

    if (derniere.station === arrivee) return chemin;

    const voisins = graphe[derniere.station] || [];
    voisins.forEach(voisin => {
      if (!visite.has(voisin.station)) {
        visite.add(voisin.station);
        file.push([...chemin, voisin]);
      }
    });
  }

  return null;
}

function calculerItineraire() {
  const depart = document.getElementById("depart").value.trim();
  const arrivee = document.getElementById("arrivee").value.trim();
  const resultDiv = document.getElementById("itin-result");

  if (!depart || !arrivee) {
    alert("Veuillez remplir les deux champs.");
    return;
  }
  if (depart === arrivee) {
    alert("Le départ et l'arrivée sont identiques.");
    return;
  }

  const graphe = construireGraphe();
  const chemin = bfs(graphe, depart, arrivee);

  resultDiv.classList.remove("hidden");

  if (!chemin) {
    resultDiv.innerHTML = `
      <p style="color:var(--muted); font-size:14px;">
        Aucun itinéraire trouvé. Vérifiez les noms des stations.
      </p>
    `;
    return;
  }

  // Regrouper les étapes par ligne
  const etapes = [];
  let etapeActuelle = null;

  chemin.forEach((noeud, i) => {
    if (i === 0) return;
    const ligneId = noeud.ligne?.id;

    if (!etapeActuelle || etapeActuelle.ligneId !== ligneId) {
      if (etapeActuelle) etapes.push(etapeActuelle);
      etapeActuelle = {
        ligneId,
        ligne: noeud.ligne,
        debut: chemin[i - 1].station,
        fin: noeud.station,
        nbStations: 1,
      };
    } else {
      etapeActuelle.fin = noeud.station;
      etapeActuelle.nbStations++;
    }
  });
  if (etapeActuelle) etapes.push(etapeActuelle);

  // Calculer la durée totale (2 min par station + 5 min par correspondance)
  const nbStationsTotal = chemin.length - 1;
  const nbCorrespondances = etapes.length - 1;
  const duree = nbStationsTotal * 2 + nbCorrespondances * 5 + 2;

  // Construire l'affichage
  let html = `<div class="itin-duration">${duree} min · ${nbStationsTotal} station${nbStationsTotal > 1 ? "s" : ""}</div>`;

  etapes.forEach((etape, i) => {
    const couleur = etape.ligne?.couleur || "#888";
    const id = etape.ligneId || "?";

    html += `
      <div class="itin-step">
        <div class="itin-step-icon" style="background:${couleur}">${id}</div>
        <div>
          <span style="font-weight:600;">${etape.ligne?.nom || "Ligne"}</span><br>
          <span style="font-size:12px; color:var(--muted);">
            ${etape.debut} → ${etape.fin}
            (${etape.nbStations} station${etape.nbStations > 1 ? "s" : ""})
          </span>
        </div>
      </div>
    `;

    if (i < etapes.length - 1) {
      html += `
        <div class="itin-step">
          <div class="itin-step-icon" style="background:#888; font-size:16px;">⇄</div>
          <span style="font-size:13px; color:var(--muted);">Correspondance à <b>${etape.fin}</b></span>
        </div>
      `;
    }
  });

  html += `
    <div class="itin-step" style="margin-top:8px;">
      <div class="itin-step-icon" style="background:var(--metro);">✓</div>
      <span>Arrivée à <b>${arrivee}</b></span>
    </div>
  `;

  resultDiv.innerHTML = html;
}

// ── Carte Leaflet ────────────────────────────────────────────────────────────
const stationsGPS = {
  "Haï Bainem":             [36.7720, 3.0120],
  "Aïn Naâdja":             [36.7180, 3.0890],
  "Bachdjerrah 2":          [36.7250, 3.1020],
  "Bachdjerrah 1":          [36.7290, 3.0980],
  "El Harrach Centre":      [36.7190, 3.1150],
  "El Harrach Gare":        [36.7170, 3.1180],
  "Les Fusillés":           [36.7380, 3.0980],
  "Hamma":                  [36.7580, 3.0730],
  "Khelifa Boukhalfa":      [36.7620, 3.0620],
  "Tafourah Grande Poste":  [36.7730, 3.0590],
  "Université":             [36.7680, 3.0540],
  "Place du 1er Mai":       [36.7640, 3.0620],
  "Réparation":             [36.7560, 3.0780],
  "Bourouba":               [36.7310, 3.1050],
  "Place des Martyrs":      [36.7800, 3.0620],
  "Les Bananiers":          [36.7420, 3.1320],
  "Mohammadia":             [36.7480, 3.1180],
  "Ruisseau":               [36.7530, 3.1050],
  "Palais de la Culture":   [36.7690, 3.0680],
  "Dergana":                [36.7390, 3.1260],
  "Bordj El Kiffan":        [36.7360, 3.1340],
  "Bab Ezzouar":            [36.7280, 3.1520],
};

function initCarte() {
  const map = L.map("map", { zoomControl: true }).setView([36.752, 3.085], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map);

  lignes.forEach(ligne => {
    const coordsLigne = ligne.stations
      .filter(s => stationsGPS[s])
      .map(s => stationsGPS[s]);

    if (coordsLigne.length > 1) {
      L.polyline(coordsLigne, {
        color: ligne.couleur,
        weight: 5,
        opacity: 0.85,
        lineJoin: "round",
      }).addTo(map);
    }

    ligne.stations.forEach(station => {
      const coords = stationsGPS[station];
      if (!coords) return;

      const marker = L.circleMarker(coords, {
        radius: 7,
        fillColor: "white",
        color: ligne.couleur,
        weight: 3,
        opacity: 1,
        fillOpacity: 1,
      }).addTo(map);

      marker.bindPopup(`
        <div class="popup-title">${station}</div>
        <div class="popup-ligne">${ligne.nom}</div>
        <div class="popup-times">
          <span class="popup-chip" style="background:${ligne.couleur}">${ligne.horaires[0]}</span>
          <span class="popup-chip" style="background:${ligne.couleur}88">${ligne.horaires[1]}</span>
          <span class="popup-chip" style="background:${ligne.couleur}55; color:#333">${ligne.horaires[2]}</span>
        </div>
      `, { maxWidth: 220 });
    });
  });
}

// ── Initialisation ───────────────────────────────────────────────────────────
afficherLignes();
afficherHoraires();
remplirStations();
initCarte();

// ── BILLETTERIE ─────────────────────────────────────────────────────────────
const PRIX = { simple: 50, "aller-retour": 90, carnet: 400, mensuel: 2500 };
const LABELS = { simple: "Billet Simple", "aller-retour": "Aller-Retour", carnet: "Carnet x10", mensuel: "Abonnement Mensuel" };
let typeBillet = "simple";
let quantite = 1;
let billets = JSON.parse(localStorage.getItem("billets") || "[]");

function selectType(el, type) {
  document.querySelectorAll(".type-option").forEach(o => o.classList.remove("active"));
  el.classList.add("active");
  typeBillet = type;
  majTotal();
}

function changerQte(delta) {
  quantite = Math.max(1, Math.min(10, quantite + delta));
  document.getElementById("quantite").textContent = quantite;
  majTotal();
}

function majTotal() {
  const total = PRIX[typeBillet] * quantite;
  document.getElementById("total-prix").textContent = total + " DA";
}

function ouvrirPaiement() {
  const nom = document.getElementById("nom-voyageur").value.trim();
  const ligne = document.getElementById("ligne-billet").value;
  const date = document.getElementById("date-voyage").value;

  if (!nom || !ligne || !date) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // Remplir le récap
  document.getElementById("recap-type").textContent = LABELS[typeBillet];
  document.getElementById("recap-ligne").textContent = ligne;
  document.getElementById("recap-date").textContent = new Date(date).toLocaleDateString("fr-DZ");
  document.getElementById("recap-total").textContent = (PRIX[typeBillet] * quantite) + " DA";

  document.getElementById("modal-paiement").classList.remove("hidden");
}

function confirmerPaiement() {
  const num = document.getElementById("baridi-num").value.trim();
  const pin = document.getElementById("baridi-pin").value.trim();

  if (!num || num.length < 10) {
    alert("Numéro Baridi Mob invalide.");
    return;
  }
  if (!pin || pin.length < 4) {
    alert("Code PIN invalide.");
    return;
  }

  // Simuler un traitement
  const btn = document.querySelector("#modal-paiement .btn-primary");
  btn.textContent = "Traitement en cours...";
  btn.disabled = true;

  setTimeout(() => {
    fermerModal("modal-paiement");
    btn.textContent = "Confirmer le paiement";
    btn.disabled = false;

    // Créer le billet
    const billet = {
      id: "BTC-" + Date.now(),
      type: typeBillet,
      label: LABELS[typeBillet],
      ligne: document.getElementById("ligne-billet").value,
      nom: document.getElementById("nom-voyageur").value.trim(),
      date: document.getElementById("date-voyage").value,
      prix: PRIX[typeBillet] * quantite,
      quantite: quantite,
      timestamp: new Date().toISOString(),
    };

    billets.unshift(billet);
    localStorage.setItem("billets", JSON.stringify(billets));

    afficherMesBillets();
    afficherQR(billet);
  }, 1800);
}

function afficherQR(billet) {
  document.getElementById("modal-qr").classList.remove("hidden");

  // Données encodées dans le QR
  const qrData = JSON.stringify({
    id: billet.id,
    nom: billet.nom,
    ligne: billet.ligne,
    type: billet.label,
    date: billet.date,
    valide: true,
  });

  // Générer le QR code
  const canvas = document.getElementById("qr-canvas");
  canvas.innerHTML = "";

  new QRCode(canvas, {
    text: qrData,
    width: 200,
    height: 200,
    colorDark: "#006B3F",
    colorLight: "#FFFFFF",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Détails du billet
  document.getElementById("billet-details").innerHTML = `
    <div><span>Référence</span><span>${billet.id}</span></div>
    <div><span>Voyageur</span><span>${billet.nom}</span></div>
    <div><span>Ligne</span><span>${billet.ligne}</span></div>
    <div><span>Type</span><span>${billet.label}</span></div>
    <div><span>Date</span><span>${new Date(billet.date).toLocaleDateString("fr-DZ")}</span></div>
    <div><span>Montant payé</span><span>${billet.prix} DA</span></div>
  `;
}

function afficherMesBillets() {
  const container = document.getElementById("mes-billets-list");

  if (billets.length === 0) {
    container.innerHTML = `
      <div class="billets-empty">
        <span>🎫</span>
        <p>Aucun billet acheté pour l'instant</p>
      </div>
    `;
    return;
  }

  container.innerHTML = billets.map(b => `
    <div class="billet-item" onclick='afficherQR(${JSON.stringify(b)})'>
      <div class="billet-item-icon" style="background:var(--metro-light)">🎫</div>
      <div class="billet-item-info">
        <div class="billet-item-titre">${b.label} — ${b.ligne}</div>
        <div class="billet-item-sub">${b.nom} · ${new Date(b.date).toLocaleDateString("fr-DZ")}</div>
      </div>
      <span class="billet-item-badge">${b.prix} DA</span>
    </div>
  `).join("");
}

function fermerModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// Fermer modal en cliquant dehors
document.addEventListener("click", e => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.add("hidden");
  }
});

// Initialiser les billets sauvegardés
afficherMesBillets();

// Date minimum = aujourd'hui
const today = new Date().toISOString().split("T")[0];
document.getElementById("date-voyage").min = today;
document.getElementById("date-voyage").value = today;
majTotal();