import {
  Button,
  Drawer,
  Flex,
  Form,
  FormProps,
  Input,
  Select,
  notification,
} from "antd";
import HMIsClientAPI from "api/handlers/hmis";
import { HMI, HMIFrontendLayouts } from "api/types/index";
import { useState } from "react";

interface CreateHMIModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const CreateHMIModal: React.FC<CreateHMIModalProps> = ({
  open,
  onClose,
}) => {
  const [form] = Form.useForm<HMI>();
  const [loading, setLoading] = useState(false);
  const onSubmit: FormProps<HMI>["onFinish"] = async (values) => {
    setLoading(true);
    const { errors } = await HMIsClientAPI.createHMI(values);
    setLoading(false);
    if (errors) {
      errors.map((error) => {
        notification.error({
          message: error.message,
        });
      });
      return;
    }
    onClose();
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      width="50vw"
      title="Create A New HMI"
      footer={
        <Flex justify="end" gap={10} style={{ padding: "1rem" }}>
          <Button disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            type="primary"
            onClick={() => form.submit()}
          >
            Create
          </Button>
        </Flex>
      }
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter a name for the hmi",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter a description for the hmi",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" />
        </Form.Item>

        <Form.Item
          label="Layout"
          name="frontend_layout"
          rules={[
            {
              required: true,
              message: "Please select a layout for the hmi",
            },
          ]}
        >
          <Select
            placeholder="Select a layout"
            allowClear
            options={Object.entries(HMIFrontendLayouts).map(([, value]) => ({
              label: value,
              value,
            }))}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
