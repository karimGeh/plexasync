import { Button, Card, Empty, Flex, Input, Typography } from "antd";
import { MainLayout } from "../layouts/MainLayout";

const { Title } = Typography;

export const HMISPage: React.FC<React.PropsWithChildren> = () => {
  return (
    <MainLayout>
      <Card bordered={false}>
        <Flex align="center" justify="space-between" style={{ height: "100%" }}>
          <Title level={3} style={{ margin: 0, padding: 0 }}>
            HMIS
          </Title>

          <Input.Search placeholder="Search" style={{ maxWidth: "60%" }} />

          <Button
            type="primary"
            // onClick={() => setCreateDeviceModalVisible(true)}
          >
            Add HMI
          </Button>
        </Flex>
      </Card>
      <Empty description="This page is not available right now." />
    </MainLayout>
  );
};
