import api from "api";
import { ApiGenerator } from "api/apiGenerator";
import { GetAllVariablesHandlerType } from "api/types/API/variables";

const getAllVariables = ApiGenerator<
  GetAllVariablesHandlerType["req"],
  GetAllVariablesHandlerType["res"]
>(() => api.get("/variables/"));

const VariablesClientAPI = {
  getAllVariables,
};

export default VariablesClientAPI;
