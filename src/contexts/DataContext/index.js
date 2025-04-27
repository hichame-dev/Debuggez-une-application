import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};
// Correction ajoutée pour fournir "last" (la dernière prestation)
// Objectif : calculer l'événement le plus récent par date
// et le rendre disponible dans le contexte pour le footer (et ailleurs si besoin).
// Cela évite que le footer affiche une image blanche ou des valeurs undefined.
export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const last = data?.events
    ?.slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  [0];

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  });

  // On ajoute "last" au contexte pour qu'il soit accessible partout via useData().
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};


DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
