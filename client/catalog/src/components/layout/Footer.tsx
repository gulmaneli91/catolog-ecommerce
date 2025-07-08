import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #222;
  color: #fff;
  text-align: center;
  padding: 1rem;
`;

export default function Footer() {
  return <FooterWrapper>© {new Date().getFullYear()} Catálogo E-commerce</FooterWrapper>;
}
