import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ChatForm from "./ChatForm";
import PageHeader from "../../components/PageHeader/PageHeader";

interface ChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

const initialMessages = [
  {
    role: "system",
    content: `
    You are tasked with identifying target markets for a specific product or service. For each target market, please provide:

    Description: A unique summary that highlights key characteristics.
    Age Range: The specific age groups that apply.
    Buying Power: A brief outline of economic status or buying ability.
    Education Level: The general education background.
    Interests: Main interests, hobbies, or behaviors.
    Ensure each target market is distinct and provide your insights in a concise manner.`,
  },
  { role: "user", content: "good how are you" },
] as ChatMessage[];

const ChatMessageOverview: React.FC = () => {
  const [isNavDrawerExpanded, setIsNavDrawerExpanded] = useState(false);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);

  const toggleNavDrawer = () => {
    setIsNavDrawerExpanded(!isNavDrawerExpanded);
  };

  const toggleSideSheet = () => {
    setIsSideSheetOpen(!isSideSheetOpen);
  };

  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(initialMessages);

  const headline = "Prompt Context Setup";
  const supportingText =
    "Setting up the initial context is like telling the AI exactly what you want it to do by asking it a very specific question or giving it a clear instruction. Think of it as teaching a robot to understand you by using just the right words!";

  return (
    <>
      {/* form that has a input text field that submits to handlegetpersona */}
      <Navbar
        isNavDrawerExpanded={isNavDrawerExpanded}
        toggleNavDrawer={toggleNavDrawer}
        toggleSideSheet={toggleSideSheet}
        title="Sprout"
      />
      <div className="flex justify-center">
        <div className="w-full px-2 max-w-2xl ">
          <PageHeader headline={headline} supportingText={supportingText} />
          <ChatForm
            messages={chatMessages}
            onMessagesChange={setChatMessages}
          />
        </div>
      </div>
    </>
  );
};

export default ChatMessageOverview;
