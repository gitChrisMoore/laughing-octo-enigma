import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Field, FieldArray, Form, useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import uuid from "react-uuid";

interface Field {
  id: string;
  name: string;
  type: string;
  children: Field[];
}

const initial_values = [
  // Your initial fields here

  {
    id: uuid(),
    name: "field1",
    type: "string",
    children: [],
  },
  {
    id: uuid(),
    name: "field2",
    type: "string",
    children: [],
  },
];

const ProblemSolverFunctionOverview: React.FC = () => {
  const [isNavDrawerExpanded, setIsNavDrawerExpanded] = useState(false);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);

  const handleChange = (name, value) => {
    const updatedFields = fields.map((field) => {
      if (field.name === name) {
        field.value = value;
      }
      return field;
    });
    setFields(updatedFields);
  };

  const removeField = (field) => {
    const updatedFields = fields.filter((f) => f !== field);
    setFields(updatedFields);
  };

  const formik = useFormik({
    // ... Formik setup here
    initialValues: initial_values,
    onSubmit: () => console.log("hi"),
  });

  const [fields, setFields] = useState<Field[]>([
    // Your initial fields here

    {
      id: uuid(),
      name: "field1",
      type: "string",
      children: [],
    },
    {
      id: uuid(),
      name: "field2",
      type: "string",
      children: [],
    },
  ]);

  const onChildFieldAdd = (field: Field, newChildField: Field) => {
    field.children.push(newChildField);
    setFields(fields);
  };

  // const handleChange = (key, value, data) => {
  //   if (key in data) {
  //     data = { ...data, [key]: value };

  //     console.log(data);
  //   } else {
  //     handleChange(key, value, data[key]);
  //   }
  // };

  // ignore ts
  // @ts-ignore

  const addField = () => {
    const newField = {
      id: uuid(),
      name: "New Field",
      type: "text",
      children: [],
    };
    setFields([...fields, newField]);
  };

  const updateItem = (items, id, child) => {
    return items.map((item: { id: any; children: string | any[] }) => {
      if (item.id === id) {
        return { ...item, children: [...item.children, child] };
      } else if (item.children.length > 0) {
        return { ...item, children: updateItem(item.children, id, child) };
      }
      return item;
    });
  };

  const handleAddChildField = (id: string, child: Field) => {
    const updatedData = updateItem(fields, id, child);
    setFields(updatedData);
  };

  const Menu = ({ data }) => {
    console.log("menu called");
    console.log(data);
    return (
      <ul>
        {data.map((m) => {
          return (
            <li key={m["id"]}>
              {m.name}
              {m.children && <Menu data={m.children} />}
            </li>
          );
        })}
      </ul>
    );
  };

  const InputFieldRecursion = ({ fields }) => {
    console.log(fields);
    return (
      <ul>
        {fields.map((field: Field, index: number) => (
          <li className="ml-6" key={field.id}>
            <div className="flex flex-row text-xs mt-1">
              <div className="flex flex-col">
                <input
                  className="w-full text-sm rounded-md py-1 px-1 ring-1 ring-slate-200 shadow-sm"
                  id={field.name}
                  name={field.name}
                  placeholder="Enter a value"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  // value={field.value}
                />
              </div>
              <div className="flex flex-col">
                <select
                  className="w-full text-sm rounded-md py-1 px-2 ring-1 ring-slate-200 shadow-sm"
                  id={field.name}
                  name={field.name}
                  placeholder="Enter a value"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  // value={field.value}
                />
              </div>
              <div className="flex flex-col">
                <Button>+</Button>
              </div>
              <div className="flex flex-col">
                <Button>-</Button>
              </div>
            </div>
            {field.children && <InputFieldRecursion fields={field.children} />}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {fields.map((field, index) => (
        <div className="flex w-full" key={index}>
          <div className="pt-4">
            {field.name}
            <input
              className="w-full text-sm rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
              id={field.name}
              name={field.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              // value={field.value}
            />
          </div>

          <button onClick={() => removeField(field)}>Remove</button>
          <button
            onClick={() => {
              const newChildField = {
                id: uuid(),
                name: "abcd",
                type: "text",
                children: [],
              };
              // field.children.push(newChildField);
              handleAddChildField(field.id, newChildField);

              // setFields(fields);
            }}
          >
            Add Child Field
          </button>
        </div>
      ))}
      <button onClick={addField}>Add Field</button>
      {/* <Menu data={fields} /> */}
      <InputFieldRecursion fields={fields} />
    </>
  );
};

export default ProblemSolverFunctionOverview;

// <form onSubmit={formik.handleSubmit}>
//   <h1>Add Your Skills</h1>
//   <Field name="name" placeholder="Your name" />
//   <FieldArray name="skills">
//     {fields.map((field, index) => (
//       <div key={index}>
//         <Field name={``} placeholder="Skill" />
//         <button
//         // onClick={() =>
//         //   setFields(() => fields.filter((f) => f !== field))
//         // }
//         >
//           Remove
//         </button>
//       </div>
//     ))}
//     <button onClick={handleAddField}>Add Skill</button>
//   </FieldArray>
//   <button type="submit">Submit</button>
// </form>;

// @ts-ignore

// Worked
// {
//   fields.map((field, index) => (
//     <div className="flex w-full" key={field.id}>
//       <div className="pt-4">
//         {field.name}
//         <input
//           className="w-full text-sm rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
//           name={`${field.name}-name`}
//           onChange={formik.handleChange}
//           value={formik.values[`${field.name}-name`]}
//         />

//         <select
//           className="w-full text-sm rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
//           name={`${field.name}-type`}
//           onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
//             formik.handleChange(e);
//             if (e.target.value === "array") {
//               // Push a new child field into the current field's children array
//               const newFields = [...fields];
//               newFields[index].children.push({
//                 id: new Date().getTime(),
//                 name: `${field.name}-child1`,
//                 type: "string",
//                 children: [],
//               });
//               setFields(newFields);
//             }
//           }}
//           value={formik.values[`${field.name}-type`]}
//         >
//           <option value="string">string</option>
//           <option value="integer">integer</option>
//           <option value="array">array</option>
//         </select>

//         {formik.values[`${field.name}-type`] === "array" &&
//           field.children.map((childField) => (
//             <input
//               className="w-full text-sm rounded-md py-2 px-2 ring-1 ring-slate-200 shadow-sm"
//               name={`${childField.name}-name`}
//               onChange={formik.handleChange}
//               value={formik.values[`${childField.name}-name`]}
//             />
//           ))}
//       </div>

//       <button
//         onClick={() => setFields(fields.filter((f) => f.id !== field.id))}
//       >
//         Remove
//       </button>
//     </div>
//   ));
// }

// example_data = [
//   {
//     id: 1,
//     name: "field1",
//     type: "string",
//     children: [],
//   },
//   {
//     id: 2,
//     name: "field2",
//     type: "string",
//     children: [
//       {
//         id: 3,
//         name: "field3",
//         type: "string",
//         children: [],
//       },
//       {
//         id: 4,
//         name: "field4",
//         type: "string",
//         children: [
//           {
//             id: 5,
//             name: "field5",
//             type: "string",
//             children: [],
//           },
//           {
//             id: 6,
//             name: "field2",
//             type: "string",
//             children: [],
//           },
//         ],
//       },
//     ],
//   },
// ];
