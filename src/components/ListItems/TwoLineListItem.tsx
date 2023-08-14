interface Props {
  headline: string;
  supportingText?: string;
  showCloseButton?: boolean;
}

// In react tailwind, create a reusable list-item copmonent.
// The two-line list item should have a headline and a supporting text (which is optional).
// The height should be 72dp.
// The headline should be medium font.
// The supporting text should be small font, with less weight than the headline.
// Thier should be 8dp of space on the top and bottom of the list item.
// Their should be 16dp of space on the left side, and 24 dp of space on the right side.
// The supporting text should take in any length string, wrap it, and truncate it with an ellipsis if it is over 100 characters.

const TwoLineListItem: React.FC<Props> = ({ ...props }) => {
  const { headline, supportingText, showCloseButton = false } = props;

  const truncateText = (text: string, length = 120) => {
    if (!text) return "";
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <div className="container bg-white px-2 py-3">
      {/*  */}
      {/*  */}
      {/* Header */}
      <div className="flex flex-row py-2 justify-between items-center">
        <p className="text-xs tracking-wider font-bold text-slate-900 cursor-pointer">
          {headline.toUpperCase()}
        </p>

        {showCloseButton && (
          <p
            // onClick={onDelete}
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
        {supportingText && <p className="">{truncateText(supportingText)}</p>}
      </div>
    </div>
  );
};

export default TwoLineListItem;
