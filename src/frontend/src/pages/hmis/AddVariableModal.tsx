import {
  Card,
  Col,
  Input,
  Modal,
  Row,
  Table,
  Tag,
  Typography,
  notification,
} from "antd";
import HMIsClientAPI from "api/handlers/hmis";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Paths from "routes/paths";
import { start_get_all_variables } from "store/reducers/api/variables";
import { RootStateType } from "store/types";

const { Title } = Typography;

interface AddVariableModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const AddVariableModal: React.FC<AddVariableModalProps> = ({
  open,
  onClose,
}) => {
  const {
    api: {
      variables: {
        all_variables: {
          loading: allVariablesLoading,
          response: allVariablesResponse,
          errors: allVariablesErrors,
        },
      },
    },
  } = useSelector<RootStateType, RootStateType>((state) => state);

  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const onOk = async () => {
    if (loading || !id) return;

    setLoading(true);
    const { errors } = await HMIsClientAPI.addVariables({
      hmi_id: id,
      variables: selectedVariables,
    });
    setLoading(false);

    if (errors) {
      errors.map((error) => {
        notification.error({
          message: error.message,
        });
      });
      return;
    }

    onClose();
  };

  useEffect(() => {
    dispatch(start_get_all_variables({}));
  }, []);

  useEffect(() => {
    allVariablesErrors?.map((error) => {
      notification.error({
        message: error.message,
      });
    });
  }, [allVariablesErrors]);

  return !id ? (
    <Navigate to={Paths.hmis} />
  ) : (
    <Modal
      // title="Add Variables to your HMI"
      centered
      open={open}
      onOk={onOk}
      onCancel={onClose}
      width={1000}
      styles={{
        body: {
          minHeight: "500px",
          // height: "80vh",
          maxHeight: "80vh",
        },
      }}
    >
      <Card
        bordered={false}
        style={{ padding: 0, margin: 0, boxShadow: "none" }}
      >
        <Row gutter={[20, 20]} align={"middle"}>
          <Col span={8}>
            <Title level={4} style={{ margin: 0, padding: 0 }}>
              All Variables
            </Title>
          </Col>
          <Col span={16}>
            <Input.Search
              placeholder="Search for a variable"
              style={{ width: "100%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
      </Card>
      <Table
        loading={allVariablesLoading}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedVariables(selectedRowKeys as string[]);
          },
        }}
        dataSource={
          allVariablesResponse?.variables
            .filter((variable) =>
              variable.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((variable) => ({
              key: variable.id,
              ...variable,
            })) || []
        }
        // filter by search

        columns={[
          // add checkbox column
          {
            title: "Device ID",
            dataIndex: "device_id",
            key: "device_id",
            sorter: (a, b) => a.device_id.localeCompare(b.device_id),
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: "Protocol",
            dataIndex: "protocol",
            key: "protocol",
            sorter: (a, b) => a.protocol.localeCompare(b.protocol),
          },
          {
            title: "Port",
            dataIndex: "port",
            key: "port",
            sorter: (a, b) => a.port - b.port,
          },
          {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags: string[]) => (
              <>
                {tags.map((tag) => (
                  <Tag color="blue" key={tag}>
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
    </Modal>
  );
};
