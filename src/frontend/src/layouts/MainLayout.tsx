import {
  DesktopOutlined,
  // FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Switch } from "antd";
import { SideBarTabs } from "../routes/Tabs";
import Paths from "../routes/paths";
import { useNavigate } from "react-router-dom";
import { RootStateType } from "../store/types";
import {
  GlobalState,
  toggleSideBar,
  toggleTheme,
} from "../store/reducers/global";
import { useDispatch, useSelector } from "react-redux";

import "styles/layouts/MainLayout.scss";

const { Content, Footer, Sider } = Layout;

const items = [
  {
    key: SideBarTabs.hmis,
    icon: <PieChartOutlined />,
    label: "HMIS",
    path: Paths.hmis,
  },
  {
    key: SideBarTabs.devices,
    icon: <DesktopOutlined />,
    label: "Devices",
    path: Paths.devices,
  },
  // {
  //   key: SideBarTabs.drivers,
  //   icon: <FileOutlined />,
  //   label: "Drivers",
  //   path: Paths.drivers,
  // },
  {
    key: SideBarTabs.users,
    icon: <TeamOutlined />,
    label: "Users",
    path: Paths.users,
  },
  {
    key: SideBarTabs.settings,
    icon: <UserOutlined />,
    label: "Settings",
    path: Paths.settings,
  },
];

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { theme: globalTheme, isSideBarCollapsed } = useSelector<
    RootStateType,
    GlobalState
  >((state) => state.global);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Layout style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      <Sider
        collapsible
        collapsed={isSideBarCollapsed}
        onCollapse={() => dispatch(toggleSideBar())}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          zIndex: 1,
        }}
      >
        <Menu
          theme={globalTheme}
          selectedKeys={[Paths.activeTab()]}
          mode="inline"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 4px",
          }}
          items={[
            ...items.map((item) => ({
              ...item,
              onClick: () => navigate(item.path),
            })),
            {
              key: "theme",
              label: "Theme",
              icon: (
                <Switch size="small" defaultChecked={globalTheme === "dark"} />
              ),
              onClick: () => {
                dispatch(toggleTheme());
                window.location.reload();
              },
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: isSideBarCollapsed ? "80px" : "200px",
          padding: "0 1rem 0 0",
        }}
      >
        <Content style={{ margin: "16px", height: "100%" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          PlexaSync ©{new Date().getFullYear()} Created by{" "}
          <Button
            type="link"
            href="https://www.linkedin.com/in/karim-gehad/"
            style={{ padding: 0, margin: 0, fontSize: "inherit" }}
          >
            Karim Gehad
          </Button>
        </Footer>
      </Layout>
    </Layout>
  );
};
