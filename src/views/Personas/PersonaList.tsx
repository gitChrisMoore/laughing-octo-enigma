import { Persona } from "./Persona";
import PersonaListItem from "./PersonaListItem";

const PersonaList: React.FC<{
  personas: Persona[];
}> = ({ personas }) => {
  return (
    <div className=" ">
      {personas.map((persona, index) => (
        <PersonaListItem key={index} persona={persona} />
      ))}
    </div>
  );
};

export default PersonaList;
