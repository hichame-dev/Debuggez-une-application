import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 🆕 État qui contrôle la pause du slider

  const byDateDesc = data?.focus?.sort(
    // ⏱️ Tri des événements du plus récent au plus ancien
    (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
  );

  useEffect(() => {
    if (!byDateDesc || byDateDesc.length === 0 || isPaused) {
      //  Pas de défilement = on retourne une fonction vide
      return () => { };
    }

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);

    // 🧹 Nettoyage de l'intervalle à chaque re-render
    return () => clearInterval(interval);
  }, [byDateDesc, isPaused]);


  useEffect(() => {
    // 🎹 Ajoute un écouteur pour mettre en pause/reprendre avec la barre espace
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault(); // 🚫 Empêche le scroll de la page quand on appuie sur espace
        setIsPaused((prev) => !prev); // ⏯️ Bascule entre lecture/pause
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // 🧼 Nettoyage
  }, []);

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
