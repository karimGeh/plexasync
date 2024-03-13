import {
  ModbusByteOrder,
  ModbusVariableDataTypes,
  ModbusVariableTypes,
  Protocols,
  Variable,
} from "../../types";
import { VariablePuller } from "./VariablePuller";
import * as Modbus from "jsmodbus";
import net from "net";

class ModbusVariablePuller extends VariablePuller {
  interval: NodeJS.Timeout;
  socket: net.Socket;
  client: Modbus.ModbusTCPClient;
  variable: Variable<Protocols.MODBUS>;
  onNewValue: (value: string) => void;

  isClientConnected = false;

  constructor(
    variable: Variable<Protocols.MODBUS>,
    ip_address: string,
    onNewValue: (value: string) => void
  ) {
    super(variable, ip_address, onNewValue);
    const socket = new net.Socket();
    const client = new Modbus.client.TCP(
      socket,
      variable.protocol_params.slave_id
    );
    try {
      socket.connect({ host: ip_address, port: variable.port });

      socket.on("connect", () => {
        this.isClientConnected = true;
      });
    } catch (error) {
      console.log("error", error);
    }

    this.socket = socket;
    this.client = client;
    this.variable = variable;
    this.onNewValue = onNewValue;

    this.start();
  }

  async start() {
    this.interval = setInterval(async () => {
      const value = await this.read();
      this.onNewValue(value);
    }, 1000);
  }

  async read() {
    if (
      this.variable.protocol_params.type ===
      ModbusVariableTypes.HOLDING_REGISTER
    ) {
      return this.read_holding_registers();
    }

    return "0";
  }

  async read_holding_registers() {
    if (!this.isClientConnected) {
      return "0";
    }
    const response = await this.client.readHoldingRegisters(
      this.variable.protocol_params.start_address,
      [ModbusVariableDataTypes.INT16, ModbusVariableDataTypes.UINT16].includes(
        this.variable.protocol_params.data_type
      )
        ? 1
        : [
            ModbusVariableDataTypes.INT32,
            ModbusVariableDataTypes.UINT32,
            ModbusVariableDataTypes.FLOAT,
          ].includes(this.variable.protocol_params.data_type)
        ? 2
        : 1
    );

    const response_array = response.response.body.valuesAsArray as number[];

    // const response_array = [
    //   Math.floor(Math.random() * 100),
    //   // Math.floor(Math.random() * 100),
    // ];

    if (
      this.variable.protocol_params.byte_order === ModbusByteOrder.BIG_ENDIAN
    ) {
      response_array.reverse();
    }

    const value = response_array.reduce((acc, val, i) => {
      const shift = i * 16;
      return acc + val * Math.pow(2, shift);
    }, 0);

    // to binary string
    const binary_string = value.toString(2);

    return binary_string;
  }

  close() {
    clearInterval(this.interval);
    this.socket.end();
  }
}

export { ModbusVariablePuller };
