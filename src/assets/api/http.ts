import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import { CommonResponse, HTTPMethod, RspStatusCode } from './type';

class HTTP {
  static singletonHttpInstance: HTTP | null = null;

  private baseURL: string = import.meta.env.VITE_BASE_HOST;

  private defaultTimeout: number = 300000;

  private defaultHeader: any = {
    'Content-Type': 'application/json',
  };

  constructor() {
    if (HTTP.singletonHttpInstance) {
      return HTTP.singletonHttpInstance;
    }

    axios.defaults.withCredentials = true;

    /** 请求拦截器  */
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    /** 响应拦截器  */
    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data && response.data.code == RspStatusCode.SUCCESS) {
          return response;
        }
        return Promise.reject(response.data);
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    HTTP.singletonHttpInstance = this;
    return HTTP.singletonHttpInstance;
  }

  /**
   *
   * @param url 请求地址
   * @param method 请求方法
   * @param data 请求体
   * @param header 请求头
   * @param timeout 请求超时时间
   * @returns {Promise<AxiosResponse<T>>}
   */
  public sendReq<T>(
    url: string,
    method: HTTPMethod,
    data?: { [key: string]: unknown },
    option?: AxiosRequestConfig,
  ): Promise<null | CommonResponse<T>> {
    const sendUrl = `${this.baseURL}${url}`;

    const currentTimeout: number = this.defaultTimeout;
    const currentHeader: AxiosRequestHeaders = this.defaultHeader;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let responsePromise: Promise<null | CommonResponse<T>> = new Promise(() => {});

    const config = {
      headers: {
        ...currentHeader,
        // referer: "http://finance.sina.com.cn",
        ...(option && option?.headers),
      },
      timeout: (option && option?.timeout) || currentTimeout,
    };

    switch (method) {
      case HTTPMethod.GET:
        responsePromise = axios
          .get<CommonResponse<T>>(sendUrl, {
            ...config,
            params: data,
          })
          .then((response) => {
            return response.data;
          })
          .catch((error: any) => {
            // message.error(JSON.stringify(error.message || error.msg || error));
            return error;
          });
        break;
      case HTTPMethod.PUT:
      case HTTPMethod.POST:
        responsePromise = axios
          .post<CommonResponse<T>>(sendUrl, data, {
            headers: currentHeader,
            timeout: currentTimeout,
          })
          .then((response) => {
            return response.data;
          })
          .catch((error: any) => {
            console.log('POST =======', error);
            // message.error(JSON.stringify(error.message || error.msg || error));
            console.log(JSON.stringify(error.message || error.msg || error));
            return null;
          });
        break;
      default:
        break;
    }
    return responsePromise;
  }
}

export default new HTTP();
