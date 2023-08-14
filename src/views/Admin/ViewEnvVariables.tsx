const ViewEnvVariables: React.FC = () => {
  return (
    <div>
      <h1>Environment Variables:</h1>
      <ul>
        {Object.keys(import.meta.env)
          .filter((key) => key.startsWith("VITE_"))
          .map((key) => (
            <li key={key}>
              {key}: {import.meta.env[key]}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewEnvVariables;
