import Protected from "./components/Protected.jsx";
import Public from "./components/Public";

import useAuth from "./hooks/useAuth";

function App() {
  const [isLogin, token] = useAuth();
  console.log("isLogin : ", isLogin)
  console.log("token : ", token)
  return isLogin ? <Protected token ={token} /> : <Public />;
}

export default App;