import { Box, Button, Divider, Flex, Heading, Input, InputGroup, InputRightElement, Link, Stack } from "@chakra-ui/react";
import React, { memo, useCallback, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { ChangeEvent } from "react-router/node_modules/@types/react";
import { useRegister } from "../../hooks/useRegister";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Register: VFC = memo(() => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false)
  const history = useHistory();
  const { loading, register } = useRegister();
  const handleClick = () => setShow(!show)
  const onChangeMail = (e: ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const onClickLoginLink = useCallback(
    () => {
      history.push("/");
    },
    [history],
  )

  const onClickRegister = () => register(mail, password);

  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            新規登録
          </Heading>
          <Divider my={4} />
          <Stack spacing={6} py={4} px={10}>
            <Input
              type="mail"
              placeholder="メールアドレス"
              value={mail}
              onChange={onChangeMail}
            />
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="パスワード"
                value={password}
                onChange={onChangePassword}
              />
              <InputRightElement>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? '隠す' : '確認'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <PrimaryButton
              loading={loading}
              disabled={mail === "" || password === ""}
              onClick={onClickRegister}
            >
              新規登録
            </PrimaryButton>
            <Link textAlign="center" color="blue.300" onClick={onClickLoginLink}>ログインはこちら</Link>
          </Stack>
        </Box>
      </Flex>
    </>
  )
});
