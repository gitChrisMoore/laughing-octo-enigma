import { MarketingMessage } from "./MarketingMessage";

const MarketingMessageListItem: React.FC<{
  marketingMessage: MarketingMessage;
}> = ({ marketingMessage }) => {
  return (
    <div className="flex flex-col p-4 text-sm rounded-lg shadow-md">
      <h2 className="mb-1 font-medium">{marketingMessage.slogan}</h2>
      <p>Description: {marketingMessage.description}</p>
      <p>Call to action: {marketingMessage.call_to_action}</p>
      <p>Unique selling point: {marketingMessage.unique_selling_point}</p>
      <p>Features: {marketingMessage.features.join(", ")}</p>
      <p>Target audiences: {marketingMessage.target_audiences.join(", ")}</p>
    </div>
  );
};

export default MarketingMessageListItem;
