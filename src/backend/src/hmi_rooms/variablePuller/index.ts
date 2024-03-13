import { Protocols, Variable } from "../../types";
import { ModbusVariablePuller } from "./ModbusVariablePuller";
import { VariablePuller } from "./VariablePuller";

export const createVariablePuller = (
  variable: Variable<Protocols>,
  ip_address: string,
  onNewValue: (value: string) => void
) => {
  switch (variable.protocol) {
    case Protocols.MODBUS:
      return new ModbusVariablePuller(
        variable as Variable<Protocols.MODBUS>,
        ip_address,
        onNewValue
      );
    default:
      return new VariablePuller(variable, ip_address, onNewValue);
  }
};
