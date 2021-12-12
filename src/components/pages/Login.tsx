import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import React, { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login: VFC = memo(() => {
  const [userId, setUserId] = useState("");
  const { login, loading } = useAuth();
  const history = useHistory();

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);
  const onClickLogin = () => login(userId);
  const onClickRegisterLink = useCallback(() => {
    history.push("/register");
  }, [history]);
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton
            type="button"
            loading={loading}
            disabled={userId === ""}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          <Link textAlign="center" color="blue.300" onClick={onClickRegisterLink}>新規登録はこちら</Link>
        </Stack>
      </Box>
    </Flex>
  );
});
