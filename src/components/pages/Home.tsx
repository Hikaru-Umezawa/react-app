import { Flex, Box, Heading } from "@chakra-ui/layout";
import React, { memo, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { useMessage } from "../../hooks/useMessage";
import { PrimaryButton } from "../atoms/button/PrimaryButton";


export const Home: VFC = memo(() => {
  const history = useHistory();

  /* useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? setEmail(user.email) : history.push("/");
    })
    return () => {
    }
  }, [history]) */
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Home
        </Heading>
      </Box>
    </Flex>
  );
});
