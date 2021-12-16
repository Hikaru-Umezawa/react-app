import { DocumentData } from "@firebase/firestore";
import { useCallback, useState } from "react";


type Props = {
  id: number;
  users: Array<DocumentData>;
  onOpen: () => void;
};

//選択したユーザー情報を特定し、モーダルを開くカスタムフック
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<DocumentData | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find((user) => user.id === id);
    setSelectedUser(targetUser!);
    onOpen();
  }, []);
  return { onSelectUser, selectedUser };
};
