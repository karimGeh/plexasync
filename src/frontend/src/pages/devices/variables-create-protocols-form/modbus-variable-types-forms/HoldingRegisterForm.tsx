import { Form, FormInstance, InputNumber, Select } from "antd";
import {
  ModbusByteOrder,
  ModbusVariableDataTypes,
  Protocols,
  Variable,
} from "../../../../api/api_types";

interface HoldingRegisterFormProps extends React.PropsWithChildren {
  form: FormInstance<Variable<Protocols.MODBUS>>;
}

export const HoldingRegisterForm: React.FC<HoldingRegisterFormProps> = () => {
  return (
    <>
      <Form.Item
        label="byte_order"
        name={["protocol_params", "byte_order"]}
        rules={[
          {
            required: true,
            message: "Please select a byte order",
          },
        ]}
      >
        <Select>
          <Select.Option value={ModbusByteOrder.LITTLE_ENDIAN}>
            Little Endian
          </Select.Option>
          <Select.Option value={ModbusByteOrder.BIG_ENDIAN}>
            Big Endian
          </Select.Option>
          <Select.Option value={ModbusByteOrder.MIDDLE_ENDIAN}>
            Middle Endian
          </Select.Option>
          <Select.Option value={ModbusByteOrder.NONE}>None</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Start Address"
        name={["protocol_params", "start_address"]}
        rules={[
          {
            required: true,
            message: "Please enter a start address",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Data Type"
        name={["protocol_params", "data_type"]}
        rules={[
          {
            required: true,
            message: "Please enter a data type",
          },
        ]}
      >
        <Select>
          <Select.Option value={ModbusVariableDataTypes.UINT16}>
            uint16
          </Select.Option>
          <Select.Option value={ModbusVariableDataTypes.INT16}>
            int16
          </Select.Option>
          <Select.Option value={ModbusVariableDataTypes.UINT32}>
            uint32
          </Select.Option>
          <Select.Option value={ModbusVariableDataTypes.INT32}>
            int32
          </Select.Option>
          <Select.Option value={ModbusVariableDataTypes.FLOAT}>
            float32
          </Select.Option>
          <Select.Option value={ModbusVariableDataTypes.DOUBLE}>
            double
          </Select.Option>
          <Select.Option value={ModbusVariableDataTypes.STRING}>
            string
          </Select.Option>
          <Select.Option value={ModbusVariableDataTypes.BOOLEAN}>
            boolean
          </Select.Option>
        </Select>
      </Form.Item>
    </>
  );
};
