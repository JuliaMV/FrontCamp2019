import SourceTemplate from '../templates/Source';
import NewsTemplate from '../templates/News';
import Error from '../templates/Error';
import Loader from '../templates/Loader';
import Letter from '../templates/Letter';

const baseUrl = 'https://newsapi.org/v2/';

export default class App {
  constructor(key) {
    this.key = key;
    this.targetSource;
    this.targetLetter;
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

  clickLetterHandler = ({ target }) => {
    if (target.tagName === 'UL') {
      return;
    }
    if (target.tagName === 'SPAN') {
      target = target.parentNode;
    }
    const currentLetter = target.dataset.letter;
    if (this.targetLetter === currentLetter) {
      return;
    }
    this.renderSources(currentLetter);

    if (this.targetLetter) {
      this.targetLetter.classList.remove('letters_item-active');
    }
    target.classList.add('letters_item-active');
    this.targetLetter = target;
  }
  
  clickSourceHandler = async ({ target }) => {
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

  renderLetters = () => {
    const firstLetters = this.sources.map(source => source.name[0].toUpperCase());
    const letters = new Set(firstLetters);
    const containerL = document.querySelector('.letters_list');
    let lettersHTML = "";
    letters.forEach(letter => {
      lettersHTML += Letter(letter);
    })
    containerL.innerHTML = lettersHTML;
  }

  renderSources = (letter) => {
    const container = document.querySelector('.sources_list');
    container.innerHTML = this.sources
      .filter(source => source.name[0].toUpperCase() === letter)
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
      this.removeLoader();
      this.renderLetters();
    } catch(error) {
      console.log(error);
    }
    document.querySelector('.sources').addEventListener('click', this.clickSourceHandler);
    document.querySelector('.letters').addEventListener('click', this.clickLetterHandler);
  }
}
