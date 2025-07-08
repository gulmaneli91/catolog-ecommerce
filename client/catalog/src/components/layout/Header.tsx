import Navbar from "../Navbar";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background: #222;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Navbar />
    </HeaderWrapper>
  );
}
