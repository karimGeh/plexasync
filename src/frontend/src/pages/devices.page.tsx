import {
  Button,
  Card,
  Flex,
  Input,
  Spin,
  Typography,
  notification,
} from "antd";
import { MainLayout } from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { CreateDeviceModal } from "./devices/create";
import { DeviceCard } from "../components/common/DeviceCard";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "store/types";
import { start_get_all_devices } from "store/reducers/api/devices";

const { Title } = Typography;

// const device: Device = {
//   id: "1",
//   name: "Device 1",
//   description: "This is the first device",
//   tags: ["tag1", "tag2"],
//   ip_address: "192.168.1.70",
//   created_at: "2021-10-10",
//   updated_at: "2021-10-10",
// };

// const devices: Device[] = new Array(10).fill(device);

export const DevicesPage: React.FC<React.PropsWithChildren> = () => {
  const {
    api: {
      devices: {
        all_devices: { loading, response, errors },
      },
    },
  } = useSelector<RootStateType, RootStateType>((state) => state);

  const [createDeviceModalVisible, setCreateDeviceModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const onClose = () => {
    setCreateDeviceModalVisible(false);
    dispatch(start_get_all_devices({}));
  };

  useEffect(() => {
    dispatch(start_get_all_devices({}));
  }, [createDeviceModalVisible]);

  useEffect(() => {
    errors?.map((error) => {
      notification.error({
        message: error.message,
      });
    });
  }, [errors]);

  return (
    <MainLayout>
      {createDeviceModalVisible ? (
        <CreateDeviceModal open={createDeviceModalVisible} onClose={onClose} />
      ) : null}
      <Card bordered={false}>
        <Flex align="center" justify="space-between" style={{ height: "100%" }}>
          <Title level={3} style={{ margin: 0, padding: 0 }}>
            Devices
          </Title>

          <Input.Search placeholder="Search" style={{ maxWidth: "60%" }} />

          <Button
            type="primary"
            onClick={() => setCreateDeviceModalVisible(true)}
          >
            Add Device
          </Button>
        </Flex>
      </Card>

      <Spin spinning={loading}>
        <Flex wrap="wrap" gap={20} justify="center" style={{ padding: "20px" }}>
          {response?.devices.map((device, idx) => (
            <DeviceCard key={idx} device={device} />
          ))}
        </Flex>
      </Spin>
    </MainLayout>
  );
};
