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
      className={`p-2 flex bg-white rounded-lg flex-row h-18 border-b border-gray-200 ${
        activeIndexItem === itemIndex ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex-grow flex flex-col">
        <div className="flex flex-row justify-between">
          <p className="font-medium text-sm">{headline}</p>
          <button // Added delete button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick && handleDeleteClick();
            }}
            className=" rounded-lg text-sm bg-third_container text-third"
          >
            <IconCloseCircle />
          </button>
        </div>
        {supportingText && (
          <p className="font-light text-xs whitespace-pre-line">
            {supportingText}
          </p>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default TwoLineListItemButtons;