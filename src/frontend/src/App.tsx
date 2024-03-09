import { RootRouter } from "./routes";
import { ConfigProvider, theme } from "antd";

import "styles/index.scss";
import "styles/font.scss";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootStateType } from "./store/types";
import { GlobalState } from "./store/reducers/global";

function App() {
  const { theme: globalTheme } = useSelector<RootStateType, GlobalState>(
    (state) => state.global
  );
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: [
            globalTheme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          ],
          //   token: {
          //     colorPrimary: "#eb2f96",
          //     colorInfo: "#eb2f96",
          //     colorBgBase: "#12101B",
          //     wireframe: false,
          //   },
          //   components: {
          //     Drawer: {
          //       colorBgElevated: "#16141F",
          //       colorBgMask: "rgba(0, 0, 0, 0.8)",
          //     },
          //   },
        }}
      >
        <RootRouter />
      </ConfigProvider>
    </>
  );
}

export default App;
