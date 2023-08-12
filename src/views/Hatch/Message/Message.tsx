import Avatar from "../../../components/Avatar/Avatar";
import IconBrainCircuit from "../../../components/Icons/IconBrainCircuit";
import IconUser from "../../../components/Icons/IconUser";
import { GenericMessage } from "../Models/GenericSchema";

type MessageProps = {
  message: GenericMessage;
};

const Message: React.FC<MessageProps> = ({ message }) => (
  <div
    className={`flex flex-col text-sm rounded-xl mt-2 ${
      message.role === "user" ? "bg-slate-300" : "bg-white shadow-md"
    }`}
  >
    <div className="flex flex-row p-2">
      <div className={`flex`}>
        {message.role === "assistant" ? (
          <Avatar>
            <IconBrainCircuit />
          </Avatar>
        ) : (
          <Avatar backgroundColor="bg-sky-500">
            <IconUser />
          </Avatar>
        )}
      </div>
      <div className="flex grow">
        <p className="text-xs whitespace-pre-line">{message.payload}</p>
      </div>
    </div>
  </div>
);

export default Message;
