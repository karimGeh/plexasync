import { Empty, FormInstance } from "antd";
import { Protocols, Variable } from "../../../api/api_types";

interface OPCUAFormProps extends React.PropsWithChildren {
  form: FormInstance<Variable<Protocols.OPCUA>>;
}

export const OPCUAForm: React.FC<OPCUAFormProps> = () => {
  return <Empty description="This protocol is not available right now." />;
};
