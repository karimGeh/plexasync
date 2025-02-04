import { Navigate, Route, Routes } from "react-router-dom";
import Paths from "./paths";
import { HMISPage } from "pages/hmis.page";
import { DevicesPage } from "pages/devices.page";
import { DriversPage } from "pages/drivers.page";
import { UsersPage } from "pages/users.page";
import { SettingsPage } from "pages/settings";
import { SingleDevicePage } from "pages/devices/single";
import { SingleHMIPage } from "pages/hmis/single";
import { HMIViewer } from "pages/HMIViewer";

export const RootRouter = () => {
  return (
    <Routes>
      {/* <Route path={Paths.home} element={<HomePage />} /> */}
      <Route path={Paths.hmis} element={<HMISPage />} />
      <Route path={Paths.devices} element={<DevicesPage />} />
      <Route path={Paths.drivers} element={<DriversPage />} />
      <Route path={Paths.users} element={<UsersPage />} />
      <Route path={Paths.settings} element={<SettingsPage />} />

      {/* singles */}
      <Route path={Paths.hmisSingle()} element={<SingleHMIPage />} />
      <Route path={Paths.devicesSingle()} element={<SingleDevicePage />} />

      {/* hmi */}
      <Route path={Paths.hmi()} element={<HMIViewer />} />

      {/* redirect to catch-all route */}
      <Route path="*" element={<Navigate to={Paths.default} />} />
    </Routes>
  );
};
export default RootRouter;
