import { Protocols, Variable } from "../../types";

class VariablePuller {
  constructor(
    variable: Variable<Protocols>,
    ip_address: string,
    onNewValue: (value: string) => void
  ) {}

  update() {
    throw new Error("Method not implemented.");
  }

  close() {
    throw new Error("Method not implemented.");
  }
}

export { VariablePuller };
