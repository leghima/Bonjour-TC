const API = "https://bonjour-tc-backend-production.up.railway.app/api";

// ── Calcul automatique des prochains passages ────────────────────────────────
function calculerProchainPassage(freqPointe, freqNormale) {
  const maintenant = new Date();
  const heure = maintenant.getHours();
  const minutes = maintenant.getMinutes();

  // Heures de pointe : 7h-9h et 17h-19h
  const estPointe = (heure >= 7 && heure <= 9) || (heure >= 17 && heure <= 19);
  const freq = estPointe ? freqPointe : freqNormale;

  // Calculer les 3 prochains passages
  const minutesEcoulees = minutes % freq;
  const prochainDans = freq - minutesEcoulees;
  const deuxiemeDans = prochainDans + freq;
  const troisiemeDans = prochainDans + freq * 2;

  return [
    prochainDans + " min",
    deuxiemeDans + " min",
    troisiemeDans + " min"
  ];
}
 
const lignes = [
  // ── MÉTRO ──────────────────────────────────────────────────────────────────
  {
    id: "M1", type: "metro", nom: "Métro Ligne 1",
    couleur: "#006B3F", status: "ok",
    terminus: "Haï Bainem ↔ Place des Martyrs",
    horaire_debut: "05:30", horaire_fin: "22:30",
    frequence_pointe: "5 min", frequence_normale: "10 min",
    stations: [
      "Haï Bainem",
      "Aïn Naâdja",
      "Bachdjerrah 2",
      "Bachdjerrah 1",
      "El Harrach Centre",
      "El Harrach Gare",
      "Les Fusillés",
      "Hamma",
      "Khelifa Boukhalfa",
      "Tafourah Grande Poste",
      "Université",
      "Place du 1er Mai",
      "Réparation",
      "Bourouba",
      "Place des Martyrs"
    ],
    horaires: calculerProchainPassage(5, 10),
    direction: "Direction → El Harrach"
  },
  {
    id: "M2", type: "metro", nom: "Métro Ligne 2",
    couleur: "#1565C0", status: "ok",
    terminus: "Place du 1er Mai ↔ Aïn Naâdja",
    horaire_debut: "05:45", horaire_fin: "22:15",
    frequence_pointe: "6 min", frequence_normale: "12 min",
    stations: [
      "Place du 1er Mai",
      "Jardin d'Essai",
      "Les Fusillés",
      "Djamaâ El Djazaïr",
      "Aïn Naâdja"
    ],
    horaires: calculerProchainPassage(6, 12),
    direction: "Direction → Aïn Naâdja"
  },
  {
    id: "M3", type: "metro", nom: "Métro Ligne 3",
    couleur: "#6A0DAD", status: "ok",
    terminus: "Alger Centre ↔ Dar El Beïda",
    horaire_debut: "06:00", horaire_fin: "22:00",
    frequence_pointe: "8 min", frequence_normale: "15 min",
    stations: [
      "Alger Centre",
      "Hussein Dey",
      "Dar El Beïda"
    ],
    horaires: calculerProchainPassage(8, 15),
    direction: "Direction → Dar El Beïda"
  },

  // ── TRAMWAY ─────────────────────────────────────────────────────────────────
  {
    id: "T1", type: "tramway", nom: "Tramway Alger",
    couleur: "#E8A020", status: "ok",
    terminus: "Les Bananiers ↔ Bab Ezzouar",
    horaire_debut: "05:30", horaire_fin: "23:00",
    frequence_pointe: "7 min", frequence_normale: "12 min",
    stations: [
      "Les Bananiers",
      "El Mohammadia",
      "Aissat Idir",
      "Ruisseau",
      "Hamma",
      "Tafourah Grande Poste",
      "Palais de la Culture",
      "Ahmed Zabana",
      "Dergana",
      "Bordj El Kiffan Centre",
      "Bordj El Kiffan",
      "Bab Ezzouar Universités",
      "Bab Ezzouar"
    ],
    horaires: calculerProchainPassage(7, 12),
    direction: "Direction → Bab Ezzouar"
  },
  {
    id: "T2", type: "tramway", nom: "Tramway Sétif",
    couleur: "#D4780A", status: "ok",
    terminus: "Sétif Centre ↔ Ain Abessa",
    horaire_debut: "06:00", horaire_fin: "22:00",
    frequence_pointe: "10 min", frequence_normale: "15 min",
    stations: [
      "Sétif Centre",
      "Université Ferhat Abbas",
      "Cité Administratif",
      "El Bez",
      "Ain Abessa"
    ],
    horaires: calculerProchainPassage(10, 15),
    direction: "Direction → Ain Abessa"
  },
  {
    id: "T3", type: "tramway", nom: "Tramway Oran",
    couleur: "#C0610A", status: "ok",
    terminus: "Es Senia ↔ USTO",
    horaire_debut: "06:00", horaire_fin: "22:00",
    frequence_pointe: "8 min", frequence_normale: "15 min",
    stations: [
      "Es Senia",
      "Haï Sabah",
      "Les Amandiers",
      "Oran Centre",
      "Château Neuf",
      "USTO"
    ],
    horaires: calculerProchainPassage(8, 15),
    direction: "Direction → USTO"
  },
  {
    id: "T4", type: "tramway", nom: "Tramway Constantine",
    couleur: "#7B3F00", status: "ok",
    terminus: "Ali Mendjeli ↔ Zouaghi",
    horaire_debut: "06:00", horaire_fin: "22:00",
    frequence_pointe: "10 min", frequence_normale: "18 min",
    stations: [
      "Ali Mendjeli",
      "Bekira",
      "Ibn Badis",
      "Constantine Centre",
      "Zouaghi"
    ],
    horaires: calculerProchainPassage(10, 18),
    direction: "Direction → Zouaghi"
  },

  // ── BUS ETUSA ───────────────────────────────────────────────────────────────
  {
    id: "1", type: "bus", nom: "Bus Ligne 1",
    couleur: "#C0392B", status: "ok",
    terminus: "Place des Martyrs ↔ El Biar",
    horaire_debut: "05:30", horaire_fin: "21:30",
    frequence_pointe: "10 min", frequence_normale: "20 min",
    stations: [
      "Place des Martyrs", "Grande Poste", "Didouche Mourad",
      "Télemly", "El Biar"
    ],
    horaires: calculerProchainPassage(10, 20),
    direction: "Direction → El Biar"
  },
  {
    id: "2", type: "bus", nom: "Bus Ligne 2",
    couleur: "#C0392B", status: "ok",
    terminus: "Hussein Dey ↔ Bab El Oued",
    horaire_debut: "05:30", horaire_fin: "21:30",
    frequence_pointe: "12 min", frequence_normale: "20 min",
    stations: [
      "Hussein Dey", "Hamma", "Grande Poste",
      "Amirouche", "Bab El Oued"
    ],
    horaires: calculerProchainPassage(12, 20),
    direction: "Direction → Bab El Oued"
  },
  {
    id: "3", type: "bus", nom: "Bus Ligne 3",
    couleur: "#C0392B", status: "ok",
    terminus: "Place du 1er Mai ↔ Kouba",
    horaire_debut: "05:45", horaire_fin: "21:00",
    frequence_pointe: "12 min", frequence_normale: "20 min",
    stations: [
      "Place du 1er Mai", "Belouizdad", "Kouba Centre", "Kouba"
    ],
    horaires: calculerProchainPassage(12, 20),
    direction: "Direction → Kouba"
  },
  {
    id: "5", type: "bus", nom: "Bus Ligne 5",
    couleur: "#A93226", status: "ok",
    terminus: "Place Audin ↔ Ben Aknoun",
    horaire_debut: "06:00", horaire_fin: "21:00",
    frequence_pointe: "15 min", frequence_normale: "25 min",
    stations: [
      "Place Audin", "Didouche Mourad", "Hydra", "Ben Aknoun"
    ],
    horaires: calculerProchainPassage(15, 25),
    direction: "Direction → Ben Aknoun"
  },
  {
    id: "11", type: "bus", nom: "Bus Ligne 11",
    couleur: "#A93226", status: "ok",
    terminus: "Grande Poste ↔ Bab Ezzouar",
    horaire_debut: "05:30", horaire_fin: "21:30",
    frequence_pointe: "10 min", frequence_normale: "18 min",
    stations: [
      "Grande Poste", "Hussein Dey", "Dar El Beïda", "Bab Ezzouar"
    ],
    horaires: calculerProchainPassage(10, 18),
    direction: "Direction → Bab Ezzouar"
  },
  {
    id: "21", type: "bus", nom: "Bus Ligne 21",
    couleur: "#A93226", status: "ok",
    terminus: "El Biar ↔ Grande Poste",
    horaire_debut: "05:30", horaire_fin: "21:30",
    frequence_pointe: "10 min", frequence_normale: "20 min",
    stations: [
      "El Biar", "Télemly", "Didouche Mourad", "Grande Poste"
    ],
    horaires: calculerProchainPassage(10, 20),
    direction: "Direction → Grande Poste"
  },
  {
    id: "26", type: "bus", nom: "Bus Ligne 26",
    couleur: "#922B21", status: "ok",
    terminus: "Place des Martyrs ↔ Birtouta",
    horaire_debut: "06:00", horaire_fin: "20:30",
    frequence_pointe: "15 min", frequence_normale: "25 min",
    stations: [
      "Place des Martyrs", "Belouizdad", "Bachdjerrah",
      "Birtouta Centre", "Birtouta"
    ],
    horaires: calculerProchainPassage(15, 25),
    direction: "Direction → Birtouta"
  },
  {
    id: "34", type: "bus", nom: "Bus Ligne 34",
    couleur: "#922B21", status: "warn",
    terminus: "Bab El Oued ↔ Hussein Dey",
    horaire_debut: "05:30", horaire_fin: "21:00",
    frequence_pointe: "12 min", frequence_normale: "20 min",
    stations: [
      "Bab El Oued", "Grande Poste", "Hamma", "Hussein Dey"
    ],
    horaires: calculerProchainPassage(12, 20),
    direction: "Direction → Hussein Dey"
  },
  {
    id: "35", type: "bus", nom: "Bus Ligne 35",
    couleur: "#922B21", status: "ok",
    terminus: "Place du 1er Mai ↔ Bouzaréah",
    horaire_debut: "06:00", horaire_fin: "21:00",
    frequence_pointe: "15 min", frequence_normale: "25 min",
    stations: [
      "Place du 1er Mai", "Grande Poste", "Télemly",
      "El Biar", "Bouzaréah"
    ],
    horaires: calculerProchainPassage(15, 25),
    direction: "Direction → Bouzaréah"
  },
  {
    id: "42", type: "bus", nom: "Bus Ligne 42",
    couleur: "#7B241C", status: "ok",
    terminus: "Grande Poste ↔ Hydra",
    horaire_debut: "06:00", horaire_fin: "21:00",
    frequence_pointe: "12 min", frequence_normale: "20 min",
    stations: [
      "Grande Poste", "Amirouche", "Coopérative El Feth", "Hydra"
    ],
    horaires: calculerProchainPassage(12, 20),
    direction: "Direction → Hydra"
  },
  {
    id: "45", type: "bus", nom: "Bus Ligne 45",
    couleur: "#7B241C", status: "ok",
    terminus: "Place Audin ↔ Dely Ibrahim",
    horaire_debut: "06:00", horaire_fin: "21:00",
    frequence_pointe: "15 min", frequence_normale: "25 min",
    stations: [
      "Place Audin", "Ben Aknoun", "Chéraga", "Dely Ibrahim"
    ],
    horaires: calculerProchainPassage(15, 25),
    direction: "Direction → Dely Ibrahim"
  },
  {
    id: "50", type: "bus", nom: "Bus Ligne 50",
    couleur: "#7B241C", status: "ok",
    terminus: "Grande Poste ↔ Aïn Taya",
    horaire_debut: "05:30", horaire_fin: "20:30",
    frequence_pointe: "20 min", frequence_normale: "30 min",
    stations: [
      "Grande Poste", "Hussein Dey", "Bordj El Kiffan",
      "Rouïba", "Aïn Taya"
    ],
    horaires: calculerProchainPassage(20, 30),
    direction: "Direction → Aïn Taya"
  },
  {
    id: "55", type: "bus", nom: "Bus Ligne 55",
    couleur: "#6E2518", status: "err",
    terminus: "Bir Mourad Raïs ↔ Kouba",
    horaire_debut: "06:00", horaire_fin: "21:00",
    frequence_pointe: "15 min", frequence_normale: "25 min",
    stations: [
      "Bir Mourad Raïs", "Hydra", "Kouba"
    ],
    horaires: ["—", "—", "—"],
    direction: "Service interrompu"
  },
  {
    id: "60", type: "bus", nom: "Bus Ligne 60",
    couleur: "#6E2518", status: "ok",
    terminus: "Place des Martyrs ↔ Douéra",
    horaire_debut: "05:30", horaire_fin: "20:30",
    frequence_pointe: "20 min", frequence_normale: "30 min",
    stations: [
      "Place des Martyrs", "Belouizdad", "Birtouta", "Douéra"
    ],
    horaires: calculerProchainPassage(20, 30),
    direction: "Direction → Douéra"
  },
  {
    id: "66", type: "bus", nom: "Bus Ligne 66",
    couleur: "#6E2518", status: "ok",
    terminus: "Grande Poste ↔ Reghaia",
    horaire_debut: "05:30", horaire_fin: "20:00",
    frequence_pointe: "20 min", frequence_normale: "35 min",
    stations: [
      "Grande Poste", "Hussein Dey", "Rouïba",
      "Reghaïa Centre", "Reghaia"
    ],
    horaires: calculerProchainPassage(20, 35),
    direction: "Direction → Reghaia"
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
async function sInscrire() {
  const nom = document.getElementById("reg-nom").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (!nom || !email || !password || !confirm) {
    afficherErreur("reg", "Veuillez remplir tous les champs."); return;
  }
  if (password !== confirm) {
    afficherErreur("reg", "Les mots de passe ne correspondent pas."); return;
  }

  try {
    const res = await fetch(`${API}/auth/inscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, password }),
    });
    const data = await res.json();
    console.log(data)
    if (!res.ok) { afficherErreur("reg", data.erreur); return; }
    pendingUser = { nom, email, password };
    afficherVerification(email);
  } catch(e) {
    afficherErreur("reg", "Erreur réseau.");
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

async function verifierCode() {
  const code = document.getElementById("verif-code").value.trim();
  const email = pendingUser?.email;

  try {
    const res = await fetch(`${API}/auth/confirmer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (!res.ok) { afficherErreur("verif", data.erreur); return; }
    localStorage.setItem("btc-token", data.token);
    localStorage.setItem("btc-user", JSON.stringify(data.user));
    document.getElementById("auth-screen").classList.add("hidden");
    mettreAJourNavbar(data.user);
  } catch(e) {
    afficherErreur("verif", "Erreur réseau.");
  }
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
  async function seConnecter() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      afficherErreur("login", "Veuillez remplir tous les champs."); return;
    }

    try {
      const res = await fetch(`${API}/auth/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { afficherErreur("login", data.erreur); return; }
      localStorage.setItem("btc-token", data.token);
      localStorage.setItem("btc-user", JSON.stringify({
        id: data.user.id,
        nom: data.user.nom,
        email: data.user.email,
        role: data.user.role || "user"
}));
      document.getElementById("auth-screen").classList.add("hidden");
      mettreAJourNavbar(data.user);
    } catch(e) {
      afficherErreur("login", "Erreur réseau.");
    }
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

  // Afficher le lien admin si l'utilisateur est admin
  if (user.role === "admin") {
    const navAdmin = document.getElementById("nav-admin");
    if (navAdmin) navAdmin.style.display = "block";
  }
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

// Actualiser la météo toutes les 30 minutes
setInterval(chargerMeteo, 30 * 60 * 1000);

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

// ── Carte Leaflet ────────────────────────────────────────────────────────────
let mapInstance = null;
let userMarker = null;
let routeLayer = null;
let userPosition = null;

function initCarte() {
  const map = L.map("map", { zoomControl: true }).setView([36.752, 3.085], 13);
  mapInstance = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 18,
  }).addTo(map);

  // Tracer les lignes et stations
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

      // Au clic sur station → tracer la route depuis position utilisateur
      marker.on("click", () => {
        afficherRouteVersStation(station, coords, ligne);
      });

      marker.bindPopup(`
        <div class="popup-title">${station}</div>
        <div class="popup-ligne">${ligne.nom}</div>
        <div class="popup-times">
          <span class="popup-chip" style="background:${ligne.couleur}">${ligne.horaires[0]}</span>
          <span class="popup-chip" style="background:${ligne.couleur}88">${ligne.horaires[1]}</span>
          <span class="popup-chip" style="background:${ligne.couleur}55;color:#333">${ligne.horaires[2]}</span>
        </div>
        <div style="margin-top:8px;">
          <button onclick="afficherRouteVersStation('${station}', [${coords}], ${JSON.stringify(ligne).replace(/"/g, '&quot;')})"
            style="width:100%;padding:6px;background:#006B3F;color:white;border:none;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">
            📍 Itinéraire depuis ma position
          </button>
        </div>
      `, { maxWidth: 240 });
    });
  });

  // Géolocaliser l'utilisateur automatiquement
  localiserUtilisateur();
}

function localiserUtilisateur() {
  if (!navigator.geolocation) {
    console.log("Géolocalisation non supportée");
    return;
  }

  navigator.geolocation.watchPosition(
    position => {
      const { latitude, longitude } = position.coords;
      userPosition = [latitude, longitude];

      // Supprimer l'ancien marker utilisateur
      if (userMarker) mapInstance.removeLayer(userMarker);

      // Créer un marker animé pour la position utilisateur
      const userIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 20px; height: 20px;
            background: #1565C0;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 0 4px rgba(21,101,192,0.3);
            animation: pulse-map 2s infinite;
          "></div>
          <style>
            @keyframes pulse-map {
              0% { box-shadow: 0 0 0 0 rgba(21,101,192,0.4); }
              70% { box-shadow: 0 0 0 12px rgba(21,101,192,0); }
              100% { box-shadow: 0 0 0 0 rgba(21,101,192,0); }
            }
          </style>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      userMarker = L.marker([latitude, longitude], { icon: userIcon })
        .addTo(mapInstance)
        .bindPopup("<b>📍 Vous êtes ici</b>");

      mapInstance.setView([latitude, longitude], 15);
    },
    error => {
      console.log("Erreur géolocalisation :", error.message);
    },
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
  );
}

async function afficherRouteVersStation(nomStation, coordsStation, ligne) {
  if (!userPosition) {
    alert("Position non disponible. Activez la géolocalisation dans votre navigateur.");
    return;
  }

  // Supprimer l'ancienne route si elle existe
  if (routeLayer) mapInstance.removeLayer(routeLayer);

  const [latUser, lonUser] = userPosition;
  const [latStation, lonStation] = coordsStation;

  try {
    // OSRM — API routing gratuite (à pied)
    const url = `https://router.project-osrm.org/route/v1/foot/${lonUser},${latUser};${lonStation},${latStation}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.code !== "Ok") {
      alert("Impossible de calculer l'itinéraire.");
      return;
    }

    const route = data.routes[0];
    const distanceM = Math.round(route.distance);
    const dureeMin = Math.round(route.duration / 60);
    const geometry = route.geometry;

    // Tracer la route sur la carte
    routeLayer = L.geoJSON(geometry, {
      style: {
        color: "#1565C0",
        weight: 5,
        opacity: 0.8,
        dashArray: "10 6",
        lineJoin: "round",
      }
    }).addTo(mapInstance);

    // Ajuster la vue pour voir toute la route
    mapInstance.fitBounds(routeLayer.getBounds(), { padding: [40, 40] });

    // Afficher un popup sur la station avec le temps
    const distanceTexte = distanceM < 1000
      ? `${distanceM} m`
      : `${(distanceM / 1000).toFixed(1)} km`;

    L.popup()
      .setLatLng(coordsStation)
      .setContent(`
        <div class="popup-title">${nomStation}</div>
        <div class="popup-ligne">${ligne.nom}</div>
        <div style="margin:10px 0;padding:10px;background:#E6F4EE;border-radius:8px;text-align:center;">
          <div style="font-size:22px;font-weight:800;color:#006B3F;font-family:sans-serif;">
            🚶 ${dureeMin} min
          </div>
          <div style="font-size:12px;color:#6B6B6B;margin-top:2px;">
            ${distanceTexte} à pied
          </div>
        </div>
        <div class="popup-times">
          <span class="popup-chip" style="background:${ligne.couleur}">
            Prochain : ${ligne.horaires[0]}
          </span>
        </div>
        <button onclick="supprimerRoute()"
          style="width:100%;margin-top:8px;padding:6px;background:#FDECEC;color:#C0392B;border:1px solid #F09595;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">
          ✕ Supprimer l'itinéraire
        </button>
      `)
      .openOn(mapInstance);

  } catch(e) {
    // Fallback si OSRM indisponible : ligne droite avec distance estimée
    if (routeLayer) mapInstance.removeLayer(routeLayer);

    routeLayer = L.polyline([userPosition, coordsStation], {
      color: "#1565C0",
      weight: 4,
      opacity: 0.7,
      dashArray: "8 5",
    }).addTo(mapInstance);

    mapInstance.fitBounds(routeLayer.getBounds(), { padding: [40, 40] });

    // Calculer distance à vol d'oiseau
    const R = 6371000;
    const dLat = (coordsStation[0] - userPosition[0]) * Math.PI / 180;
    const dLon = (coordsStation[1] - userPosition[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
      Math.cos(userPosition[0]*Math.PI/180) *
      Math.cos(coordsStation[0]*Math.PI/180) *
      Math.sin(dLon/2)**2;
    const distM = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
    const dureeMin = Math.round(distM / 80);

    L.popup()
      .setLatLng(coordsStation)
      .setContent(`
        <div class="popup-title">${nomStation}</div>
        <div class="popup-ligne">${ligne.nom}</div>
        <div style="margin:10px 0;padding:10px;background:#E6F4EE;border-radius:8px;text-align:center;">
          <div style="font-size:22px;font-weight:800;color:#006B3F;">
            🚶 ~${dureeMin} min
          </div>
          <div style="font-size:12px;color:#6B6B6B;margin-top:2px;">
            ${distM < 1000 ? distM + " m" : (distM/1000).toFixed(1) + " km"} à pied
          </div>
        </div>
        <button onclick="supprimerRoute()"
          style="width:100%;margin-top:8px;padding:6px;background:#FDECEC;color:#C0392B;border:1px solid #F09595;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;">
          ✕ Supprimer l'itinéraire
        </button>
      `)
      .openOn(mapInstance);
  }
}

function supprimerRoute() {
  if (routeLayer) {
    mapInstance.removeLayer(routeLayer);
    routeLayer = null;
  }
  mapInstance.closePopup();
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

async function confirmerPaiement() {
  const num = document.getElementById("baridi-num").value.trim();
  const pin = document.getElementById("baridi-pin").value.trim();

  if (!num || num.length < 10) { alert("Numéro Baridi Mob invalide."); return; }
  if (!pin || pin.length < 4) { alert("Code PIN invalide."); return; }

  const token = localStorage.getItem("btc-token");
  const btn = document.querySelector("#modal-paiement .btn-primary");
  btn.textContent = "Traitement en cours...";
  btn.disabled = true;

  try {
    const res = await fetch(`${API}/billets/acheter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: typeBillet,
        ligne: document.getElementById("ligne-billet").value,
        date: document.getElementById("date-voyage").value,
        quantite,
        prix: PRIX[typeBillet] * quantite,
      }),
    });
    const data = await res.json();
    btn.textContent = "Confirmer le paiement";
    btn.disabled = false;
    if (!res.ok) { alert(data.erreur); return; }
    fermerModal("modal-paiement");
    afficherQR(data.billet);
    chargerMesBillets();
  } catch(e) {
    btn.textContent = "Confirmer le paiement";
    btn.disabled = false;
    alert("Erreur réseau.");
  }
}

async function chargerMesBillets() {
  const token = localStorage.getItem("btc-token");
  if (!token) return;

  try {
    const res = await fetch(`${API}/billets/mes-billets`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.billets) {
      billets = data.billets;
      afficherMesBillets();
    }
  } catch(e) {
    console.log("Erreur chargement billets");
  }
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

async function chargerMesBillets() {
  const token = localStorage.getItem("btc-token");
  if (!token) return;

  const res = await fetch(`${API}/billets/mes-billets`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json();

  if (data.billets) {
    billets = data.billets;
    afficherMesBillets();
  }
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
