import { useField } from "formik";
import { useEffect, useRef, useState } from "react";

type ChatMessageViewProps = {
  name: string;
  label: string;
  children?: React.ReactNode;
  minRows?: number;
  showCloseButton?: boolean;
  onDelete?: () => void;
  onRoleClick?: () => void; // Added this prop
};
export const ChatMessageView: React.FC<ChatMessageViewProps> = ({
  minRows = 1,
  showCloseButton = false,
  label,
  onDelete,
  onRoleClick,
  ...props
}) => {
  // const [field, meta] = useField(props.name);
  const [field] = useField(props.name);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);
  const lineHeight = 20;
  const maxRows = 7;
  const calculateRows = () => {
    if (textAreaRef.current) {
      const newRows = Math.ceil(textAreaRef.current.scrollHeight / lineHeight);

      if (newRows >= maxRows) {
        textAreaRef.current.rows = maxRows;
        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
        setRows(maxRows);
      } else {
        setRows(Math.max(newRows, minRows));
      }
    }
  };

  useEffect(() => {
    calculateRows();
  }, [field.value]);

  return (
    <>
      <div className="container bg-white px-2 py-3">
        {/*  */}
        {/*  */}
        {/* Header */}
        <div className="flex flex-row py-2 justify-between items-center">
          <p
            className="text-xs tracking-wider font-bold text-slate-900 cursor-pointer"
            onClick={onRoleClick} // Call a callback on click
          >
            {label.toUpperCase()}
          </p>

          {showCloseButton && (
            <p
              onClick={onDelete}
              className="text-xs tracking-wider font-bold text-slate-900 cursor-pointer"
            >
              X
            </p>
          )}
        </div>
        {/*  */}
        {/*  */}
        {/* Content */}
        <div className="text-sm flex flex-col font-light text-slate-700">
          <textarea
            id={props.name}
            className="flex flex-grow resize-none overflow-auto text-input"
            rows={rows}
            {...field}
            {...props}
            ref={textAreaRef}
            placeholder="Enter your message here"
          />
        </div>
      </div>
    </>
  );
};
