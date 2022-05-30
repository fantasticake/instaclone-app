import styled from "styled-components/native";

const FormBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.blue};
  width: 90%;
  height: 46px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

export default FormBtn;
