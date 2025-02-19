import { styled } from "styled-components";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../_constants";
import Image from "next/image";
import NotFoundImage from "../public/not_found.svg";
import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <Wrapper>
      <Head>
        <title>Página não encontrada - 404</title>
      </Head>
      <Image
        src={NotFoundImage}
        width={300}
        height={300}
        objectFit="contain"
        alt="não encontrado"
      />
      <h1>Página não encontrada</h1>
      <Link legacyBehavior href={"/"} passHref>
        <BackToHome>Voltar para a home</BackToHome>
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
