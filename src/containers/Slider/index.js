import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // 🆕 État qui contrôle la pause du slider

  const byDateAsc = data?.focus?.sort(
    // ⏱️ Tri des événements du plus ancien au plus récent
    (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
  );

  useEffect(() => {
    if (!byDateAsc || byDateAsc.length === 0 || isPaused) {
      return () => { };
    }

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateAsc.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [byDateAsc, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
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
              {byDateAsc.map((eventRadio, indexRadio) => (
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
