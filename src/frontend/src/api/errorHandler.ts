import { CustomError } from "./types";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

export const errorParser = (
  error: AxiosError<ErrorResponse>
): CustomError[] => {
  console.log("====================================");
  console.log(error);
  console.log("====================================");
  const data = error.response?.data;
  if (!error || !data || !("error" in data)) {
    return [
      {
        message: "Error connecting to server",
      },
    ];
  }

  return [
    {
      message: data.error,
    },
  ];
};
