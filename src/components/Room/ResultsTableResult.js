import {Tr, Td, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import getMovieDataById from "../../utils/getMovieDataById";

const ResultsTableResult = (props) => {
  const {id, totalApprovals, approvals} = props;
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setMovieData(await getMovieDataById(id));
    };
    fetchData();
  }, [id]);

  return (
    <Tr>
      <Td>
        <Text>{movieData && movieData.title}</Text>
      </Td>
      <Td>
        <Text>{movieData && `${approvals || 0}/${totalApprovals}`}</Text>
      </Td>
    </Tr>
  );
};

export default ResultsTableResult;
