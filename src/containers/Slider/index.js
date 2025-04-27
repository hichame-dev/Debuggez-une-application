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

  
  // Correction du bug "image blanche" :
  // Empêche l'index de dépasser la longueur du tableau 'focus'.
  // Utilisation de l'opérateur modulo pour revenir à 0 automatiquement.   
  const nextCard = () => {
    setTimeout(() => {
      if (byDateDesc?.length) {
        setIndex((index + 1) % byDateDesc.length);
      }
    }, 5000);
  };


  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
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
