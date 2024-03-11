import { Empty, Form, FormInstance, InputNumber, Select } from "antd";
import { ModbusVariableTypes, Protocols, Variable } from "api/types/index";
import { useEffect } from "react";
import { HoldingRegisterForm } from "./modbus-variable-types-forms/HoldingRegisterForm";

interface ModbusFormProps extends React.PropsWithChildren {
  form: FormInstance<Variable<Protocols.MODBUS>>;
}

export const ModbusForm: React.FC<ModbusFormProps> = ({ form }) => {
  useEffect(() => {
    form.setFieldValue(["protocol_params", "slave_id"], 1);
  }, []);
  return (
    <>
      <Form.Item
        label="Slave ID"
        name={["protocol_params", "slave_id"]}
        rules={[
          {
            required: true,
            min: 1,
            max: 255,
            type: "number",
            message: "Please enter a valid slave id",
          },
        ]}
      >
        <InputNumber defaultValue={1} />
      </Form.Item>
      <Form.Item
        label="Variable type"
        name={["protocol_params", "type"]}
        rules={[
          {
            required: true,
            message: "Please select a variable type",
          },
        ]}
      >
        <Select>
          <Select.Option value={ModbusVariableTypes.COIL} disabled>
            Coil
          </Select.Option>
          <Select.Option value={ModbusVariableTypes.DISCRETE_INPUT} disabled>
            Discrete Input
          </Select.Option>
          <Select.Option value={ModbusVariableTypes.INPUT_REGISTER} disabled>
            Input Register
          </Select.Option>
          <Select.Option value={ModbusVariableTypes.HOLDING_REGISTER}>
            Holding Register
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate>
        {({ getFieldValue }) => {
          const type = getFieldValue(["protocol_params", "type"]);

          if (
            type === ModbusVariableTypes.COIL ||
            type === ModbusVariableTypes.DISCRETE_INPUT ||
            type === ModbusVariableTypes.INPUT_REGISTER ||
            !type
          ) {
            return (
              <Empty description="This type is not available right now, please select another type" />
            );
          } else if (type === ModbusVariableTypes.HOLDING_REGISTER) {
            return <HoldingRegisterForm form={form} />;
          }
        }}
      </Form.Item>
    </>
  );
};
