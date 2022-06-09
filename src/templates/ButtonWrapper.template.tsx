import styled from "styled-components";

const ButtonWrapper = styled.button`
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  border: 1px solid #e0e0e0;
  align-items: center;
  border-radius: 16px;
  transition: all 0.4s linear;
  height: auto;
  &:hover {
    background: linear-gradient(145deg, #dadada, #ffffff);
    box-shadow: 0 0 29px #bdbdbd, -15px -15px 29px #ffffff;
  }
`;

export default ButtonWrapper;
