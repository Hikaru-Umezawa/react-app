import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { useMessage } from "./useMessage";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (email: string, password: string) => {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .catch(() => {
          showMessage({ title: "ログインに失敗しました。", status: "error" });
        })
        .then((user) => {
          if (user) {
            showMessage({ title: "ログインに成功しました。", status: "success" });
            history.push("/home");
          }
        })
        .finally(() => {
          setLoading(false);
        })
    },
    [history, showMessage]
  );
  return { loading, login };
};
