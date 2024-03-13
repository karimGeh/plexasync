import { Protocols, Variable } from "../../types";

class VariablePuller {
  variable: Variable<Protocols>;
  ip_address: string;
  onNewValue: (value: string) => void;

  constructor(
    variable: Variable<Protocols>,
    ip_address: string,
    onNewValue: (value: string) => void
  ) {
    this.variable = variable;
    this.ip_address = ip_address;
    this.onNewValue = onNewValue;
  }

  update() {
    throw new Error("Method not implemented.");
  }

  close() {
    throw new Error("Method not implemented.");
  }
}

export { VariablePuller };
