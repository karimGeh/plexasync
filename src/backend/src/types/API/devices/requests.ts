export interface CreateDeviceRequestType {
  name: string;
  driver_id: string;
  ip_address: number[];
  port: number;
  tags?: string[];
}
