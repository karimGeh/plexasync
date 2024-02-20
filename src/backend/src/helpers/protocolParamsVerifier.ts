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
        !protocol_params.default__port ||
        !protocol_params.default__unit_ip ||
        !protocol_params.default__timeout ||
        !protocol_params.default__retries ||
        !protocol_params.default__reconnect_interval ||
        !protocol_params.default__byte_order ||
        !protocol_params.default__use_tls
      ) {
        return false;
      }
      break;
  }

  return true;
};
