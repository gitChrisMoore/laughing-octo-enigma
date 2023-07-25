import { MarketTrend } from "./MarketTrend";
import MarketTrendListItem from "./MarketTrendListItem";

const MarketTrendList: React.FC<{ marketTrends: MarketTrend[] }> = ({
  marketTrends,
}) => {
  return (
    <div className=" ">
      {marketTrends.map((marketTrend, index) => (
        <MarketTrendListItem key={index} marketTrend={marketTrend} />
      ))}
    </div>
  );
};

export default MarketTrendList;
