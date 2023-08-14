const ViewColorScheme: React.FC = () => {
  const themes = ["primary", "secondary", "tertiary", "error", "background"];

  return (
    <>
      <div className="mt-4">
        <div className="bg-primary text-primary_on p-2">Primary</div>
        <div className="bg-secondary text-secondary_on mt-1 p-2">Secondary</div>
      </div>
      <div>
        {themes.map((theme) => (
          <div key={theme}>
            <div className={`my-2 bg-${theme}`}>{theme}</div>
            <div
              className={`my-2 text-${theme} bg-${theme}_on`}
            >{`${theme} on`}</div>
            <div
              className={`my-2 container ${theme}_container`}
            >{`${theme} container`}</div>
            <div
              className={`my-2 container ${theme}_on_container`}
            >{`${theme} on container`}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewColorScheme;
