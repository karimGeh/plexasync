import { SideBarTabs } from "./Tabs";

class Paths {
  //! general
  // static readonly home = "/";
  static readonly hmis = "/hmis";
  static readonly devices = "/devices";
  static readonly drivers = "/drivers";
  static readonly users = "/users";
  static readonly settings = "/settings";

  //! single
  static readonly hmisSingle = (id: string = ":id"): string =>
    `${Paths.hmis}/${id}`;
  static readonly devicesSingle = (id: string = ":id"): string =>
    `${Paths.devices}/${id}`;

  //! default
  static readonly default = this.hmis;

  //! functions
  static activeTab = (): string => {
    const pathname = window.location.pathname;
    if (pathname.startsWith(Paths.hmis)) return SideBarTabs.hmis;
    if (pathname.startsWith(Paths.devices)) return SideBarTabs.devices;
    if (pathname.startsWith(Paths.drivers)) return SideBarTabs.drivers;
    if (pathname.startsWith(Paths.users)) return SideBarTabs.users;
    if (pathname.startsWith(Paths.settings)) return SideBarTabs.settings;

    return SideBarTabs.hmis;
  };
}

export default Paths;
