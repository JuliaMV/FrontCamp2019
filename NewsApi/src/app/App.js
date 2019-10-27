import SourceTemplate from '../templates/Source';
import NewsTemplate from '../templates/News';
import Error from '../templates/Error';
import Loader from '../templates/Loader';

const baseUrl = 'https://newsapi.org/v2/';

let privat = null;

export default class App {
  constructor(key) {
    this.key = key;
    this.targetSource;
    this.page = 1;
  }
  
  getSources() {
    return fetch(`${baseUrl}sources?apiKey=${this.key}`)
      .then((response) => response.json())
      .then((json) => {
        const { sources } = json;
        return sources;
      })
      .catch((error) => console.log(error))
  }

  
  getNews(currentSource) {
    return fetch(`${baseUrl}everything?sources=${currentSource}&pageSize=10&page=${this.page}&apiKey=${this.key}`)
      .then((response) => response.json())
      .then((json) => {
        const { articles } = json;
        return articles;
      })
      .catch((error) => console.log(error))
  }

  
  clickHandler = async (event) => {
    let { target } = event;
    if (target.tagName === 'UL') {
      return;
    }
    if (target.tagName === 'SPAN') {
      target = target.parentNode;
    }
    const currentSource = target.dataset.id;
    if (this.targetSource === target) {
      return;
    }
    if (this.targetSource) {
      this.targetSource.classList.remove('sources_item-active');
    }
    target.classList.add('sources_item-active');
    this.targetSource = target;
    
    this.renderLoader();
    try {
      const news = await this.getNews(currentSource);
      this.renderNews(news);
      this.removeLoader();
    } catch(error) {
      this.renderError();
      console.log(error);
    }
  }

  renderSources() {
    const container = document.querySelector('.sources_list');
    container.innerHTML = this.sources
      .map((source) => SourceTemplate(source))
      .join('');
  }

  renderNews(news) {
    const container = document.querySelector('.news_list');
    if (news.length === 0) {
      container.innerHTML = Error();
      return;
    }
    container.innerHTML = news
      .map(item => NewsTemplate(item))
      .join('');
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  renderError() {
    const container = document.querySelector('.news_list');
    container.innerHTML = Error(true);
  }

  renderLoader = () => {
    const container = document.querySelector('.loader_container');
    container.innerHTML = Loader();
  }

  removeLoader = () => {
    const container = document.querySelector('.loader_container');
    container.innerHTML = '';
  }

  start = async () => {
    this.renderLoader();
    try {
      this.sources = await this.getSources();
      this.removeLoader()
      this.renderSources();
    } catch(error) {
      console.log(error);
    }
    document.querySelector('.sources').addEventListener('click', this.clickHandler)
  }
}
