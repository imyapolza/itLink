import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import A from "../components/A";
import { BaseForm } from "../components/BaseForm";
import { FeatureForm } from "../components/FeatureForm";
import { OtherForm } from "../components/OtherForm/OtherForm";
import Head from "next/head";
import { Button } from "react-bootstrap";
import { dataFormation, DataInterface } from "../decompose/dataFormation";
import { Context } from "next-redux-wrapper";
import { MyVerticallyCenteredModal } from "../components/MyVerticallyCenteredModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { getBase64 } from "../decompose/base64";
import styles from "../styles/Create.module.scss";
import { MainContainer } from "../components/MainContainer";
import { urlItems } from "../consts/urlItems";
import { ItemsState } from "../types/items";
import { CreateApi } from "./api/CreateApi";

interface CreateProps {
  users: Array<DataInterface>;
}

export default function Create({ users }: ItemsState): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);
  const [first, setfirst] = useState<string>("{}");
  const [watchFormEmpty, setWatchFormEmpty] = useState<boolean>(false);
  const dataL = JSON.parse(first);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: dataL,
  });

  const watchForm = watch();
  console.log(watchForm);

  useEffect(() => {
    setfirst(localStorage.getItem("data") || "{}");
  }, []);

  useEffect(() => {
    if (Object.keys(dataL).length > 0) {
      if (
        (dataL.brand && dataL.brand.length > 0) ||
        (dataL.model && dataL.model.length > 0) ||
        (dataL.productionYear && dataL.productionYear.length > 0) ||
        (dataL.mileage && dataL.mileage.length > 0) ||
        (dataL.body && dataL.body !== "all")
      ) {
        setForm(true);
      }
    }

    for (let key in dataL) {
      setValue(key, dataL[key]);
    }

    for (let key in dataL.technical_characteristics) {
      setValue(key, dataL.technical_characteristics[key]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first]);

  interface Response<T> {
    status: string;
    data: T;
  }

  console.log("watchForm", watchForm);
  console.log("dataL", dataL);

  useEffect(() => {
    console.log("watchForm", watchForm);
    for (let key in watchForm) {
      if (typeof watchForm[key] === "string" && watchForm[key].length > 0) {
        localStorage.setItem("data", JSON.stringify(watchForm));
      }
    }
  }, [dataL, watchForm, watchFormEmpty]);

  const onSubmit = (
    data: DataInterface,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    console.log("data", data);
    setForm(false);
    setOpen(true);
    const newId = users.items && users.items[users.items.length - 1].id! + 1;
    let options = data.fieldArray;

    dataFormation(data, form, options, newId);

    getBase64(data.image[0]).then((str) => {
      data.img = str;

      CreateApi.setCard(urlItems, data)
        .then(({ data }: DataInterface) =>
          console.log(data, "ОТвет от сервера")
        )
        .catch((err: Error) => console.log(err));
    });
    (e.target as Record<string, any>).reset();
  }; // your form submit function which will invoke after successful validation

  function formSubm() {
    setSend(true);
  }

  function handleCancelForm() {
    setForm(false);
  }
  return (
    <MainContainer keywords={"create"}>
      <MyVerticallyCenteredModal
        show={open}
        onHide={() => setOpen(false)}
        title="Данные сохранены"
        body="Успех"
      />
      <div className={form ? "create__container" : ""}>
        <Head>
          <meta></meta>
          <title>Добавление пользователя</title>
        </Head>

        <div style={{ marginTop: "11px" }}>
          <A href="/" text="Назад" />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit as any)}>
          <div>
            <div>
              <h2 className={styles.baseData}>Базовые данные</h2>
              <BaseForm
                errors={errors}
                register={register}
                fileSettings={{
                  required: "Выберите фото",
                }}
                inputType={true}
                validation={"Поле обязательно к заполнению"}
              />
            </div>

            <div>
              {!form && (
                <Button
                  className="button"
                  type="button"
                  onClick={() => setForm(true)}
                  variant="outline-primary"
                >
                  Добавить технические характеристики
                </Button>
              )}
              {form && (
                <Button
                  className={styles.techButton}
                  type="button"
                  onClick={() => handleCancelForm()}
                >
                  Отменить добавление технических характеристик
                </Button>
              )}
              {form && (
                <FeatureForm
                  errors={errors}
                  register={register}
                  settings={"Поле обязательно к заполнению"}
                  filterChanges={false}
                />
              )}
            </div>

            <div className={styles.otherForm}>
              <h2 className={styles.optionsText}>Доп. опции</h2>
              <OtherForm
                errors={errors}
                send={send}
                register={register}
                control={control}
                watch={watch}
              />
            </div>
          </div>
          <input className="button" type="submit" onClick={() => formSubm()} />
        </form>
      </div>
    </MainContainer>
  );
}

export async function getServerSideProps(context: Context) {
  const axios = require("axios").default;
  const response = await axios.get(urlItems);
  const users = response.data;

  return {
    props: { users }, // will be passed to the page component as props
  };
}
