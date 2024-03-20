import { Typography } from "antd";
import { ModbusVariableDataTypes, Protocols, Variable } from "api/types/index";
import { binaryStringToFloat } from "helpers/binaryStringToFloat";
import { useEffect, useState } from "react";
const { Text } = Typography;

interface MODBUS_VariableValueComponentProps extends React.PropsWithChildren {
  variable: Variable<Protocols.MODBUS>;
  value: string; //binary string
}

export const MODBUS_VariableValueComponent: React.FC<
  MODBUS_VariableValueComponentProps
> = ({ variable, value }) => {
  const [value_number, set_value_number] = useState(0)
  let max_value = 0;

  const updateValueNumber = () => {
    if (!value) return
    let new_value_number = 0
    switch (variable.protocol_params.data_type) {
      case ModbusVariableDataTypes.INT16:
        max_value = 2 ** 16 - 1;
        new_value_number = parseInt(value, 2);
        if (new_value_number > max_value / 2) {
          new_value_number -= max_value + 1;
        }
        break;
      case ModbusVariableDataTypes.INT32:
        max_value = 2 ** 32 - 1;
        new_value_number = parseInt(value, 2);
        if (new_value_number > max_value / 2) {
          new_value_number -= max_value + 1;
        }
        break;

      case ModbusVariableDataTypes.UINT16:
        new_value_number = parseInt(value, 2);
        break;

      case ModbusVariableDataTypes.UINT32:
        new_value_number = parseInt(value, 2);
        break;

      case ModbusVariableDataTypes.FLOAT:
        new_value_number = binaryStringToFloat(value);
        break;

      default:
        new_value_number = 0;
    }

    new_value_number =
      new_value_number *
      (variable.scale_factor !== undefined ? variable.scale_factor : 1) +
      (variable.offset_factor || 0);

    set_value_number(new_value_number)
  }


  useEffect(() => {
    updateValueNumber()
  }, [value])


  return (
    <Text>
      {variable?.protocol_params.data_type === ModbusVariableDataTypes.FLOAT
        ? value_number
        : value_number.toFixed(2)}
    </Text>
  );
};
