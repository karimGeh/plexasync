import { HMIModel } from "../../models";
import { DeviceModel } from "../../models/Device";
import { VariableModel } from "../../models/Variable";
import {
  AddVariablesToHMIHandlerType,
  CreateHMIHandlerType,
  GetHMIByIdHandlerType,
  GetHMIsHandlerType,
  GetVariablesByHMIIdHandlerType,
} from "../../types/API/hmi";

const createHMIHandler: CreateHMIHandlerType = async (req, res) => {
  const {
    name, //
    description,
    tags,
    frontend_layout,
  } = req.body;

  const hmi = await HMIModel.createHMI({
    name,
    description,
    tags,
    frontend_layout,
    cover: "",
    variables: [],
  });

  res.status(201).json({
    success: true,
    hmi,
  });
};

const getHMIByIdHandler: GetHMIByIdHandlerType = async (req, res) => {
  const hmi = req.hmi;

  res.status(200).json({ success: true, hmi });
};

// get hmis handler
const getHMIsHandler: GetHMIsHandlerType = async (req, res) => {
  const { page, limit, sort } = req.query;

  const hmis = await HMIModel.getHMIs({
    page: page ? parseInt(page as string) : undefined,
    limit: limit ? parseInt(limit as string) : undefined,
    sort: sort ? (sort as string) : undefined,
  });

  res.status(200).json({
    success: true,
    hmis,
  });
};

const addVariablesToHMI: AddVariablesToHMIHandlerType = async (req, res) => {
  const { variables } = req.body;
  const hmi = req.hmi;

  hmi.variables = [...hmi.variables, ...variables];
  hmi.variables = [...new Set(hmi.variables)];

  await HMIModel.updateHMIVariables(hmi.id, hmi.variables);

  res.status(200).json({
    success: true,
    hmi,
  });
};

const removeVariablesFromHMI: AddVariablesToHMIHandlerType = async (
  req,
  res
) => {
  const { variables } = req.body;
  const hmi = req.hmi;

  hmi.variables = hmi.variables.filter((v) => !variables.includes(v));

  await HMIModel.updateHMIVariables(hmi.id, hmi.variables);

  res.status(200).json({
    success: true,
    hmi,
  });
};

const getVariablesByHMIId: GetVariablesByHMIIdHandlerType = async (
  req,
  res
) => {
  const hmi = req.hmi;

  const variables = await VariableModel.getVariablesByIdsList(hmi.variables);

  res.status(200).json({
    success: true,
    hmi,
    variables,
  });
};

export const HMIsHandlers = {
  createHMIHandler,
  getHMIByIdHandler,
  getHMIsHandler,
  addVariablesToHMI,
  removeVariablesFromHMI,
  getVariablesByHMIId,
};
