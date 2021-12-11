import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


import { useMessage } from "./useMessage";
//import { useLoginUser } from "./useLoginUser";

export const useRegister = () => {
  const auth = getAuth(firebase);
  const history = useHistory();
  const { showMessage } = useMessage();
  //const { setLoginUser } = useLoginUser();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("null");

  const register = useCallback(
    (mail: string, password: string) => {
      setLoading(true);
      createUserWithEmailAndPassword(auth, mail, password)
        .then((res) => {
          if (res.user) {
            showMessage({ title: "新規登録しました", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "新規登録に失敗しました", status: "error" });
            setLoading(false);
          }
        })
        .catch((e) => {
          const errorCode = e.code;
          switch (errorCode) {
            case "auth/network-request-failed":
              setMessage("通信環境がいい所で再度やり直してください。");
              break;
            case "auth/weak-password":  //todo:バリデーション
              setMessage("パスワードが短すぎます。6文字以上を入力してください。");
              break;
            case "auth/invalid-email":  //todo:バリデーション
              setMessage("メールアドレスが正しくありません");
              break;
            case "auth/email-already-in-use":
              setMessage("メールアドレスがすでに使用されています。");
              break;
            default:
              setMessage("新規登録に失敗しました")
          }
          showMessage({ title: message, status: "error" });
          setLoading(false);
        });
    },
    [history, showMessage, auth, message]
  );
  return { loading, register };
};
