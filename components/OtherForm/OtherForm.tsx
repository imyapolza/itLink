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
  register,
  control,
  watch,
  errors,
}: OtherFormProps): React.ReactElement => {
  // const { control, register } = useForm();
  const { append, remove, fields } = useFieldArray({
    control,
    name: "fieldArray",
  });

  const watchFieldArray = watch("fieldArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  return (
    <>
      <div>
        <ul>
          {controlledFields.map((field, index) => {
            return (
              <li
                key={field.id}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <input
                    className="input"
                    style={{ height: "40px", marginTop: "10px" }}
                    {...register(`fieldArray.${index}.name` as const, {
                      required: "Обязательное поле",
                    })}
                  />
                  {errors.fieldArray?.[index]?.name.message && (
                    <p className="errorMessage">Введите опцию</p>
                  )}
                </div>
                <Button
                  style={{
                    height: "40px",
                    paddingTop: "0",
                    marginLeft: "10px",
                  }}
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
