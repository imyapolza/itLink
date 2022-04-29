import { Context } from "next-redux-wrapper";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTypedSelector } from "../../store/hooks/useTypesSelector";
import { useDispatch } from "react-redux";
import { getBase64 } from "../../decompose/base64";
import { listQuery } from "../../api/listQuery";
import { DataInterface } from "../../decompose/dataFormation";
import { MainContainer } from "../../components/MainContainer";
import { BaseForm } from "../../components/BaseForm";
import { FeatureForm } from "../../components/FeatureForm";
import { OptionInterface } from "../../components/OtherForm/OtherForm";
import { dataFormation } from "../../decompose/dataFormation";
import { MyVerticallyCenteredModal } from "../../components/MyVerticallyCenteredModal";
import { urlItems } from "../../consts/urlItems";
import styles from "../../styles/Manager[id].module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ItemsState } from "../../types/items";

interface ListPropsInterface {
  users: Array<DataInterface>;
}

export default function List({ users }: ListPropsInterface) {
  const { query } = useRouter();
  const activePageManager: number = useTypedSelector(
    (state: ItemsState) => state.users.activePage
  );

  const curr: DataInterface =
    users &&
    users.filter((item) => {
      return String(item.id) === String(query.id);
    })[0];

  console.log("curr", curr);

  const [form, setForm] = useState<boolean>(false);
  const [options, setOptions] = useState<OptionInterface[]>([]);
  const [modal, openModal] = useState<boolean>(false);

  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function handleForm(param: boolean): void {
    param ? setForm(param) : setForm(false);
  }

  function onSubmit(data: DataInterface, e: React.FormEvent<HTMLInputElement>) {
    openModal(true);
    setForm(false);

    const flagImg = Boolean(data.image.length);

    const newId = users.length + Math.random().toString(16).slice(2);
    dataFormation(data, form, options, newId);

    if (flagImg) {
      getBase64(data.image[0])
        .then((str) => {
          data["img"] = str;
          listQuery(curr.id, data);
        })
        .then((e.target as Record<string, any>).reset());
    } else {
      listQuery(curr.id, data).then((e.target as Record<string, any>).reset());
    }
  }

  return (
    <MainContainer keywords="keywords">
      <MyVerticallyCenteredModal
        show={modal}
        onHide={() => openModal(false)}
        title="Данные сохранены"
        body="Успех"
      />
      <a className={styles.backButton} onClick={() => router.back()}>
        Назад
      </a>{" "}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit as any)}>
        <Card.Img className={styles.cardImg} variant="top" src={curr.img} />
        <BaseForm
          errors={errors}
          register={register}
          fileSettings={{ required: "Выберите изображение" }}
          inputType={true}
          validation={true}
        />
        {!form && (
          <Button
            className="button"
            type="button"
            onClick={() => handleForm(true)}
            variant="outline-primary"
          >
            Добавить технические характеристики
          </Button>
        )}
        {form && (
          <Button
            className={styles.techButton}
            type="button"
            onClick={() => handleForm(false)}
          >
            Отменить добавление технических характеристик
          </Button>
        )}
        {form && (
          <FeatureForm
            errors={errors}
            register={register}
            settings={""}
            filterChanges={false}
          />
        )}
        <div>Выбрать опцию: </div>
        <Button className="button" type="submit" variant="info">
          Изменить
        </Button>{" "}
      </form>
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
