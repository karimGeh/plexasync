import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Flex, Layout, Typography, notification } from "antd";
import { VariableValueComponent } from "components/common/VariableValueComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "store/types";
import { start_get_variables_by_hmi_id } from "store/reducers/api/hmis";
import { io, Socket } from "socket.io-client";

const { Text, Title } = Typography;
const SERVER_URL = import.meta.env.VITE_API_URL || "/";

export const HMIViewer: React.FC<React.PropsWithChildren> = () => {
  const {
    api: {
      hmis: {
        get_variables_by_hmi_id: { loading, response, errors },
      },
    },
  } = useSelector<RootStateType, RootStateType>((state) => state);
  const { id } = useParams<{ id: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [variableValues, setVariableValues] = useState<{
    [key: string]: string;
  }>({});

  const initSocket = async () => {
    if (!id) return;

    if (socket) socket.disconnect();

    const newSocket = io(SERVER_URL, {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on(
      "variable_value",
      (data: { variable_id: string; value: string }) => {
        setVariableValues((prev) => {
          return {
            ...prev,
            [data.variable_id]: data.value,
          };
        });
      }
    );

    newSocket.on("connect", () => {
      setIsSocketConnected(true);
      // newSocket.join(id);

      newSocket.emit("join", id);
    });

    newSocket.on("disconnect", async () => {
      setIsSocketConnected(false);
      console.log("====================================");
      console.log("Socket disconnected");
      console.log("====================================");
      // retry connection
      for (let i = 0; i < 3; i++) {
        newSocket.connect();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (newSocket.connected) {
          break;
        }
      }
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      start_get_variables_by_hmi_id({
        hmi_id: id,
      })
    );
  }, [id]);

  useEffect(() => {
    // Connect to Socket.IO server room id = hmi_id
    initSocket();
  }, []);

  useEffect(() => {
    errors?.map((error) => {
      notification.error({
        message: error.message,
      });
    });
  }, [errors]);

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
          loading={loading || !response}
          title={
            <Flex align="center" justify="space-between">
              <div className=""></div>
              <Flex vertical align="center">
                <Title level={4} style={{ margin: 0, padding: 0 }}>
                  {response?.hmi.name}
                </Title>
                <Text type="secondary">{response?.hmi.description}</Text>
              </Flex>
              {/* connection indicator */}
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: isSocketConnected ? "green" : "red",
                }}
              ></div>
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
            {response?.variables.map((variable) => (
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
