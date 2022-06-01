import styled from "styled-components/native";
import Loading from "./Loading";

const LoadingContainer = styled.View`
  height: 50px;
`;

const BottomLoading = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  ) : null;
};

export default BottomLoading;
