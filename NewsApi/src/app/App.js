import { sourceTemplate, newsTemplate } from '../templates';

const baseUrl = 'https://newsapi.org/v2/';

export default class App {
  constructor(key) {
    this.key = key;
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
    return fetch(`${baseUrl}everything?sources=${currentSource}&pageSize=10&apiKey=${this.key}`)
      .then((response) => response.json())
      .then((json) => {
        const { articles } = json;
        return articles;
      })
      .catch((error) => console.log(error))
  }

  renderSources() {
    const sources = document.querySelector('#sources');
    sources.innerHTML = this.sources
      .map(source => sourceTemplate(source))
      .join('');
  }

  renderNews(news) {
    const container = document.querySelector('#news');
    container.innerHTML = news
      .map(item => newsTemplate(item))
      .join('');
  }

  clickHandler = async (event) => {
    const currentSource = event.target.dataset.id;
    if (!currentSource) return;
    let news;
    try {
      news = await this.getNews(currentSource);
    } catch(error) {
      console.log(error);
    }
    if (news) this.renderNews(news);
  }

  async start() {
    try {
      this.sources = await this.getSources();
      this.renderSources();
    } catch(error) {
      console.log(error);
    }
    document.querySelector('#sources').addEventListener('click', this.clickHandler)
  }
}
