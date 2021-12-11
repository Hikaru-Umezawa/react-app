import { useState } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


import { useMessage } from "./useMessage";

export const useRegister = () => {
  const auth = getAuth(firebase);
  const history = useHistory();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  let message: string;


  const signUp =
    (mail: string, password: string) => {
      createUserWithEmailAndPassword(auth, mail, password)
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
