import { Button, Card, Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import A from '../components/A';
import Head from 'next/head';
import { useTypedSelector } from '../store/hooks/useTypesSelector';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataInterface } from '../decompose/dataFormation';
import { MainContainer } from '../components/MainContainer';
import { activePageManager, removeItem, setItems } from '../store/actions/items';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { urlItems } from '../consts/urlItems';
import styles from '../styles/Manager.module.scss';
import { Api } from './api/Api';

export interface ListProps {
  users: Array<DataInterface>;
  allItems: Array<DataInterface>;
  query: { page: string };
}

const limitPage = 2;

export async function getServerSideProps({ query }: ListProps) {
  const axios = require('axios').default;
  const responseFirst = await axios.get(
    `${urlItems}?_page=${Number(query.page)}&_limit=${limitPage}`,
  );
  const users = responseFirst.data;

  const responseSecond = await axios.get(urlItems);
  const allItems = responseSecond.data;

  return {
    props: { users, allItems, query }, // will be passed to the page component as props
  };
}

interface ListPropsInterface {
  users: Array<DataInterface>;
  allItems: Array<DataInterface>;
}

interface ItemInterface {
  number: number;
  active?: boolean;
}

export default function List({ users, allItems }: ListPropsInterface): React.ReactElement {
  let userOptions: any = {};
  for (let key in users[0].options) {
    userOptions[key] = users[0].options[key as any];
  }

  console.log('userOptions', userOptions);

  const [currentId, setCurrentId] = useState<string>('');
  const items: Array<DataInterface> = useTypedSelector((state) => state.users['items']);
  const router = useRouter();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState<number>(1);

  let itemsP: Array<ItemInterface> = [];
  for (let number = 1; number <= Math.ceil(allItems.length / limitPage); number++) {
    itemsP.push({ number: number, active: number === activePage });
  }

  useEffect(() => {
    let flag = 0;

    if (items.length === 0 && activePage === itemsP.length && itemsP.length !== 1) {
      router.push('/manager?page=' + (activePage - 1));
      setActivePage(activePage - 1);
      flag = 1;
    }

    if (flag === 0) {
      if (items.length === 0 && itemsP.length !== 0) {
        router.push('/manager?page=' + activePage);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, activePage]);

  function handleItems(currId: any) {
    let isDelete = confirm('Действительно удалить?');
    if (isDelete) {
      setCurrentId(currId);
      const currUser: Array<DataInterface> = users.filter((item) => {
        return item.id === currId;
      });

      Api.deleteCard(urlItems, currId, currUser)
        .then(() => dispatch(removeItem(true)))
        .catch((err: Error) => console.log(err));
    }
  }

  useEffect(() => {
    dispatch(setItems(users));
  }, [users]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickPage = (item: ItemInterface) => {
    console.log('item number', item.number);
    router.push('/manager?page=' + item.number);
    setActivePage(item.number);
    dispatch(activePageManager(item.number));
  };

  if (users.length === 0) {
    return (
      <MainContainer keywords={'cars'}>
        <div className={styles.noData}>
          Ничего не нашлось. <br />
          Добавьте автомобили
        </div>
      </MainContainer>
    );
  }

  console.log('userOptions', userOptions);

  return (
    <MainContainer keywords={'cars'}>
      <Head>
        <title>Список пользователей</title>
      </Head>

      <A href="/" text="Назад" />

      <div className={styles.cards}>
        {users ? (
          users
            .filter((item) => item.id !== currentId)
            .map((item, index: number) => {
              console.log('item', item);

              return (
                <Card className={styles.card} key={index}>
                  <Card.Img className={styles.cardImg} variant="top" src={item.img} />
                  <Card.Body>
                    {item.hasOwnProperty('technical_characteristics') ? (
                      <div className={styles.cardBody}>
                        <Card.Title>Технические характеристики</Card.Title>
                        {item.technical_characteristics && (
                          <>
                            <Card.Text>Марка: {item.technical_characteristics.brand}</Card.Text>
                            <Card.Text>Модель: {item.technical_characteristics.model}</Card.Text>
                            <Card.Text>
                              Год выпуска: {item.technical_characteristics.productionYear}
                            </Card.Text>
                            <Card.Text>Кузов: {item.technical_characteristics.body}</Card.Text>
                            <Card.Text>
                              Пробег: {item.technical_characteristics.mileage} км
                            </Card.Text>
                          </>
                        )}
                      </div>
                    ) : null}

                    <Card.Text className={styles.cardTitle}>Навание: {item.name}</Card.Text>
                    <Card.Text>Контакты: {item.contacts}</Card.Text>
                    <Card.Text>Описание: {item.description}</Card.Text>
                    <Card.Text>Цена: {item.price} долларов</Card.Text>
                    {Object.keys(userOptions).length > 0 ? (
                      <Card.Text style={{ fontWeight: 'bold' }}>Дополнительные опции:</Card.Text>
                    ) : null}

                    {Object.keys(userOptions).map((key) => (
                      <Card.Text key={key}>
                        {key}: {userOptions[key]}{' '}
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
                      onClick={() => handleItems(item.id)}>
                      Удалить
                    </Button>
                    <div className={styles.moreButton}>
                      <A href={`/view/${item.id}`} text={'Подробнее'} key={item.id} />
                    </div>
                  </Card.Body>
                </Card>
              );
            })
        ) : (
          <div>Ничего нет</div>
        )}
      </div>

      {items.length && (
        <Pagination className={styles.pagination}>
          {itemsP.length > 1 &&
            itemsP.map((item, index) => {
              return (
                <Pagination.Item
                  key={index}
                  active={activePage === item.number}
                  onClick={() => onClickPage(item)}>
                  {item.number}
                </Pagination.Item>
              );
            })}
        </Pagination>
      )}
    </MainContainer>
  );
}
