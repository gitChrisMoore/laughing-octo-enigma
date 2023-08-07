import IconCloseCircle from "../Icons/IconCloseCircle";
import IconDelete from "../Icons/IconDelete";

interface Props {
  headline: string;
  supportingText?: string;
  itemIndex?: number;
  activeIndexItem?: number | null;
  handleItemClick?: () => void;
  handleDeleteClick?: () => void;
}

const TwoLineListItemButtons: React.FC<Props> = ({ ...props }) => {
  const {
    headline,
    supportingText,
    handleItemClick,
    activeIndexItem,
    itemIndex,
    handleDeleteClick,
  } = props;

  const truncateText = (text: string, length = 90) => {
    if (!text) return "";
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <div
      onClick={handleItemClick}
      className={`p-2 flex flex-row h-18 border-b border-gray-200 ${
        activeIndexItem === itemIndex ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="font-medium text-sm">{headline}</p>
        </div>
        {supportingText && (
          <p className="font-light text-xs whitespace-pre-line">
            {supportingText}
          </p>
        )}
      </div>
      <div>
        <button // Added delete button
          onClick={(e) => {
            e.stopPropagation(); // Prevents click propagation to parent div
            handleDeleteClick && handleDeleteClick();
          }}
          className="p-1 rounded-lg text-sm bg-third text-third_on"
        >
          <IconCloseCircle />
        </button>
      </div>
    </div>
  );
};

export default TwoLineListItemButtons;
