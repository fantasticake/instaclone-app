import styled from "styled-components/native";

const FormInput = styled.TextInput`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  padding: 0 20px;
  border-radius: 6px;
  border: solid 1px ${(props) => props.theme.colors.borderColor};
  color: ${(props) => props.theme.colors.textColor};
  margin-bottom: 16px;
`;

export default FormInput;
