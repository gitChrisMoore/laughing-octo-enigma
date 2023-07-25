import { MarketingMessage } from "./MarketingMessage";
import MarketingMessageListItem from "./MarketingMessageListItem";

const MarketingMessageList: React.FC<{
  marketingMessages: MarketingMessage[];
}> = ({ marketingMessages }) => {
  return (
    <div className=" ">
      {marketingMessages.map((marketingMessage, index) => (
        <MarketingMessageListItem
          key={index}
          marketingMessage={marketingMessage}
        />
      ))}
    </div>
  );
};

export default MarketingMessageList;
