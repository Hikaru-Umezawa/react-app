import { Box, Image, Stack, Text } from "@chakra-ui/react";
import React, { memo, VFC } from "react";

type Props = {
  id: number;
  imageUrl: string;
  fullName: string;
  onClick: (id: number) => void;
};

export const UserCard: VFC<Props> = memo((props) => {
  const { id, imageUrl, fullName, onClick } = props;

  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl}
          alt={fullName}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {id}
        </Text>
        <Text fontSize="sm" color="gray">
          {fullName}
        </Text>
      </Stack>
    </Box>
  );
});
