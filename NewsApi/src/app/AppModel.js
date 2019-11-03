const baseUrl = 'https://newsapi.org/v2/';

export const GET_SOURCES = 'getSources';
export const GET_NEWS = 'getNews';

export default class AppModel {
  constructor(key) {
    this.key = key;
    this.page = 1;
    this.pageSize = 10;
  }

  requestsFactory = ({ type, ...rest }) => {
    switch (type) {
      case GET_NEWS: {
        const { currentSource } = rest;
        return fetch(`${baseUrl}everything?sources=${currentSource}&pageSize=${this.pageSize}&page=${this.page}&apiKey=${this.key}`)
        .then((response) => response.json())
        .then((json) => {
          const { articles } = json;
          return articles;
        })
        .catch((error) => this.logError(error));
      }
      case GET_SOURCES: {
        return fetch(`${baseUrl}sources?apiKey=${this.key}`)
        .then((response) => response.json())
        .then((json) => {
          const { sources } = json;
          return sources;
        })
        .catch((error) => this.log(error))
      }
    }
  }

  proxyFactory = new Proxy(this.requestsFactory, {
    apply(target, thisArg, args) {
      console.log(...args);
      return target.apply(thisArg, args);
    },
  });

  logError = (error) => {
    import(/* webpackChunkName: "ErrorHandler" */ './ErrorHandler').then(module => {
      const ErrorHandler = module.default;
      const handler = new ErrorHandler;
      handler.showAlert();
      console.log(error);
    });
  }
}
