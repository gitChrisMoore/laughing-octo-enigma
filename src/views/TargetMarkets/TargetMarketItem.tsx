import { TargetMarket } from "./TargetMarket";

const TargetMarketItem: React.FC<{ targetMarket: TargetMarket }> = ({
  targetMarket,
}) => {
  return (
    <div className=" ">
      <h2>{targetMarket.description}</h2>
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
