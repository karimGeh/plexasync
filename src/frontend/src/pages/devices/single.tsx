import { useParams } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { Button, Card, Col, Flex, Row, Tabs, Tag, Typography } from "antd";
import { Device } from "../../api/api_types";
import { useState } from "react";
import { CreateVariable } from "./CreateVariable";

const { Text, Title } = Typography;

const device: Device = {
  id: "1",
  name: "Device 1",
  description: "This is the first device",
  tags: ["tag1", "tag2"],
  ip_address: "192.168.1.70",
  created_at: "2021-10-10",
  updated_at: "2021-10-10",
};

export const SingleDevicePage: React.FC<React.PropsWithChildren> = () => {
  const { id } = useParams<{ id: string }>();
  const [createVariableModalOpen, setCreateVariableModalOpen] = useState(false);

  console.log(id);

  return (
    <MainLayout>
      {createVariableModalOpen ? (
        <CreateVariable
          open={createVariableModalOpen}
          onClose={() => setCreateVariableModalOpen(false)}
        />
      ) : null}
      <Row gutter={[20, 20]} style={{ height: "350px" }} align={"middle"}>
        <Col span={16} style={{ height: "100%" }}>
          <Card
            bordered={false}
            title="Device Details"
            style={{ height: "100%" }}
          >
            <Flex align="center" justify="space-between">
              <Text type="secondary">Device Name:</Text>
              <Title level={3} style={{ margin: 0, padding: 0 }}>
                {device.name}
              </Title>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Created At:</Text>
              <Text>{new Date(device.created_at).toDateString()}</Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">IP Address:</Text>
              <Text>{device.ip_address}</Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Number of variables:</Text>
              <Text>10</Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Number of protocols:</Text>
              <Text>2</Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Tags:</Text>
              <Flex align="center" justify="space-between" gap={5}>
                {device.tags.map((tag) => (
                  <Tag key={tag} color="blue" style={{ margin: 0 }}>
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Device Description:</Text>
            </Flex>
            <Flex
              align="center"
              justify="space-between"
              style={{ padding: "1rem" }}
            >
              <Text>{device.description}</Text>
            </Flex>
          </Card>
        </Col>
        <Col span={8} style={{ height: "100%" }}>
          <Card
            bordered={false}
            style={{ height: "100%", width: "100%", overflow: "hidden" }}
            styles={{ body: { padding: 0, height: "100%", width: "100%" } }}
          >
            <img
              src={device.cover || "https://via.placeholder.com/200x150"}
              alt="device cover"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ padding: "10px", marginTop: "1rem" }}>
        <Col span={24}>
          <Card
            className="single-device-protocols-card"
            bordered={false}
            title={
              <Flex align="center" justify="space-between">
                <Title level={4} style={{ margin: 0, padding: 0 }}>
                  Variables by protocols
                </Title>
                <Button
                  type="primary"
                  onClick={() => setCreateVariableModalOpen(true)}
                >
                  Add Variable
                </Button>
              </Flex>
            }
            styles={{ body: { padding: 0, paddingInline: "1rem" } }}
          >
            <Tabs
              defaultActiveKey="modbus"
              items={[
                {
                  key: "modbus",
                  label: "Modbus",
                  children: <div>Modbus</div>,
                },
                {
                  key: "opcua",
                  label: "OPC UA",
                  children: <div>OPC UA</div>,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};
