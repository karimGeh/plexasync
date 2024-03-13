import { Protocols, Variable } from "../../types";
import { ModbusVariablePuller } from "./ModbusVariablePuller";

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
      throw new Error("Protocol not supported");
  }
};
