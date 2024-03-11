import api from "api";
import { ApiGenerator } from "api/apiGenerator";
import {
  AddVariablesToHMIHandlerType,
  CreateHMIHandlerType,
  GetHMIByIdHandlerType,
  GetHMIsHandlerType,
  GetVariablesByHMIIdHandlerType,
} from "api/types/API/hmi";

const getAllHMIs = ApiGenerator<
  GetHMIsHandlerType["req"],
  GetHMIsHandlerType["res"]
>(() => api.get("/hmis/"));

const getHMIById = ApiGenerator<
  GetHMIByIdHandlerType["req"] & { hmi_id: string },
  GetHMIByIdHandlerType["res"]
>(({ hmi_id }) => api.get(`/hmis/${hmi_id}`));

const createHMI = ApiGenerator<
  CreateHMIHandlerType["req"],
  CreateHMIHandlerType["res"]
>((data) => api.post("/hmis/", data));

const addVariable = ApiGenerator<
  AddVariablesToHMIHandlerType["req"] & { hmi_id: string },
  AddVariablesToHMIHandlerType["res"]
>((data) => api.post(`/hmis/${data.hmi_id}/variable`, data));

const getVariablesByHMIId = ApiGenerator<
  GetVariablesByHMIIdHandlerType["req"] & { hmi_id: string },
  GetVariablesByHMIIdHandlerType["res"]
>((data) => api.get(`/hmis/${data.hmi_id}/variables`));

const HMIsClientAPI = {
  getAllHMIs,
  getHMIById,
  createHMI,
  addVariable,
  getVariablesByHMIId,
};

export default HMIsClientAPI;
