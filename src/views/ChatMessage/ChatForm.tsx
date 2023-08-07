import * as Yup from "yup";
import { Field, useFormik } from "formik";
import { useState } from "react";
import TwoLineListItemButtons from "../../components/ListItems/TwoLineListItemButtons";

interface ChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

interface ChatFormProps {
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ messages, onMessagesChange }) => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<
    number | null
  >(null);
  const [isCreatingOrEditingMessage, setIsCreatingOrEditingMessage] =
    useState(false);

  // ...rest of the code...

  const formik = useFormik({
    initialValues: {
      role: "user" as "system" | "assistant" | "user",
      content: "",
    },
    validationSchema: Yup.object({
      role: Yup.string()
        .oneOf(["system", "assistant", "user"])
        .required("Required"),
      content: Yup.string()
        .required("Content is required")
        .notOneOf([""], "Content cannot be empty"),
    }),
    onSubmit: (values: ChatMessage) => {
      if (selectedMessageIndex !== null) {
        const updatedMessages = [...messages];
        updatedMessages[selectedMessageIndex] = values;
        onMessagesChange(updatedMessages);
        setSelectedMessageIndex(null);
      } else {
        onMessagesChange([...messages, values]);
      }
      setIsCreatingOrEditingMessage(false);
      formik.resetForm();
    },
  });

  const handleDelete = (index: number) => {
    onMessagesChange(messages.filter((_, i) => i !== index));
    if (selectedMessageIndex === index) {
      setSelectedMessageIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    formik.setValues(messages[index]);
    setSelectedMessageIndex(index);
    setIsCreatingOrEditingMessage(true);
  };

  if (isCreatingOrEditingMessage) {
    return (
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
          >
            <option value="system">system</option>
            <option value="assistant">assistant</option>
            <option value="user">user</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            rows={15}
            className="mt-1 p-2 w-full text-xs border rounded-md"
          />
          {formik.touched.content && formik.errors.content ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.content}
            </div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setIsCreatingOrEditingMessage(false);
            setSelectedMessageIndex(null);
          }}
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <>
      {/* Messages List */}
      <div className="mt-4">
        <div className="flex justify-between align-top">
          <p>Messages:</p>
        </div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <TwoLineListItemButtons
                headline={message.role}
                supportingText={message.content}
                handleItemClick={() => handleEdit(index)}
                activeIndexItem={selectedMessageIndex}
                itemIndex={index}
                handleDeleteClick={() => handleDelete(index)}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="align-top bg-primary text-primary_on p-2 rounded-lg mt-2 text-sm"
        onClick={() => setIsCreatingOrEditingMessage(true)}
      >
        Add New Message
      </button>
    </>
  );
};

export default ChatForm;
