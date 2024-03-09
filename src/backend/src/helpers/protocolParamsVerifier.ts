import { ProtocolParamsType, Protocols } from "../types/Enums";

interface ProtocolParamsVerifierParams {
  protocol: string;
  protocol_params: ProtocolParamsType<Protocols>;
}

export const isValidProtocolParams = ({
  protocol,
  protocol_params,
}: ProtocolParamsVerifierParams): boolean => {
  switch (protocol) {
    case Protocols.MODBUS:
      if (
        !protocol_params.port ||
        !protocol_params.unit_ip ||
        !protocol_params.timeout ||
        !protocol_params.retries ||
        !protocol_params.reconnect_interval ||
        !protocol_params.byte_order ||
        !protocol_params.use_tls
      ) {
        return false;
      }
      break;
  }

  return true;
};
