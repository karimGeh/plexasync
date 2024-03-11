import { Navigate, useParams } from "react-router-dom";
import { MainLayout } from "layouts/MainLayout";
import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Row,
  Tabs,
  Tag,
  Typography,
  notification,
} from "antd";
import { Protocols, Variable } from "api/types/index";
import { useEffect, useState } from "react";
import { CreateVariable } from "./CreateVariable";
import { ModbusTable } from "./variables-table/ModbusTable";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "store/types";
import Paths from "routes/paths";
import {
  start_get_device_by_id,
  start_get_variables_by_device_id,
} from "store/reducers/api/devices";

const { Text, Title } = Typography;

// const variables: Variable<Protocols>[] = new Array(10)
//   .fill({})
//   .map((_, index) => ({
//     id: Math.random().toString(36).substring(7),
//     device_id: "1",
//     name: `Variable ${index}`,
//     scale: Math.random() * 10,
//     offset: Math.random() * 10,
//     unit: "bar",
//     port: Math.floor(Math.random() * 1000),
//     protocol: Protocols.MODBUS,
//     protocol_params: {
//       slave_id: 1,
//       address: Math.floor(Math.random() * 1000),
//       type: ModbusVariableTypes.HOLDING_REGISTER,
//       data_type:
//         Math.random() > 0.5
//           ? ModbusVariableDataTypes.INT16
//           : ModbusVariableDataTypes.INT32,
//       byte_order:
//         Math.random() > 0.5
//           ? ModbusByteOrder.LITTLE_ENDIAN
//           : ModbusByteOrder.BIG_ENDIAN,
//     },
//     tags: Math.random() > 0.5 ? ["tag1", "tag2"] : [],
//     created_at: "2021-10-10",
//     updated_at: "2021-10-10",
//   }));

// const device: Device = {
//   id: "1",
//   name: "Device 1",
//   description: "This is the first device",
//   tags: ["tag1", "tag2"],
//   ip_address: "192.168.1.70",
//   created_at: "2021-10-10",
//   updated_at: "2021-10-10",
// };

export const SingleDevicePage: React.FC<React.PropsWithChildren> = () => {
  const {
    api: {
      devices: {
        device_by_id: { loading, response, errors },
        variables_by_device_id: {
          loading: variablesLoading,
          response: variablesResponse,
          errors: variablesErrors,
        },
      },
    },
  } = useSelector<RootStateType, RootStateType>((state) => state);

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [createVariableModalOpen, setCreateVariableModalOpen] = useState(false);

  const onCreateVariableModalClose = () => {
    dispatch(start_get_variables_by_device_id({ device_id: id }));
    setCreateVariableModalOpen(false);
  };

  useEffect(() => {
    dispatch(start_get_device_by_id({ device_id: id }));
    dispatch(start_get_variables_by_device_id({ device_id: id }));
  }, [id]);

  useEffect(() => {
    errors?.map((error) => {
      notification.error({
        message: error.message,
      });
    });
  }, [errors]);

  useEffect(() => {
    variablesErrors?.map((error) => {
      notification.error({
        message: error.message,
      });
    });
  }, [variablesErrors]);

  return !id ? (
    <Navigate to={Paths.devices} />
  ) : (
    <MainLayout>
      {createVariableModalOpen ? (
        <CreateVariable
          open={createVariableModalOpen}
          onClose={onCreateVariableModalClose}
        />
      ) : null}
      <Row gutter={[20, 20]} style={{ height: "350px" }} align={"middle"}>
        <Col span={16} style={{ height: "100%" }}>
          <Card
            loading={loading || !response}
            bordered={false}
            title="Device Details"
            style={{ height: "100%" }}
          >
            <Flex align="center" justify="space-between">
              <Text type="secondary">Device Name:</Text>
              <Title level={3} style={{ margin: 0, padding: 0 }}>
                {response?.device.name}
              </Title>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Created At:</Text>
              <Text>
                {new Date(response?.device.created_at || "").toDateString()}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">IP Address:</Text>
              <Text>{response?.device.ip_address}</Text>
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
                {response?.device.tags.map((tag) => (
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
              <Text>{response?.device.description}</Text>
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
              src={
                response?.device.cover || "https://via.placeholder.com/200x150"
              }
              alt="device cover"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Card>
        </Col>
      </Row>

      <Row style={{ padding: "10px", marginTop: "1rem" }}>
        <Col span={24}>
          <Card
            loading={variablesLoading || !variablesResponse}
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
                  children: (
                    <ModbusTable
                      variables={
                        variablesResponse?.variables.filter(
                          (variable) => variable.protocol === Protocols.MODBUS
                        ) as Variable<Protocols.MODBUS>[]
                      }
                    />
                  ),
                },
                {
                  key: "opcua",
                  label: "OPC UA",
                  children: (
                    <Empty
                      description={<span>Protocol not yet supported</span>}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};
