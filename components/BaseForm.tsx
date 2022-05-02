import React from "react";
import { Form } from "react-bootstrap";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { DataInterface } from "../decompose/dataFormation";

interface BaseFormProps {
  errors: any;
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  fileSettings: any;
  inputType: boolean;
  validation: boolean | string;
  filterChanges?: boolean;
  description?: boolean;
  submitData?: DataInterface;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  errors,
  register,
  fileSettings,
  inputType,
  validation,
  filterChanges = false,
  description = true,
  submitData,
}: BaseFormProps): React.ReactElement => {
  console.log("errors", errors);
  return (
    <>
      <label className="label">
        Название
        <input
          className="input"
          placeholder="Введите название"
          readOnly={false}
          {...register("name", {
            required: validation,
          })}
        />
      </label>
      <div>
        {errors?.name && (
          <p className="errorMessage">
            {errors?.name?.message || "Что-то заполнено неверно!"}
          </p>
        )}
      </div>

      {description ? (
        <>
          <label className="label">
            Описание
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Введите описание"
              readOnly={false}
              {...register("description", {
                required: validation,
              })}
            />
          </label>
          <div>
            {errors?.description && (
              <p className="errorMessage">
                {errors?.description?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>
        </>
      ) : null}

      {filterChanges !== true ? (
        <>
          <label className="label">
            Цена
            <input
              className="input"
              type="number"
              placeholder="Введите цену"
              {...register("price", {
                required: validation,
                min: {
                  value: 10,
                  message: "Введите положительное число ( минимум : 10 )",
                },
                max: {
                  value: 15000000,
                  message: "Максимум 15 000 000",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Проверьте поле ввода",
                },
              })}
            />
          </label>
          <div>
            {errors?.price && (
              <p className="errorMessage">
                {" "}
                {errors?.price?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <label className="label">
            Цена ОТ
            <input
              className="input"
              type="number"
              placeholder="Введите цену"
              readOnly={false}
              {...register("price_from", {
                min: {
                  value: 10,
                  message: "Введите положительное число ( минимум : 10 )",
                },
                max: {
                  value: 15000000,
                  message: "Максимум 15 000 000",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Проверьте поле ввода",
                },
              })}
            />
          </label>
          <div>
            {errors?.price_from && (
              <p className="errorMessage">
                {" "}
                {errors?.price_from?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>

          <label className="label">
            Цена ДО
            <input
              className="input"
              type="number"
              placeholder="Введите цену"
              readOnly={false}
              {...register("price_to", {
                min: {
                  value: 10,
                  message: "Введите положительное число ( минимум : 10 )",
                },
                max: {
                  value: 15000000,
                  message: "Максимум 15 000 000",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Проверьте поле ввода",
                },
              })}
            />
          </label>
          <div>
            {errors?.price_to && (
              <p className="errorMessage">
                {" "}
                {errors?.price_to?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>
        </>
      )}

      {inputType ? (
        <>
          <label className="label">
            Фото
            <input
              className="button input__type"
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              {...register("image", fileSettings)}
            />
          </label>
          <div>
            {errors?.image && (
              <p className="errorMessage">
                {errors?.image?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>
        </>
      ) : null}

      <label className="label">
        Контакты
        <input
          className="input"
          placeholder="Введите контакты"
          readOnly={false}
          {...register("contacts", {
            required: validation,
          })}
        />
      </label>
      <div>
        {errors?.contacts && (
          <p className="errorMessage">
            {errors?.contacts?.message || "Что-то заполнено неверно!"}
          </p>
        )}
      </div>
    </>
  );
};
