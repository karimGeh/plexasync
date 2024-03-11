import {
  Button,
  Card,
  Empty,
  Flex,
  Input,
  Spin,
  Typography,
  notification,
} from "antd";
import { MainLayout } from "layouts/MainLayout";
import { HMICard } from "components/common/HMICard";
import { useEffect, useState } from "react";
import { CreateHMIModal } from "./hmis/create";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "store/types";
import { start_get_all_hmis } from "store/reducers/api/hmis";

const { Title } = Typography;

export const HMISPage: React.FC<React.PropsWithChildren> = () => {
  const {
    api: {
      hmis: {
        get_all_hmis: { loading, response, errors },
      },
    },
  } = useSelector<RootStateType, RootStateType>((state) => state);
  const [createHMIModalVisible, setCreateHMIModalVisible] = useState(false);
  const dispatch = useDispatch();

  const onClose = () => {
    setCreateHMIModalVisible(false);
    dispatch(start_get_all_hmis({}));
  };

  useEffect(() => {
    dispatch(start_get_all_hmis({}));
  }, [createHMIModalVisible]);

  useEffect(() => {
    errors?.map((error) => {
      notification.error({
        message: error.message,
      });
    });
  }, [errors]);
  return (
    <MainLayout>
      {createHMIModalVisible ? (
        <CreateHMIModal open={createHMIModalVisible} onClose={onClose} />
      ) : null}
      <Card bordered={false}>
        <Flex align="center" justify="space-between" style={{ height: "100%" }}>
          <Title level={3} style={{ margin: 0, padding: 0 }}>
            HMIS
          </Title>

          <Input.Search placeholder="Search" style={{ maxWidth: "60%" }} />

          <Button type="primary" onClick={() => setCreateHMIModalVisible(true)}>
            Add HMI
          </Button>
        </Flex>
      </Card>
      <Spin spinning={loading || !response}>
        <Flex wrap="wrap" gap={20} justify="center" style={{ padding: "20px" }}>
          {response && response.hmis.length > 0 ? (
            response.hmis.map((hmi) => <HMICard key={hmi.id} hmi={hmi} />)
          ) : (
            <Empty description="No HMIS found" />
          )}
        </Flex>
      </Spin>
    </MainLayout>
  );
};
