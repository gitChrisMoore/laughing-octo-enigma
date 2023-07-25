import { TargetMarket } from "./TargetMarket";
import TargetMarketItem from "./TargetMarketItem";

const TargetMarketList: React.FC<{ targetMarkets: TargetMarket[] }> = ({
  targetMarkets,
}) => {
  return (
    <div className=" ">
      {targetMarkets.map((targetMarket, index) => (
        <TargetMarketItem key={index} targetMarket={targetMarket} />
      ))}
    </div>
  );
};

export default TargetMarketList;
