import { Table } from "antd";
import {
  ModbusByteOrder,
  ModbusVariableDataTypes,
  Protocols,
  Variable,
} from "api/types/index";

interface ModbusVariableParams extends React.PropsWithChildren {
  variables: Variable<Protocols.MODBUS>[];
}

export const ModbusTable: React.FC<ModbusVariableParams> = ({ variables }) => {
  return (
    <Table<Variable<Protocols.MODBUS>>
      dataSource={variables.map((variable, index) => ({
        ...variable,
        key: index,
      }))}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Unit",
          dataIndex: "unit",
          key: "unit",
          sorter: (a, b) =>
            (a.unit && b.unit && a.unit.localeCompare(b.unit)) || 0,
        },
        {},
        {
          title: "Slave ID",
          dataIndex: ["protocol_params", "slave_id"],
          key: "slave_id",
        },
        {
          title: "Address",
          dataIndex: ["protocol_params", "address"],
          key: "address",
          sorter: (a, b) =>
            a.protocol_params.address - b.protocol_params.address,
        },
        {
          title: "Type",
          dataIndex: ["protocol_params", "type"],
          key: "type",
          sorter: (a, b) =>
            a.protocol_params.type.localeCompare(b.protocol_params.type),
        },
        {
          title: "Data Type",
          dataIndex: ["protocol_params", "data_type"],
          key: "data_type",
          sorter: (a, b) =>
            a.protocol_params.data_type.localeCompare(
              b.protocol_params.data_type
            ),
          filters: [
            ...Object.entries(ModbusVariableDataTypes).map(([, value]) => ({
              text: value,
              value: value,
            })),
          ],
          onFilter: (value, record) =>
            record.protocol_params.data_type === value,
        },
        {
          title: "Byte Order",
          dataIndex: ["protocol_params", "byte_order"],
          key: "byte_order",
          filters: [
            ...Object.entries(ModbusByteOrder).map(([, value]) => ({
              text: value,
              value: value,
            })),
          ],
          onFilter: (value, record) =>
            record.protocol_params.byte_order === value,
        },
        {
          title: "Tags",
          dataIndex: "tags",
          key: "tags",
        },
      ]}
    />
  );
};
