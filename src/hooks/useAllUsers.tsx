/* eslint-disabled react-hooks/exhaustive-deps */
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase";

import { useMessage } from "./useMessage";
export const useAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<DocumentData[]>([]);
  const { showMessage } = useMessage();

  const getUsers = useCallback(async () => {
    const userList: DocumentData[] = [];
    setLoading(true);
    await
      getDocs(collection(db, "users"))
        .then((res) => res.forEach((doc) => {
          userList.push(doc.data())
        }))
        .catch(() => {
          showMessage({ title: "ユーザーの取得に失敗しました", status: "error" });
        })
        .finally(() => {
          setLoading(false);
        })
    setUsers(userList);
  }, []);

  return { getUsers, users, loading };
};
