import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";

export interface OptionInterface {
  option__name: string;
  name: string;
}

interface OtherFormProps {
  errors?: any;
  options?: Array<OptionInterface>;
  setOptions?: (options: Array<OptionInterface>) => void;
  send: boolean;
  register: any;
  control: any;
  watch: any;
}

export const OtherForm: React.FC<OtherFormProps> = ({
  setOptions,
  register,
  control,
  watch,
}: OtherFormProps): React.ReactElement => {
  // const { control, register } = useForm();
  const { append, remove, fields } = useFieldArray({
    control,
    name: "fieldArray",
  });

  const [localStorageItems, setLocalStorageItems] = React.useState<
    string | any
  >("{}");

  useEffect(() => {
    setLocalStorageItems(localStorage.getItem("data"));
  }, []);

  const watchFieldArray = watch("fieldArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  console.log("controlledFields", controlledFields);

  return (
    <>
      <div>
        <ul>
          {controlledFields.map((field, index) => {
            return (
              <li key={field.id} style={{ display: "flex", marginTop: "10px" }}>
                <input
                  className="input"
                  {...register(`fieldArray.${index}.name` as const)}
                />
                <Button
                  style={{ marginLeft: "10px" }}
                  type="button"
                  onClick={() => remove(index)}
                  variant="danger"
                >
                  Удалить
                </Button>{" "}
              </li>
            );
          })}
        </ul>
        <Button
          variant="info"
          onClick={() => append({})}
          style={{
            marginLeft: "30px",
          }}
        >
          {controlledFields.length === 0 ? "Добавить опцию" : "Еще"}
        </Button>{" "}
      </div>
    </>
  );
};
