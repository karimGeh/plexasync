import { Protocols, Variable } from "api/types/index";
import { MODBUS_VariableValueComponent } from "./VariableValueComponentByProtocol/MODBUS_VariableValueComponent";

interface VariableValueComponentProps extends React.PropsWithChildren {
  variable: Variable<Protocols>;
  value: string; //binary string
}

export const VariableValueComponent: React.FC<VariableValueComponentProps> = ({
  variable,
  value,
}) => {
  return variable.protocol === Protocols.MODBUS ? (
    <MODBUS_VariableValueComponent
      variable={variable as Variable<Protocols.MODBUS>}
      value={value}
    />
  ) : (
    "N/A"
  );
};
