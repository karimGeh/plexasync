import { Card, Flex, Tag, Typography } from "antd";
import { HMI } from "api/types/index";
import { useNavigate } from "react-router-dom";
import Paths from "routes/paths";
const { Title, Text } = Typography;

interface HMICardProps extends React.PropsWithChildren {
  hmi: HMI;
}

export const HMICard: React.FC<HMICardProps> = ({ hmi }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      cover={
        <img
          alt="example"
          style={{ objectFit: "cover", maxHeight: 300 }}
          src={hmi.cover || "https://via.placeholder.com/150x150"}
        />
      }
      style={{ width: 300 }}
      onClick={() => navigate(Paths.hmisSingle(hmi.id))}
    >
      <Flex vertical gap={4}>
        <Title level={4} className="hmi-card-title">
          {hmi.name}
        </Title>
        {[
          {
            property: "Tags",
            value: hmi.tags.map((tag) => (
              <Tag key={tag} color="blue">
                {tag}
              </Tag>
            )),
          },
          // {
          //   property: "Description",
          //   value: <Text>{hmi.description}</Text>,
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
