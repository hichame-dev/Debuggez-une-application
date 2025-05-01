import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort(
    // Correction : Tri des événements du plus récent au plus ancien sans duplication de tableau.
    // Résultat : janvier (ancien) sera affiché en dernier dans le slider.
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  );

  
  
  useEffect(() => {
    // ✅ Vérifie si les données 'byDateDesc' sont bien chargées et non vides
    // 🛡️ Cela évite l'erreur 'Cannot read properties of undefined (reading length)'
    if (!byDateDesc || byDateDesc.length === 0) return;

    // 🔁 Lance une boucle toutes les 5 secondes pour faire défiler les slides
    // 💡 On utilise un setInterval ici pour un défilement automatique fluide
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);

    // 🧹 Nettoyage du setInterval pour éviter les effets indésirables ou les fuites mémoire
    return () => clearInterval(interval);
  }, [byDateDesc]);

  

  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`slide-${event.title}`}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((eventRadio, indexRadio) => (
                <input
                  key={`radio-${eventRadio.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === indexRadio}
                  onChange={() => { }}
                />
              ))}
            </div>
          </div>
        </div>
    ))}
  </div>
);
};

export default Slider;
