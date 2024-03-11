import { Protocols } from "../Enums";

export interface VariableType {
  id: string;
  name: string;
  hmi_id: string;
  device_id: string;
  protocol: Protocols;
  update_interval: number;
  // JSONPath ex: $.path.to.value or $.path.to.array[0].value
  // modbus example: $.register_map.input_registers[0]
  device_configuration_path: string;
}
