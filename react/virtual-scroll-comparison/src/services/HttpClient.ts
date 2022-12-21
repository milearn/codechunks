import axios, { AxiosRequestConfig } from 'axios';

interface IHttpClientRequestParameters {
  url: string;
  requiresToken?: boolean;
  payload?: Object;
}

interface IHttpClient {
  get<T>(parameters: IHttpClientRequestParameters): Promise<T>;
  post<T>(parameters: IHttpClientRequestParameters): Promise<T>;
}

class HttpClient implements IHttpClient {
  getToken() {
    return 'tokenabc';
  }

  get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // extract the individual parameters
      const { url, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
      };

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const token = this.getToken();
        options.headers!.RequestVerificationToken = token;
      }

      // finally execute the GET request with axios:
      axios
        .get(url, options)
        .then((response: any) => {
          resolve(response.data as T);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }

  post<T>(parameters: IHttpClientRequestParameters): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
      };

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const token = this.getToken();
        options.headers!.RequestVerificationToken = token;
      }

      // finally execute the GET request with axios:
      axios
        .post(url, payload, options)
        .then((response: any) => {
          resolve(response.data as T);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }
}

export default HttpClient;
