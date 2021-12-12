import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
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
            console.log(user);
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
