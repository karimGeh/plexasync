export enum Protocols {
  MODBUS = "modbus-tcp",
}

export interface MODBUS__ProtocolParamsType {
  default__port: number;
  default__unit_ip: string;
  default__timeout: number;
  default__retries: number;
  default__reconnect_interval: number;
  default__byte_order: "big-endian" | "little-endian";
  default__use_tls: boolean;
}

export type ProtocolParamsType<T extends Protocols> = T extends Protocols.MODBUS
  ? MODBUS__ProtocolParamsType
  : never;

export enum MODBUS__RegisterMap__InputRegistersType__type {
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
  type: MODBUS__RegisterMap__InputRegistersType__type;
  scale: number;
  offset: number;
}

export interface MODBUS__ConfigurationType {
  register_map: {
    input_registers: MODBUS__RegisterMap__InputRegistersType[];
    holding_registers: [];
    coils: [];
    discrete_inputs: [];
  };
}

export type ConfigurationType<T extends Protocols> = T extends Protocols.MODBUS
  ? MODBUS__ConfigurationType
  : never;
