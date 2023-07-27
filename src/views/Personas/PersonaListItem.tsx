import { Persona } from "./Persona";

const PersonaListItem: React.FC<{
  persona: Persona;
}> = ({ persona }) => {
  return (
    <div className="flex flex-col p-4 text-sm rounded-lg shadow-md">
      <h2 className="mb-1 font-medium">{persona.name}</h2>
      <p>Age: {persona.age}</p>
      <p>Occupation: {persona.occupation}</p>
      <p>Education: {persona.education}</p>
      <p>Personality Traits: {persona.personality_traits.join(", ")}</p>
      <p>Interests: {persona.interests.join(", ")}</p>
      <p>Pain Points: {persona.pain_points.join(", ")}</p>
    </div>
  );
};

export default PersonaListItem;
