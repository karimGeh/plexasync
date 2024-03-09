import { Button, Card, Flex, Input, Typography } from "antd";
import { MainLayout } from "../layouts/MainLayout";
import { useState } from "react";
import { CreateDeviceModal } from "./devices/create";
import { Device } from "../api/api_types";
import { DeviceCard } from "../components/common/DeviceCard";

const { Title } = Typography;

const device: Device = {
  id: "1",
  name: "Device 1",
  description: "This is the first device",
  tags: ["tag1", "tag2"],
  ip_address: "192.168.1.70",
  created_at: "2021-10-10",
  updated_at: "2021-10-10",
};

const devices: Device[] = new Array(10).fill(device);

export const DevicesPage: React.FC<React.PropsWithChildren> = () => {
  const [createDeviceModalVisible, setCreateDeviceModalVisible] =
    useState(false);
  return (
    <MainLayout>
      {createDeviceModalVisible ? (
        <CreateDeviceModal
          open={createDeviceModalVisible}
          onClose={() => setCreateDeviceModalVisible(false)}
        />
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

      <Flex wrap="wrap" gap={20} justify="center" style={{ padding: "20px" }}>
        {devices.map((device, idx) => (
          <DeviceCard key={idx} device={device} />
        ))}
      </Flex>
    </MainLayout>
  );
};
