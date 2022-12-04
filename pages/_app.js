import Layout from "../components/layout";
import "../styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import { actions, store } from "../redux";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Init />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

function Init() {
  const dispatch = useDispatch();
  useEffect(() => {
    const existItemListInLS = localStorage.getItem("itemList");
    const existItemList = existItemListInLS
      ? JSON.parse(existItemListInLS)
      : [];
    dispatch(actions.cart.update(existItemList));
  }, []);

  return <></>;
}

export default MyApp;
