const mapping = [
  { tech: "2G, 4G", operator: "Magenta" },
  { tech: "2G, 4G, 5G", operator: "Magenta" },
  { tech: "GSM, LTE, 5G", operator: "A1" },
  { tech: "5G, GSM, LTE", operator: "3" },
  { tech: "GSM, LTE", operator: "A1 oder 3" },
  { tech: "LTE, 5G", operator: "A1" }
];

function addOperators() {
  // Wir suchen nach allen Elementen, die Text enthalten könnten (meistens in Tabellen oder Listen im Info-Panel)
  const elements = document.querySelectorAll('div, span, td, p');

  elements.forEach(el => {
    // Verhindere mehrfaches Hinzufügen (Check ob Betreiber schon drin steht)
    if (el.dataset.operatorAdded) return;

    let text = el.innerText.trim();
    
    // Suche nach einer Übereinstimmung aus unserer Liste
    for (const item of mapping) {
      if (text === item.tech) {
        // Ergänze den Betreiber in Klammern und markiere ihn fett/farbig
        el.innerHTML = `${text} <strong style="color: #d32f2f; margin-left: 5px;">(${item.operator})</strong>`;
        el.dataset.operatorAdded = "true";
        break;
      }
    }
  });
}

// Da die Seite Inhalte dynamisch lädt (beim Klicken auf einen Punkt), 
// beobachten wir das Dokument auf Änderungen.
const observer = new MutationObserver((mutations) => {
  addOperators();
});

// Starte die Überwachung des Body-Elements
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initialer Aufruf (falls schon was da ist)
addOperators();