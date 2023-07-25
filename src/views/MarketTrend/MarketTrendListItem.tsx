import { MarketTrend } from "./MarketTrend";

const MarketTrendListItem: React.FC<{ marketTrend: MarketTrend }> = ({
  marketTrend,
}) => {
  return (
    <div className="flex flex-col p-4 text-sm rounded-lg shadow-md">
      <h2 className="mb-1 font-medium">{marketTrend.trend}</h2>
      <p className="mb-2">{marketTrend.description}</p>
      <p className="mb-2">
        Implications: {marketTrend.implications.join(", ")}
      </p>
      <p className="mb-2">
        Leading Companies: {marketTrend.leading_companies.join(", ")}
      </p>
      <p className="mb-2">
        Opportunities: {marketTrend.opportunities.join(", ")}
      </p>
    </div>
  );
};

export default MarketTrendListItem;
