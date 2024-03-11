export interface FrontendLayoutSettingsType {
  [key: string]: string | number | boolean | FrontendLayoutSettingsType | null;
}

export interface HMIType {
  id: string;
  name: string;
  cover_uri: string;
  owner_id: string;

  variables: string[];
  frontend_layout: string;
  frontend_layout_settings: FrontendLayoutSettingsType;
}
