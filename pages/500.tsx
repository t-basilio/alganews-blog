import { styled } from "styled-components";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../_constants";
import Image from "next/image";
import ServerErrorImage from "../public/server_error.svg";
import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
      <Wrapper>
          <Head>
              <title>Erro interno - 500</title>
          </Head>
      <Image
        src={ServerErrorImage}
        width={300}
        height={300}
        objectFit="contain"
        alt="não encontrado"
      />
      <h1>Erro interno</h1>
      <p>O estagiário desconectou um cabo errado</p>
      <Link legacyBehavior href={"/"} passHref>
        <BackToHome>Tentar acessar a Home</BackToHome>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 34px;

  min-height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`;

const BackToHome = styled.a`
  color: ${(p) => p.theme.primaryBackground};
  text-decoration: none;
`;
