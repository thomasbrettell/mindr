import Layout from "./components/Layout";
import {Route, Switch, Redirect} from "react-router-dom";
import InitialPage from "./pages/Initial/InitialPage";
import JoinPage from "./pages/Join/JoinPage";
import {useSelector, useDispatch} from "react-redux";
import {appActions} from "./store/app-slice";
import {useHistory} from "react-router";
import RoomPage from "./pages/Room/RoomPage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const appIsLoaded = useSelector((state) => state.app.appIsLoaded);

  if (!appIsLoaded) {
    history.replace("/");
    dispatch(appActions.SET_INITIAL_LOAD());
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <InitialPage />
        </Route>
        <Route path="/join" exact>
          <JoinPage />
        </Route>
        <Route path="/room" exact>
          <RoomPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
