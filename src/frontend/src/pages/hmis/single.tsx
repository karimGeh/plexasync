import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "layouts/MainLayout";
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Table,
  Tag,
  Typography,
  notification,
} from "antd";
import {
  ModbusByteOrder,
  ModbusVariableDataTypes,
  ModbusVariableTypes,
  Protocols,
  Variable,
} from "api/types/index";
import { AddVariableModal } from "./AddVariableModal";
import Paths from "routes/paths";
import { IoMdOpen } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "store/types";
import {
  start_get_hmi_by_id,
  start_get_variables_by_hmi_id,
} from "store/reducers/api/hmis";

const { Text, Title } = Typography;

// const variables: Variable<Protocols>[] = new Array(10)
//   .fill({})
//   .map((_, index) => ({
//     id: Math.random().toString(36).substring(7),
//     device_id: ["752wuv", "02dkzd", "qdan7h", "nuax2"][
//       Math.floor(Math.random() * 4)
//     ],
//     name: `Variable ${index}`,
//     unit: "C",
//     description: "This is a variable",
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

// const hmi = {
//   id: "1",
//   name: "HMI 1",
//   description: "This is the first HMI",
//   tags: ["tag1", "tag2"],
//   variables: variables.map((v) => v.id),
//   cover: "https://via.placeholder.com/150",
//   created_at: "2021-10-10",
//   updated_at: "2021-10-10",
// };

export const SingleHMIPage: React.FC<React.PropsWithChildren> = () => {
  const {
    api: {
      hmis: {
        get_hmi_by_id: { loading, response, errors },
        get_variables_by_hmi_id: {
          loading: variablesLoading,
          response: variablesResponse,
          errors: variablesErrors,
        },
      },
    },
  } = useSelector<RootStateType, RootStateType>((state) => state);
  const { id } = useParams<{ id: string }>();
  const [addVariableModalOpen, setAddVariableModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(start_get_hmi_by_id({ hmi_id: id }));
    dispatch(start_get_variables_by_hmi_id({ hmi_id: id }));
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
    <Navigate to={Paths.hmis} />
  ) : (
    <MainLayout>
      {addVariableModalOpen ? (
        <AddVariableModal
          open={addVariableModalOpen}
          onClose={() => setAddVariableModalOpen(false)}
        />
      ) : null}
      <Row gutter={[20, 20]} style={{ height: "350px" }} align={"middle"}>
        <Col span={16} style={{ height: "100%" }}>
          <Card
            loading={loading || !response}
            bordered={false}
            title={
              <Flex align="center" justify="space-between">
                <Title level={4} style={{ margin: 0, padding: 0 }}>
                  HMI Details
                </Title>
                <Button
                  type="link"
                  onClick={() => window.open(Paths.hmi(response?.hmi.id))}
                  style={{
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Open
                  <IoMdOpen style={{ marginLeft: 8 }} />
                </Button>
              </Flex>
            }
            style={{ height: "100%" }}
          >
            <Flex align="center" justify="space-between">
              <Text type="secondary">HMI Name:</Text>
              <Title level={3} style={{ margin: 0, padding: 0 }}>
                {response?.hmi.name}
              </Title>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Created At:</Text>
              <Text>
                {new Date(response?.hmi.created_at || "").toDateString()}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Number of variables:</Text>
              <Text>
                {response?.hmi.variables.length}{" "}
                {response?.hmi.variables.length === 1
                  ? "variable"
                  : "variables"}
              </Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Number of protocols:</Text>
              <Text>-</Text>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">Tags:</Text>
              <Flex align="center" justify="space-between" gap={5}>
                {response?.hmi.tags.map((tag) => (
                  <Tag key={tag} color="blue" style={{ margin: 0 }}>
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text type="secondary">HMI Description:</Text>
            </Flex>
            <Flex
              align="center"
              justify="space-between"
              style={{ padding: "1rem" }}
            >
              <Text>{response?.hmi.description}</Text>
            </Flex>
          </Card>
        </Col>
        <Col span={8} style={{ height: "100%" }}>
          <Card
            loading={loading || !response}
            bordered={false}
            style={{ height: "100%", width: "100%", overflow: "hidden" }}
            styles={{ body: { padding: 0, height: "100%", width: "100%" } }}
          >
            <img
              src={response?.hmi.cover || "https://via.placeholder.com/200x150"}
              alt="hmi cover"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "2rem" }}>
        <Col span={24}>
          <Card
            loading={variablesLoading || !variablesResponse}
            className="single-device-protocols-card"
            bordered={false}
            title={
              <Flex align="center" justify="space-between">
                <Title level={4} style={{ margin: 0, padding: 0 }}>
                  Variables
                </Title>
                <Button
                  type="primary"
                  onClick={() => setAddVariableModalOpen(true)}
                >
                  Add Variable
                </Button>
              </Flex>
            }
            styles={{ body: { padding: 0, paddingInline: "1rem" } }}
          >
            <Table
              dataSource={variablesResponse?.variables || []}
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                  sorter: (a, b) => a.name.localeCompare(b.name),
                  filterSearch: true,
                },
                {
                  title: "Device ID",
                  dataIndex: "device_id",
                  key: "device_id",
                  sorter: (a, b) => a.device_id.localeCompare(b.device_id),
                },
                {
                  title: "Protocol",
                  dataIndex: "protocol",
                  key: "protocol",
                  sorter: (a, b) => a.protocol.localeCompare(b.protocol),
                },
                {
                  title: "Tags",
                  dataIndex: "tags",
                  key: "tags",
                  render: (tags: string[]) => (
                    <>
                      {tags.map((tag) => (
                        <Tag key={tag} color="blue">
                          {tag}
                        </Tag>
                      ))}
                    </>
                  ),
                },
                {
                  title: "Created At",
                  dataIndex: "created_at",
                  key: "created_at",
                  render: (date: string) => new Date(date).toDateString(),
                  sorter: (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime(),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};
