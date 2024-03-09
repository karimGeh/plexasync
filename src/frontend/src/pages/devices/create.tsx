import { Button, Drawer, Flex, Form, FormProps, Input, Select } from "antd";
import { Device } from "../../api/api_types";

interface CreateDeviceModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const CreateDeviceModal: React.FC<CreateDeviceModalProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm<Device>();

  const onSubmit: FormProps<Device>["onFinish"] = (values) => {
    console.log(values);
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      width="50vw"
      title="Create A New Device"
      footer={
        <Flex justify="end" gap={10} style={{ padding: "1rem" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Create
          </Button>
        </Flex>
      }
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Device Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter a name for the device",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Device Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter a description for the device",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" />
        </Form.Item>

        <Form.Item
          label="IP Address"
          name="ip_address"
          rules={[
            {
              required: true,
              max: 15,
              min: 7,
              type: "string",
              pattern: new RegExp("^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$"),
              // every number is between 0 and 255
              validator: async (_, value) => {
                if (!value)
                  return Promise.reject("Please enter a valid IP address");
                const parts = value.split(".");
                if (parts.length !== 4)
                  return Promise.reject("Please enter a valid IP address");

                for (const part of parts) {
                  const num = parseInt(part);
                  if (isNaN(num) || num < 0 || num > 255)
                    return Promise.reject("Please enter a valid IP address");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
