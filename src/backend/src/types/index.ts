export enum APIMainRoutes {
  DEVICES = "devices",
  HMIS = "hmis",
  VARIABLES = "variables",
}

export interface Device {
  id: string;
  cover?: string;
  name: string;
  description?: string;
  tags: string[];
  ip_address: string;
  created_at?: string;
  updated_at?: string;
}

export enum Protocols {
  MODBUS = "MODBUS",
  MQTT = "MQTT",
  HTTP = "HTTP",
  OPCUA = "OPCUA",
}

export type ProtocolVariableParams<T extends Protocols> =
  T extends Protocols.MODBUS
    ? ModbusVariableParams
    : T extends Protocols.MQTT
    ? MqttVariableParams
    : T extends Protocols.HTTP
    ? HttpVariableParams
    : T extends Protocols.OPCUA
    ? OpcuaVariableParams
    : never;

export enum ModbusVariableTypes {
  INPUT_REGISTER = "input_register",
  HOLDING_REGISTER = "holding_register",
  COIL = "coil",
  DISCRETE_INPUT = "discrete_input",
}

export enum ModbusVariableDataTypes {
  INT16 = "int16",
  UINT16 = "uint16",
  INT32 = "int32",
  UINT32 = "uint32",
  FLOAT = "float",
  DOUBLE = "double",
  STRING = "string",
  BOOLEAN = "boolean",
}

export enum ModbusFunctionCodes {
  READ_COILS = 1,
  READ_DISCRETE_INPUTS = 2,
  READ_HOLDING_REGISTERS = 3,
  READ_INPUT_REGISTERS = 4,
  WRITE_SINGLE_COIL = 5,
  WRITE_SINGLE_REGISTER = 6,
  WRITE_MULTIPLE_COILS = 15,
  WRITE_MULTIPLE_REGISTERS = 16,
}

export enum ModbusByteOrder {
  LITTLE_ENDIAN = "little_endian",
  BIG_ENDIAN = "big_endian",
  MIDDLE_ENDIAN = "middle_endian",
  NONE = "none",
}

export interface ModbusVariableParams {
  slave_id: number;
  start_address: number;
  type: ModbusVariableTypes;
  data_type: ModbusVariableDataTypes;
  byte_order: ModbusByteOrder;
}

export interface MqttVariableParams {}
export interface HttpVariableParams {}
export interface OpcuaVariableParams {}

export interface Variable<T extends Protocols> {
  id: string;
  device_id: string;

  name: string;
  scale_factor?: number;
  offset_factor?: number;
  unit?: string;
  port: number;
  protocol: T;
  protocol_params: ProtocolVariableParams<T>;

  description?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// hmis

export enum HMIFrontendLayouts {
  default = "default",
}

export interface HMI {
  id: string;
  name: string;
  description: string;
  tags: string[];
  cover?: string;

  variables: string[];

  frontend_layout: HMIFrontendLayouts;

  created_at: string;
  updated_at: string;
}
