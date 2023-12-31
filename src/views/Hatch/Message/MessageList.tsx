import { GenericMessage } from "../Models/GenericSchema";
import Message from "./Message";

type MessageListProps = {
  messages: GenericMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  messagesEndRef,
}) => (
  <div>
    {messages.map((message, index) => (
      <Message key={index} message={message} />
    ))}
    <div ref={messagesEndRef}></div>
  </div>
);

export default MessageList;
