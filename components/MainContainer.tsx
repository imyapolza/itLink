import Head from "next/head";
import { Container, Navbar, Nav } from "react-bootstrap";
import A from "./A";

interface MainContainerProps {
  children?: any;
  keywords: string;
}

export const MainContainer = ({ children, keywords }: MainContainerProps) => {
  return (
    <>
      <Head>
        <meta data-keywords={"test, nextjs" + keywords}></meta>
        <title>Главная страница</title>
      </Head>
      <Navbar bg="dark" variant="light">
        <Container>
          <Nav className="me-auto container__nav">
            <A href={"/"} text={"Главная"}></A>
            <A href={"/create"} text={"Создать"}></A>
            <A href={"/manager"} text={"Список"}></A>
            <A href={"/search"} text={"Найти"}></A>
          </Nav>
        </Container>
      </Navbar>
      <div>{children}</div>
    </>
  );
};
