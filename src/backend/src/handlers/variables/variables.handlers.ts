import { VariableModel } from "../../models/Variable";
import { GetAllVariablesHandlerType } from "../../types/API/variables";

const getAllVariables: GetAllVariablesHandlerType = async (req, res) => {
  const variables = await VariableModel.getVariables({});

  res.status(200).json({
    success: true,
    variables,
  });
};

export const VariablesHandlers = {
  getAllVariables,
};
