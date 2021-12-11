import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack } from "@chakra-ui/react";
import { memo, useCallback, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useForm } from "react-hook-form";

export const Register: VFC = memo(() => {
  const [show, setShow] = useState(false)
  const history = useHistory();
  const { signUp } = useRegister();
  const { handleSubmit, register, formState: { errors, isSubmitting, isValid } } = useForm({ mode: "all" });
  const handleClick = () => setShow(!show)

  const onClickLoginLink = useCallback(
    () => {
      history.push("/");
    },
    [history],
  )

  type data = {
    email: string;
    password: string;
  }

  const onSubmit = (data: data) => {
    signUp(data.email, data.password)
  };
  ;

  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            新規登録
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
                      minLength: { value: 6, message: "パスワードが短すぎます。6文字以上で入力してください。" }
                    })}
                  />
                  <InputRightElement>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
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
                新規登録
              </PrimaryButton>
              <Link textAlign="center" color="blue.300" onClick={onClickLoginLink}>ログインはこちら</Link>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  )
});
