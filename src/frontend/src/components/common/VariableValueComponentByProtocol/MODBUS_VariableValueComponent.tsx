import { Typography } from "antd";
import { ModbusVariableDataTypes, Protocols, Variable } from "api/types/index";
const { Text } = Typography;

interface MODBUS_VariableValueComponentProps extends React.PropsWithChildren {
  variable: Variable<Protocols.MODBUS>;
  value: string; //binary string
}

export const MODBUS_VariableValueComponent: React.FC<
  MODBUS_VariableValueComponentProps
> = ({ variable, value }) => {
  return variable.protocol_params.data_type ===
    ModbusVariableDataTypes.INT16 ? (
    <Text>{parseInt(value, 2).toString()}</Text>
  ) : variable.protocol_params.data_type === ModbusVariableDataTypes.INT32 ? (
    <Text>{parseInt(value, 2).toString()}</Text>
  ) : (
    "Not implemented"
  );
};
