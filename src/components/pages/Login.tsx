import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import React, { ChangeEvent, memo, useCallback, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { PrimaryButton } from "../atoms/button/PrimaryButton";

type data = {
  email: string;
  password: string;
}

export const Login: VFC = memo(() => {
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const history = useHistory();
  const { handleSubmit, register, formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: "all" });

  const onClickRegisterLink = useCallback(() => {
    history.push("/register");
  }, [history]);
  const handleClickShow = () => setShow(!show);
  const onSubmit = (data: data) => {
    login(data.email, data.password);
  }
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} py={4} px={10}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="メールアドレス"
                {...register("email", {
                  required: "メールアドレスは必須です。",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "メールアドレス形式で入力してください。",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>パスワード</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="パスワード"
                  {...register("password", {
                    required: "パスワードは必須です。",
                  })}
                />
                <InputRightElement>
                  <Button h='1.75rem' size='sm' onClick={handleClickShow}>
                    {show ? '隠す' : '確認'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <PrimaryButton
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              ログイン
            </PrimaryButton>
            <Link textAlign="center" color="blue.300" onClick={onClickRegisterLink}>新規登録はこちら</Link>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
});
