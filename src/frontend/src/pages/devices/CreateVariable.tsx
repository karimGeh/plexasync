import { Button, Drawer, Flex, Form, FormInstance, Input, Select } from "antd";
import { Protocols, Variable } from "../../api/api_types";
import { useParams } from "react-router-dom";
import { ModbusForm } from "./variables-create-protocols-form/ModbusForm";
import { OPCUAForm } from "./variables-create-protocols-form/OPCUAForm";

interface CreateVariableProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const CreateVariable: React.FC<CreateVariableProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm<Variable<Protocols>>();
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width="50vw"
      title="Create A New Variable"
      footer={
        <Flex justify="end" gap={10} style={{ padding: "1rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Create
          </Button>
        </Flex>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter a name for the variable",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Variable Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Tags" name="type">
          <Select mode="tags" />
        </Form.Item>

        <Form.Item label="Protocol" name="protocol">
          <Select>
            <Select.Option value={Protocols.MODBUS}>Modbus</Select.Option>
            <Select.Option value={Protocols.OPCUA}>OPC UA</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate>
          {({ getFieldValue }) => {
            const protocol = getFieldValue("protocol");
            switch (protocol) {
              case Protocols.MODBUS:
                return (
                  <ModbusForm
                    form={form as FormInstance<Variable<Protocols.MODBUS>>}
                  />
                );
              case Protocols.OPCUA:
                return (
                  <OPCUAForm
                    form={form as FormInstance<Variable<Protocols.OPCUA>>}
                  />
                );
              default:
                return null;
            }
          }}
        </Form.Item>
      </Form>
    </Drawer>
  );
};
