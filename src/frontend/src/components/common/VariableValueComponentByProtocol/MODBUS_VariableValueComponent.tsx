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
  let value_number = 0;
  let max_value = 0;

  switch (variable.protocol_params.data_type) {
    case ModbusVariableDataTypes.INT16:
      max_value = 2 ** 16 - 1;
      value_number = parseInt(value, 2);
      if (value_number > max_value / 2) {
        value_number -= max_value + 1;
      }
      break;
    case ModbusVariableDataTypes.INT32:
      max_value = 2 ** 32 - 1;
      value_number = parseInt(value, 2);
      if (value_number > max_value / 2) {
        value_number -= max_value + 1;
      }
      break;

    case ModbusVariableDataTypes.UINT16:
      value_number = parseInt(value, 2);
      break;

    case ModbusVariableDataTypes.UINT32:
      value_number = parseInt(value, 2);
      break;
    default:
      value_number = 0;
  }

  value_number =
    value_number *
      (variable.scale_factor !== undefined ? variable.scale_factor : 1) +
    (variable.offset_factor || 0);

  // [
  //   ModbusVariableDataTypes.INT16,
  //   ModbusVariableDataTypes.INT32,
  // ].includes(variable.protocol_params.data_type)
  //   ? (
  //       parseInt(value, 2) *
  //         (variable.scale_factor !== undefined ? variable.scale_factor : 1) +
  //       (variable.offset_factor || 0)
  //     )
  //       .toFixed(2)
  //       .toString()
  //   : 0;

  return <Text>{value_number}</Text>;
};
