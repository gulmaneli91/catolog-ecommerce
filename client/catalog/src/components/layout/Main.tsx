import styled from "styled-components";

const MainWrapper = styled.main`
  padding: 2rem;
  min-height: 80vh;
  background: #f9f9f9;
`;

export default function Main({ children }: { children: React.ReactNode }) {
  return <MainWrapper>{children}</MainWrapper>;
}
