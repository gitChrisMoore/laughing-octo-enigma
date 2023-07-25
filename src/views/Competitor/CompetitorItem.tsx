import { Competitor } from "./Competitor";

const CompetitorItem: React.FC<{ competitor: Competitor }> = ({
  competitor,
}) => {
  return (
    <div className="flex flex-col p-4 text-sm rounded-lg shadow-md">
      <h2 className="mb-1 font-medium">{competitor.competitor_name}</h2>
      <p>Industry: {competitor.industry}</p>
      <p>Specialization: {competitor.specialization}</p>
      <p>Strengths: {competitor.strengths.join(", ")}</p>
      <p>Strategies: {competitor.strategies.join(", ")}</p>
    </div>
  );
};

export default CompetitorItem;
