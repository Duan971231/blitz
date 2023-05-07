import HTTP from './http';
import { CommonResponse, HTTPMethod } from './type';

export const HomeService = {
  getAllMd(): Promise<null | CommonResponse<any | null>> {
    return HTTP.sendReq('/clfe/getAllMd', HTTPMethod.GET);
  },
  addMd(data: any): Promise<null | CommonResponse<any | null>> {
    return HTTP.sendReq('/clfe/addMd', HTTPMethod.POST, data);
  },
};
