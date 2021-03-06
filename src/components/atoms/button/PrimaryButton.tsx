import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  type: "button" | "submit";
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { type, children, disabled = false, loading = false, onClick } = props;

  return (
    <Button
      bg="teal.400"
      color="white"
      type={type}
      disabled={disabled || loading}
      isLoading={loading}
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
