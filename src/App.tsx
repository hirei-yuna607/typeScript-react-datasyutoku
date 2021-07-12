import axios from "axios";
import { useState } from "react";
import { UserCard } from "./components/UserCard";
import { User } from "./types/api/User";
import { UserProfiel } from "./types/UserProfiel";

export default function App() {
  // userの情報
  const [userProfiels, setUserProfiels] = useState<Array<UserProfiel>>([]);
  // loadingの情報
  const [loading, setLoading] = useState(false);
  // errorの情報
  const [error, setError] = useState(false);

  const onClickFetchData = () => {
    // api呼ぶ前にloadingをtrue、error情報をfalse(初期化)する
    setLoading(true);
    setError(false);

    // apiコールの部分
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiels(data);
      })
      .catch(() => {
        setError(true);
      })
      // errorだろうが何だろうが、最終的に実行するもの
      // loadingをfalseにする
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchData}>ユーザー情報からデータを抽出</button>
      <br />
      {/* 
      エラーがtrueだった場合、エラーメッセージを表示
      エラーじゃなかった場合、loadingの三項演算子に移る
      loadingがtrueだった場合、ロード中と表示
      falseになったら、apiで取得したデータを表示
       */}
      {error ? (
        <p style={{ color: "#ff0000" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>ロード中</p>
      ) : (
        <>
          {userProfiels.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </>
      )}
    </div>
  );
}
