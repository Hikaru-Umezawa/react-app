import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


import { useMessage } from "./useMessage";

export const useRegister = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  let message: string;


  const signUp =
    (email: string, password: string) => {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .catch((e) => {
          switch (e.code) {
            case "auth/network-request-failed":
              message = "通信環境がいい所で再度やり直してください。";
              break;
            case "auth/weak-password":
              message = "パスワードが短すぎます。6文字以上を入力してください。";
              break;
            case "auth/invalid-email":
              message = "メールアドレスが正しくありません";
              break;
            case "auth/email-already-in-use":
              message = "メールアドレスがすでに使用されています。";
              break;
            default:
              message = "新規登録に失敗しました";
          }
          showMessage({ title: message, status: "error" });
        })
        .then((user) => {
          if (user) {
            showMessage({ title: "新規登録しました", status: "success" });
            history.push("/home");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
  return { loading, signUp };
};
