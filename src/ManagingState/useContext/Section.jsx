import { useContext } from "react";
import { LevelContext } from "./LevelContext";

export default function Section({ children }) {
  const level = useContext(LevelContext);

  return (
    <LevelContext.Provider value={level + 1}>
      <section className="section">
        {children}
      </section>
    </LevelContext.Provider>    
  );
}
