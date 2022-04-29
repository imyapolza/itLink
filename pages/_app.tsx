import "../styles/globals.scss";
import { wrapper } from "../store";

// This default export is required in a new `pages/_app.js` file.
const WrappedApp = function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(WrappedApp);
