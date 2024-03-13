import { Server } from "socket.io";
import { HMIModel } from "../models";
import { VariableModel } from "../models/Variable";
import { DeviceModel } from "../models/Device";
import { createVariablePuller } from "./variablePuller";
import { VariablePuller } from "./variablePuller/VariablePuller";

class HMIRoomsController {
  ioServer: Server;
  hmis: string[] = [];
  variable_pullers: { [key: string]: VariablePuller[] } = {};

  setIoServer(ioServer: Server) {
    this.ioServer = ioServer;
  }

  async addHMI(hmi_id: string) {
    if (!this.hmis.includes(hmi_id)) {
      this.hmis.push(hmi_id);
      this.initHMI(hmi_id);
    }
  }

  async removeHMI(hmi_id: string) {
    this.hmis = this.hmis.filter((id) => id !== hmi_id);
    this.variable_pullers[hmi_id]?.forEach((variablePuller) => {
      variablePuller.close();
    });
  }

  private async initHMI(hmi_id: string) {
    const hmi = await HMIModel.getHMIById(hmi_id);
    const variables = await VariableModel.getVariablesByIdsList(hmi.variables);
    const devices = await DeviceModel.getDevicesByIdsList(
      variables.map((v) => v.device_id)
    );

    const variablesPuller = variables.map((variable) => {
      const device = devices.find((d) => d.id === variable.device_id);
      if (!device) {
        return;
      }
      const variablePuller = createVariablePuller(
        variable,
        device.ip_address,
        (value) => {
          this.ioServer.to(hmi_id).emit("variable_value", {
            variable_id: variable.id,
            value,
          });
        }
      );
      return variablePuller;
    });

    this.variable_pullers[hmi_id] = variablesPuller;
  }
}

export const hmiRoomsController = new HMIRoomsController();
