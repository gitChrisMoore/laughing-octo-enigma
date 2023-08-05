interface Props {
  headline: string;
  supportingText?: string;
}

const PageHeader: React.FC<Props> = ({ ...props }) => {
  const { headline, supportingText } = props;

  return (
    <div className="mb-2">
      <p className="text-xl font-semibold">{headline}</p>

      {supportingText && <p className="font-light text-sm">{supportingText}</p>}
    </div>
  );
};

export default PageHeader;
