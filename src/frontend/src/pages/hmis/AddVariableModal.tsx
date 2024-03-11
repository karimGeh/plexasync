interface AddVariableModalProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const AddVariableModal: React.FC<AddVariableModalProps> = ({
  open,
  onClose,
}) => {
  return <div className="">Hello from AddVariableModal</div>;
};
