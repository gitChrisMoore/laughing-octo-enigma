import { useField } from "formik";

type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

const FormTextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div className="mb-2">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-slate-800"
      >
        {label}
      </label>
      <input
        id={props.name}
        className={`mt-1 p-2 w-full border text-sm rounded-md ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs ">{meta.error}</div>
      ) : (
        <div className="text-transparent text-xs ">Error</div>
      )}
    </div>
  );
};

export default FormTextInput;
