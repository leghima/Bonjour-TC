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

// ── Recherche de station ─────────────────────────────────────────────────────
function rechercherStation() {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  if (!query) return;

  const resultats = lignes.filter(l =>
    l.stations.some(s => s.toLowerCase().includes(query))
  );

  if (resultats.length > 0) {
    document.getElementById("depart").value =
      resultats[0].stations.find(s => s.toLowerCase().includes(query)) || "";
    document.getElementById("itineraire").scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Station introuvable. Essayez un autre nom.");
  }
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