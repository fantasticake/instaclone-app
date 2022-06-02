import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.borderColor};
`;

const BtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
`;

const MessageBtn = () => {
  return (
    <Button>
      <BtnTxt>Message</BtnTxt>
    </Button>
  );
};

export default MessageBtn;
