import React from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

import { Form } from "react-bootstrap";

interface FeatureFormProps {
  errors: any;
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  settings?: any;
  filterChanges: boolean;
}

export const FeatureForm: React.FC<FeatureFormProps> = ({
  errors,
  register,
  settings,
  filterChanges = false,
}: FeatureFormProps): React.ReactElement => {
  return (
    <div style={{ marginTop: "40px" }}>
      <label className="label">
        Марка
        <input
          className="input"
          style={{ textTransform: "uppercase" }}
          placeholder=""
          readOnly={false}
          {...register("brand", {
            required: settings,
          })}
        />
      </label>
      <div>
        {errors?.brand && (
          <p className="errorMessage">
            {errors?.brand?.message || "Что-то заполнено неверно!"}
          </p>
        )}
      </div>

      <label className="label">
        Модель
        <input
          className="input"
          style={{ textTransform: "uppercase" }}
          placeholder=""
          readOnly={false}
          {...register("model", {
            required: settings,
          })}
        />
      </label>
      <div>
        {errors?.model && (
          <p className="errorMessage">
            {errors?.model?.message || "Что-то заполнено неверно!"}
          </p>
        )}
      </div>

      <label className="label">
        Год выпуска
        <input
          className="input"
          type="date"
          placeholder=""
          readOnly={false}
          {...register("productionYear", {
            required: settings,
          })}
        />
      </label>
      <div>
        {errors?.productionYear && (
          <p className="errorMessage">
            {errors?.productionYear?.message || "Что-то заполнено неверно!"}
          </p>
        )}
      </div>

      <label className="label">
        Кузов
        <Form.Select {...register("body")} aria-label="Default select example">
          <option value="all">Все</option>
          <option value="sedan">sedan</option>
          <option value="minivan">minivan</option>
          <option value="suv">suv</option>
          <option value="hatchback">hatchback</option>
          <option value="cabriolet">cabriolet</option>
          <option value="sport">sport</option>
          <option value="pickup">pickup</option>
          <option value="4WD">4WD</option>
          <option value="minitruck">minitruck</option>
          <option value="micro">micro</option>
          <option value="van">van</option>
        </Form.Select>
      </label>
      <div>
        {errors?.body && (
          <p className="errorMessage">
            {errors?.body?.message || "Что-то заполнено неверно!"}
          </p>
        )}
      </div>

      {filterChanges === false ? (
        <>
          <label className="label">
            Пробег
            <input
              className="input"
              maxLength={15}
              type="number"
              placeholder=""
              readOnly={false}
              {...register("mileage", {
                max: {
                  value: 1000000,
                  message: "Максимум 1 000 000",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Подобный символ в начале недопустим",
                },
              })}
            />
          </label>
          <div>
            {errors?.mileage && (
              <p className="errorMessage">
                {errors?.mileage?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <label className="label">
            Пробег ОТ
            <input
              className="input"
              maxLength={15}
              type="number"
              placeholder=""
              readOnly={false}
              {...register("mileage_from", {
                max: {
                  value: 1000000,
                  message: "Максимум 1 000 000",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Подобный символ в начале недопустим",
                },
              })}
            />
          </label>
          <div>
            {errors?.mileage_from && (
              <p className="errorMessage">
                {errors?.mileage_from?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>

          <label className="label">
            Пробег ДО
            <input
              className="input"
              maxLength={15}
              type="number"
              placeholder=""
              readOnly={false}
              {...register("mileage_to", {
                max: {
                  value: 1000000,
                  message: "Максимум 1 000 000",
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Подобный символ в начале недопустим",
                },
              })}
            />
          </label>
          <div>
            {errors?.mileage_to && (
              <p className="errorMessage">
                {errors?.mileage_to?.message || "Что-то заполнено неверно!"}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
