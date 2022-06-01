import { gql, useQuery } from "@apollo/client";
import { SeeMeQuery } from "../generated/generated";
import { removeToken } from "../variables";

const SEEME_QUERY = gql`
  query seeMe {
    seeMe {
      id
      username
      avatar
      email
    }
  }
`;

const useMe = () => {
  const { data, loading } = useQuery<SeeMeQuery>(SEEME_QUERY);
  if (!loading && typeof data != "undefined" && !data?.seeMe) {
    removeToken();
  }
  return data;
};

export default useMe;
