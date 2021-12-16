import { Flex, Box } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { HealthTable } from "../molecules/HealthTable";

export const Home: VFC = memo(() => {

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="80%" p={4} borderRadius="md" shadow="md">
        <HealthTable />
      </Box>
    </Flex >
  );
});
