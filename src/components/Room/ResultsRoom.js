import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  VStack,
  Button,
} from "@chakra-ui/react";
import ResultsTableResult from "./ResultsTableResult";
import {useHistory} from "react-router";

const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const aProp = a[property] || 0;
    const bProp = b[property] || 0;

    const result = aProp < bProp ? 1 : aProp > bProp ? -1 : 0;
    return result * sortOrder;
  };
};

const ResultsRoom = (props) => {
  const {roomData} = props;
  const totalApprovals = roomData.users.length;
  const history = useHistory();
  const sortedResponses = roomData.responses.sort(dynamicSort("approvals"));

  const leaveHandler = () => {
    history.push("/");
  };

  return (
    <VStack spacing={6}>
      <Box w="full" boxShadow="xs" p="2" rounded="md" backgroundColor="gray.50">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Movie</Th>
              <Th>Approvals</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedResponses.map((response) => (
              <ResultsTableResult
                key={response.id}
                id={response.id}
                approvals={response.approvals}
                totalApprovals={totalApprovals}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
      <Button colorScheme="purple" onClick={leaveHandler}>
        Leave room
      </Button>
    </VStack>
  );
};

export default ResultsRoom;
