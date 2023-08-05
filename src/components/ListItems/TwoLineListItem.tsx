interface Props {
  headline: string;
  supportingText?: string;
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
  const { headline, supportingText } = props;

  const truncateText = (text: string, length = 90) => {
    if (!text) return "";
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <div className="py-2 px-4 pr-6 flex flex-col h-18 border-b border-gray-200">
      <p className="font-medium text-sm">{headline}</p>
      {supportingText && (
        <p className="font-light text-xs">{truncateText(supportingText)}</p>
      )}
    </div>
  );
};

export default TwoLineListItem;
