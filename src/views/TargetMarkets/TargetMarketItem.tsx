import { TargetMarket } from "./TargetMarket";

const TargetMarketItem: React.FC<{ targetMarket: TargetMarket }> = ({
  targetMarket,
}) => {
  return (
    <div className="flex flex-col p-4 text-sm rounded-lg shadow-md">
      <h2 className="mb-1 font-medium">{targetMarket.description}</h2>
      <p>
        Age Range: {targetMarket.age_range.low} - {targetMarket.age_range.high}
      </p>
      <p>Buying Power: {targetMarket.buying_power}</p>
      <p>Education Level: {targetMarket.education_level}</p>
      <p>Interests: {targetMarket.interests.join(", ")}</p>
    </div>
  );
};

export default TargetMarketItem;
