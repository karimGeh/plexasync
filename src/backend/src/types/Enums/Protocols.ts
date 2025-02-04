export enum Protocols {
  MODBUS = "modbus-tcp",
}

export interface MODBUS__ProtocolParamsType {
  port: number;
  unit_ip: string;
  timeout: number;
  retries: number;
  reconnect_interval: number;
  byte_order: "big-endian" | "little-endian";
  use_tls: boolean;
}

export type ProtocolParamsType<T extends Protocols> = T extends Protocols.MODBUS
  ? MODBUS__ProtocolParamsType
  : never;

export enum MODBUS__RegisterMap__RegistersType__type {
  INT16 = "int16",
  UINT16 = "uint16",
  INT32 = "int32",
  UINT32 = "uint32",
  FLOAT32 = "float32",
  FLOAT64 = "float64",
  WORD16 = "word16",
  DWORD32 = "dword32",
  LWORD64 = "lword64",
  STRING = "string",
  HEX_STRING = "hex_string",
  BINARY_STRING = "binary_string",
  BOOLEAN = "boolean",
}

export interface MODBUS__RegisterMap__InputRegistersType {
  id: string;
  name: string;
  address: number;
  type: MODBUS__RegisterMap__RegistersType__type;
  scale: number;
  offset: number;
}

export interface MODBUS__RegisterMap__HoldingRegistersType {
  id: string;
  name: string;
  address: number;
  type: MODBUS__RegisterMap__RegistersType__type;
  scale: number;
  offset: number;
  writable: boolean;
  min: number;
  max: number;
  default: number;
  unit: string;
  description: string;
  tags: string[];
}

export interface MODBUS__RegisterMap__CoilsType {
  id: string;
  name: string;
  address: number;
  writable: boolean;
  default: boolean;
  description: string;
  tags: string[];
}

export interface MODBUS__RegisterMap__DiscreteInputsType {
  id: string;
  name: string;
  address: number;
  default: boolean;
  description: string;
  tags: string[];
}

export interface MODBUS__ConfigurationType {
  register_map: {
    input_registers: MODBUS__RegisterMap__InputRegistersType[];
    holding_registers: MODBUS__RegisterMap__HoldingRegistersType[];
    coils: MODBUS__RegisterMap__CoilsType[];
    discrete_inputs: MODBUS__RegisterMap__DiscreteInputsType[];
  };
}

export type ConfigurationType<T extends Protocols> = T extends Protocols.MODBUS
  ? MODBUS__ConfigurationType
  : never;
