import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";
import { AudioPlayerProvider } from "../src/provider/audio-player";
// import PageLayout from '../src/layouts/page-layout';
import { ThemeProvider } from "next-themes";
// import { AppWeb3Provider } from '../src/provider/app-web3';
import { ThirdwebProvider as ThirdProvider } from "@3rdweb/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { RinkeByChainID } from "../src/constants";
import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <ThirdProvider
        supportedChainIds={RinkeByChainID}
        connectors={{
          injected: {},
        }}
      >
        <AudioPlayerProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer />
          </ThemeProvider>
        </AudioPlayerProvider>
      </ThirdProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
