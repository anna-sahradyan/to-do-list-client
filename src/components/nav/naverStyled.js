import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  margin: 20px;
  text-align: center;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 25px;
  color: wheat;

  & b {
    color: #267cb5;
    font-weight: 800;
    font-size: 25px;
  }
`;
export const Img = styled.img`
  width: 40px;
`;
export const Logo = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
`;
export const InnerHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;