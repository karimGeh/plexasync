import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Flex,
  Layout,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  ModbusByteOrder,
  ModbusVariableDataTypes,
  ModbusVariableTypes,
  Protocols,
  Variable,
} from "api/types/index";
import { VariableValueComponent } from "components/common/VariableValueComponent";

const { Text, Title } = Typography;

const variables: Variable<Protocols>[] = new Array(10)
  .fill({})
  .map((_, index) => ({
    id: Math.random().toString(36).substring(7),
    device_id: ["752wuv", "02dkzd", "qdan7h", "nuax2"][
      Math.floor(Math.random() * 4)
    ],
    name: `Variable ${index}`,
    scale: Math.random() > 0.5 ? 1 : Math.random() * 100,
    unit: ["C", "F", "K", "Pa", "bar", "psi", "m3", "L", "gal", "Hz", "KM/H"][
      Math.floor(Math.random() * 11)
    ],
    protocol: Protocols.MODBUS,
    protocol_params: {
      slave_id: 1,
      address: Math.floor(Math.random() * 1000),
      type: ModbusVariableTypes.HOLDING_REGISTER,
      data_type:
        Math.random() > 0.5
          ? ModbusVariableDataTypes.INT16
          : ModbusVariableDataTypes.INT32,
      byte_order:
        Math.random() > 0.5
          ? ModbusByteOrder.LITTLE_ENDIAN
          : ModbusByteOrder.BIG_ENDIAN,
    },
    tags: Math.random() > 0.5 ? ["tag1", "tag2"] : [],
    created_at: "2021-10-10",
    updated_at: "2021-10-10",
  }));

const hmi = {
  id: "1",
  name: "HMI 1",
  description: "This is the first HMI",
  tags: ["tag1", "tag2"],
  variables: variables.map((v) => v.id),
  cover: "https://via.placeholder.com/150",
  created_at: "2021-10-10",
  updated_at: "2021-10-10",
};

export const HMIViewer: React.FC<React.PropsWithChildren> = () => {
  const { id } = useParams<{ id: string }>();
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setVariableValues(
        (variables as Variable<Protocols.MODBUS>[]).reduce((acc, variable) => {
          const val = Math.random() * 99999999999999 - 99999999999999 / 2;
          acc[variable.id] =
            variable.protocol_params.data_type === ModbusVariableDataTypes.INT16
              ? val.toString(2).slice(0, 16)
              : variable.protocol_params.data_type ===
                ModbusVariableDataTypes.INT32
              ? val.toString(2).slice(0, 32)
              : "0";
          return acc;
        }, {} as Record<string, string>)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  console.log(id);
  return (
    <Layout
      style={{
        padding: "1rem",
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Flex align="center" justify="center">
        <Card
          title={
            <Flex vertical align="center">
              <Title level={4} style={{ margin: 0, padding: 0 }}>
                {hmi.name}
              </Title>
              <Text type="secondary">{hmi.description}</Text>
            </Flex>
          }
          style={{
            width: "100%",
            height: "100%",
            minHeight: "calc(100vh - 2rem)",
          }}
          styles={{
            body: {
              // border: "1px solid green",
              width: "100%",
              height: "100% !important",
            },
          }}
        >
          <Flex wrap="wrap" align="center" justify="center" gap={16}>
            {variables.map((variable) => (
              <Card
                key={variable.id}
                title={variable.name}
                style={{ minWidth: "200px" }}
              >
                <Flex align="center" justify="space-between">
                  <Title
                    level={5}
                    style={{ margin: 0, padding: 0, whiteSpace: "nowrap" }}
                  >
                    <VariableValueComponent
                      variable={variable}
                      value={variableValues[variable.id]}
                    />
                  </Title>
                  <Text type="secondary">{variable.unit}</Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Card>
      </Flex>
    </Layout>
  );
};
