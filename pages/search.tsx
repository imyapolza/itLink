import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  activePageManager,
  filterItem,
  setItems,
} from "../store/actions/items";
import { Alert, Button, Card, Pagination } from "react-bootstrap";
import A from "../components/A";
import Head from "next/head";
import { useTypedSelector } from "../store/hooks/useTypesSelector";
import { useForm } from "react-hook-form";
import { DataInterface } from "../decompose/dataFormation";
import { MainContainer } from "../components/MainContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { FeatureForm } from "../components/FeatureForm";
import { BaseForm } from "../components/BaseForm";
import { useRouter } from "next/router";
import { urlItems } from "../consts/urlItems";
import styles from "../styles/Search.module.scss";
import Link from "next/link";
import { SearchApi } from "./api/SearchApi";
import { Api } from "./api/Api";
import queryString from "query-string";

export interface SearchProps {
  users: Array<DataInterface>;
  allItems: Array<DataInterface>;
  query: { page: string };
}

interface ItemInterface {
  number: number;
  active?: boolean;
}

export async function getServerSideProps({ query }: SearchProps) {
  const axios = require("axios").default;
  const responseFirst = await axios.get(urlItems);
  const users = responseFirst.data;
  const responseSecond = await axios.get(urlItems);
  const allItems = responseSecond.data;

  return {
    props: { users, allItems, query }, // will be passed to the page component as props
  };
}

interface Response<T> {
  status: string;
  data: T;
}

export default function Search({
  users,
  allItems,
}: SearchProps): React.ReactElement {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState<number>(1);
  const [currentId, setCurrentId] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Array<DataInterface>>();
  const [submitData, setSubmitData] = useState<any>();
  const [submit, setSubmit] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [allPath, setAllPath] = useState<string>("");
  const sortedItems: Array<DataInterface> | undefined = useTypedSelector(
    (state) => state.users["sortedItems"]
  );
  let userOptions: any = {};
  for (let key in users[0].options) {
    userOptions[key] = users[0].options[key as any];
  }

  const router = useRouter();

  const filteredItemsPath = router.asPath.slice(7);
  const parsedPath = queryString.parse(filteredItemsPath);

  function generatePath() {
    let finalPath = "search?";

    for (let key in submitData) {
      if (submitData[key].length > 0) {
        finalPath += `${key}=${submitData[key]}&`;
      }
    }

    return finalPath;
  }

  let itemsP: Array<ItemInterface> = [];
  let sortedItemsP: Array<ItemInterface> = [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: parsedPath,
  });

  useEffect(() => {
    if (sortedItems) {
      setAllPath(sortedItems.map((item, index) => `id=${item.id}&`).join(""));
    }
  }, [sortedItems, allPath]);

  useEffect(() => {
    if (submitData !== undefined) {
      const path = generatePath();

      router.push(path);
    }

    if (sortedItems && sortedItems.length > 0 && allPath.length > 0) {
      SearchApi.getCard(`${urlItems}/?${allPath}_page=${activePage}&_limit=2`)
        .then((resp: any) => {
          console.log(`${urlItems}/?${allPath}_page=${activePage}&_limit=2`);
          console.log("activePage", activePage);
          setFilteredItems(resp.data);
        })

        .catch((err: Error) => console.log(err));
    }
  }, [sortedItems, activePage, submit, allPath]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newObj: any = {
      body: "",
      brand: "",
      contacts: "",
      mileage_from: "",
      mileage_to: "",
      model: "",
      name: "",
      price_from: "",
      price_to: "",
      productionYear: "",
    };

    for (let key in parsedPath) {
      if (parsedPath[key]!.length > 0) {
        newObj[key] = parsedPath[key];
      }
    }

    dispatch(filterItem(newObj));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any) => {
    setActivePage(1);
    setSubmit(true);
    setSubmitData(data);

    if (data.body === "all") {
      data.body = "";
    }

    if (data !== undefined) {
      dispatch(filterItem(data));
    }
  };

  useEffect(() => {
    if (sortedItems?.length === 0 && submit) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedItems]);

  const onClickPage = (item: ItemInterface) => {
    setActivePage(item.number);
    const path = generatePath();

    router.push(`${path}_page=${item.number}&_limit=2`);

    dispatch(activePageManager(item.number));
  };

  useEffect(() => {
    dispatch(setItems(users));
  }, [sortedItems, activePage]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleItems(currId: string) {
    let isDelete = confirm("Действительно удалить?");

    if (isDelete) {
      setCurrentId(currId);
      const currUser: Array<DataInterface> = users.filter((item) => {
        return item.id === currId;
      });

      Api.deleteCard(urlItems, currId, currUser)
        .then(() => onSubmit(submitData))
        .catch((err: Error) => console.log(err));
    }
  }

  for (let number = 1; number <= Math.ceil(allItems.length / 2); number++) {
    itemsP.push({ number: number, active: number === activePage });
  }

  for (let number = 1; number <= Math.ceil(sortedItems!.length / 2); number++) {
    sortedItemsP.push({ number: number, active: number === activePage });
  }

  useEffect(() => {
    if (filteredItems?.length === 0 && itemsP.length > 0) {
      setActivePage((prev) => prev - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems, sortedItems]);

  if (itemsP.length !== sortedItemsP.length) {
    itemsP.length = 0;
    if (
      sortedItemsP[sortedItemsP.length - 1] &&
      sortedItemsP[sortedItemsP.length - 1].active === false
    ) {
      sortedItemsP.pop();
    }
    itemsP.push(...sortedItemsP);
  }

  console.log("itemsP", itemsP);
  console.log("sortedItemsP", sortedItemsP);

  console.log("sortedItems", sortedItems);
  console.log("filteredItems", filteredItems);

  return (
    <MainContainer keywords={"search"}>
      <Head>
        <meta></meta>
        <title>Найти</title>
      </Head>
      {!sortedItems && <h1 className={styles.selectFilter}>Выберите фильтр</h1>}
      <A href="/" text="Назад" />

      <div className={styles.filterBlock}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit as any)}>
          <BaseForm
            errors={errors}
            register={register}
            fileSettings={{}}
            inputType={false}
            validation={false}
            filterChanges={true}
            description={false}
          />
          <FeatureForm
            errors={errors}
            register={register}
            filterChanges={true}
          />
          <Button className={styles.button} type="submit" variant="info">
            Отобразить данные
          </Button>{" "}
        </form>

        <div className={styles.allCards}>
          {filteredItems && !empty ? (
            filteredItems.map((item, index) => (
              <Card className={styles.card} key={index}>
                <Card.Img
                  className={styles.cardImg}
                  variant="top"
                  src={item.img}
                />
                <Card.Body>
                  {item.technical_characteristics && (
                    <div className={styles.cardBody}>
                      <Card.Title>Технические характеристики</Card.Title>
                      <Card.Text>
                        Марка: {item.technical_characteristics.brand}
                      </Card.Text>
                      <Card.Text>
                        Модель: {item.technical_characteristics.model}
                      </Card.Text>
                      <Card.Text>
                        Год выпуска:{" "}
                        {item.technical_characteristics.productionYear}
                      </Card.Text>
                      <Card.Text>
                        Кузов: {item.technical_characteristics.body}
                      </Card.Text>
                      <Card.Text>
                        Пробег: {item.technical_characteristics.mileage} км
                      </Card.Text>
                    </div>
                  )}

                  <Card.Text className={styles.cardTitle}>
                    Навание: {item.name}
                  </Card.Text>
                  <Card.Text>Описание: {item.description}</Card.Text>
                  <Card.Text>Контакты: {item.contacts}</Card.Text>
                  <Card.Text>Цена: {item.price} долларов</Card.Text>

                  {Object.keys(userOptions).length > 0 ? (
                    <Card.Text>Дополнительные опции:</Card.Text>
                  ) : null}

                  {Object.keys(userOptions).map((key) => (
                    <Card.Text key={key}>
                      {key}: {userOptions[key]}{" "}
                    </Card.Text>
                  ))}

                  <Link href={`/manager/${item.id}`} passHref>
                    <Button className={styles.buttonEdit} variant="primary">
                      Перейти к редактированию
                    </Button>
                  </Link>

                  <Button
                    className={styles.buttonEdit}
                    variant="danger"
                    onClick={() => handleItems(String(item.id))}
                  >
                    Удалить
                  </Button>
                  <div className={styles.moreButton}>
                    <A
                      href={`/view/${item.id}`}
                      text={"Подробнее"}
                      key={item.id}
                    />
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Alert>
              <Alert.Heading>Упс... Не было найдено </Alert.Heading>
              <p>Попробуйте проверить параметры поиска</p>
            </Alert>
          )}
        </div>
      </div>
      {sortedItems && sortedItems.length && (
        <Pagination className={styles.paginationBlock}>
          {itemsP.length > 1 &&
            itemsP.map((item, index) => (
              <Pagination.Item
                key={index}
                active={activePage === item.number}
                onClick={() => onClickPage(item)}
              >
                {item.number}
              </Pagination.Item>
            ))}
        </Pagination>
      )}
    </MainContainer>
  );
}
