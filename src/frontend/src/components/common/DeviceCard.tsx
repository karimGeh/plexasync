import { Card, Flex, Tag, Typography } from "antd";
import { Device } from "../../api/api_types";

import "styles/components/common/DeviceCard.scss";
import { useNavigate } from "react-router-dom";
import Paths from "../../routes/paths";

const { Title, Text } = Typography;

export interface DeviceCardProps extends React.PropsWithChildren {
  device: Device;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="device-card"
      hoverable
      cover={
        <img
          alt="example"
          src={device.cover || "https://via.placeholder.com/200x150"}
        />
      }
      style={{ width: 300 }}
      onClick={() => navigate(Paths.devicesSingle(device.id))}
    >
      <Flex vertical gap={4}>
        <Title level={4} className="device-card-title">
          {device.name}
        </Title>
        {[
          {
            property: "Tags",
            value: device.tags.map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            )),
          },
          { property: "IP Address", value: <Tag>{device.ip_address}</Tag> },
          // {
          //   property: "Description",
          //   value: <Text>{device.description}</Text>,
          // },
        ].map((item, idx) => (
          <Flex key={idx} justify="space-between" align="center">
            <Text type="secondary" strong>
              {item.property}
            </Text>

            <Text>{item.value}</Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
