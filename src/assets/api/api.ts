import { CommonResponse, HTTPMethod } from "./type";
import HTTP from "./http";

export const HomeService = {
  getAllMd(): Promise<null | CommonResponse<any | null>> {
    return HTTP.sendReq("/clfe/getAllMd", HTTPMethod.GET);
  },
  addMd(data: any): Promise<null | CommonResponse<any | null>> {
    return HTTP.sendReq("/clfe/addMd", HTTPMethod.POST, data);
  },
};
