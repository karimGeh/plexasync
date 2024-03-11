import {
  Button,
  Drawer,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Space,
  notification,
} from "antd";
import { Protocols, Variable } from "api/types/index";
import { Navigate, useParams } from "react-router-dom";
import { ModbusForm } from "./variables-create-protocols-form/ModbusForm";
import { OPCUAForm } from "./variables-create-protocols-form/OPCUAForm";
import { useEffect, useState } from "react";
import DevicesClientAPI from "api/handlers/devices";
import Paths from "routes/paths";

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

  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (values: Variable<Protocols>) => {
    if (loading || !id) return;

    setLoading(true);
    const { errors } = await DevicesClientAPI.createVariable({
      ...values,
      device_id: id,
    });
    setLoading(false);

    if (errors) {
      errors.map((error) => {
        notification.error({
          message: error.message,
        });
      });
      return;
    }

    form.resetFields();
    onClose();
  };

  useEffect(() => {
    form.setFieldValue(["scale"], 1);
    form.setFieldValue(["offset"], 0);
  }, []);

  return !id ? (
    <Navigate to={Paths.devices} />
  ) : (
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
      <Form form={form} layout="vertical" onFinish={onFormSubmit}>
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
        <Form.Item label="Tags" name="tags">
          <Select mode="tags" />
        </Form.Item>

        <Space.Compact style={{ width: "100%" }}>
          <Form.Item
            label="Scale"
            name="scale_factor"
            rules={[
              {
                required: true,
                message: "Please enter a scale for the variable",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Offset"
            name="offset_factor"
            rules={[
              {
                required: true,
                message: "Please enter a scale for the variable",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Unit" name="unit" style={{ width: "100%" }}>
            <Input />
          </Form.Item>
        </Space.Compact>

        <Space.Compact style={{ width: "100%" }}>
          <Form.Item
            label="Protocol"
            name="protocol"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please select a protocol for the variable",
              },
            ]}
          >
            <Select style={{ width: "100%" }}>
              <Select.Option value={Protocols.MODBUS}>Modbus</Select.Option>
              <Select.Option value={Protocols.OPCUA} disabled>
                OPC UA
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Port"
            name="port"
            rules={[
              {
                required: true,
                message: "Please enter a port for the variable",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Space.Compact>

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
