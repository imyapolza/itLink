import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Container, Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setItems } from "../store/actions/items";
import { Context } from "next-redux-wrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataInterface } from "../decompose/dataFormation";
import { MainContainer } from "../components/MainContainer";
import { urlItems } from "../consts/urlItems";

interface HomeProps {
  users: Array<DataInterface>;
}

export async function getServerSideProps(context: Context) {
  const axios = require("axios").default;
  const response = await axios.get(urlItems);
  const users = response.data;

  return {
    props: { users }, // will be passed to the page component as props
  };
}

const Home: NextPage<HomeProps> = ({ users }): React.ReactElement => {
  const dispatch = useDispatch();
  const picturesCarousel = [
    {
      link: "https://images.unsplash.com/photo-1596796266529-04400e7077f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      descr: "Можно просматривать",
    },
    {
      link: "https://images.unsplash.com/photo-1596463152524-ca392d510adf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      descr: "Можно добавлять",
    },
    {
      link: "https://images.unsplash.com/photo-1596463621264-26fa44b7a2bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      descr: "Можно удалять",
    },
  ];

  useEffect(() => {
    dispatch(setItems(users));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainContainer keywords={"main"}>
      <Head>
        <meta></meta>
        <title>Главная страница</title>
      </Head>

      <Container>
        <Carousel style={{ marginTop: "30px" }}>
          {picturesCarousel &&
            picturesCarousel.map((obj, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={obj.link}
                  alt={`${index}_carousel`}
                />
                <Carousel.Caption>
                  <h3>{obj.descr}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
        </Carousel>
      </Container>
    </MainContainer>
  );
};

export default Home;
