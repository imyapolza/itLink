import { useRouter } from "next/router";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainContainer } from "../../components/MainContainer";
import { useEffect, useState } from "react";
import { setItems } from "../../store/actions/items";
import { MyVerticallyCenteredModal } from "../../components/MyVerticallyCenteredModal";
import { DataInterface } from "../../decompose/dataFormation";
import { urlItems } from "../../consts/urlItems";
import styles from "../../styles/View[id].module.scss";

interface ViewPropsInterface {
  users: Array<DataInterface>;
}

export async function getServerSideProps() {
  const axios = require("axios").default;
  const response = await axios.get(urlItems);
  const users = response.data;

  return {
    props: { users }, // will be passed to the page component as props
  };
}

export default function View({ users }: ViewPropsInterface) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = useRouter();
  const currUser: DataInterface =
    users &&
    users.filter((item) => {
      return String(item.id) === String(query.id);
    })[0];

  const [modal, openModal] = useState<boolean>(false);

  console.log("query", query);

  useEffect(() => {
    dispatch(setItems(users));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainContainer keywords={"keywords"}>
      <a className={styles.backButton} onClick={() => router.back()}>
        Назад
      </a>{" "}
      <MyVerticallyCenteredModal show={modal} onHide={() => openModal(false)} />
      <Card className={styles.card}>
        <Card.Img className={styles.cardImg} variant="top" src={currUser.img} />
        <Card.Body>
          {currUser.technical_characteristics && (
            <>
              <Card.Text>
                Марка: {currUser.technical_characteristics.brand}
              </Card.Text>
              <Card.Text>
                Модель: {currUser.technical_characteristics.model}
              </Card.Text>
              <Card.Text>
                Год выпуска: {currUser.technical_characteristics.productionYear}
              </Card.Text>
              <Card.Text>
                Кузов: {currUser.technical_characteristics.body}
              </Card.Text>
              <Card.Text>
                Пробег: {currUser.technical_characteristics.mileage} км
              </Card.Text>
            </>
          )}
          <Card.Text className={styles.cardTitle}>
            Навание: {currUser.name}
          </Card.Text>
          <Card.Text>Описание: {currUser.description}</Card.Text>
          <Card.Text>Контакты: {currUser.contacts}</Card.Text>
          <Card.Text>Цена: {currUser.price} долларов</Card.Text>

          {currUser.options && <span>Дополнительные опции:</span>}
          {currUser.options &&
            Object.values(currUser.options).map((item, index) => {
              return (
                <div className={styles.cardPanel} key={index}>
                  {item as any as string}
                </div>
              );
            })}
        </Card.Body>
      </Card>
    </MainContainer>
  );
}
