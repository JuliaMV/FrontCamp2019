import SourceTemplate from 'Templates/Source';
import NewsTemplate from 'Templates/News';
import Error from 'Templates/Error';
import Loader from 'Templates/Loader';
import Letter from 'Templates/Letter';

const baseUrl = 'https://newsapi.org/v2/';

const sourcesHideClass = 'sources_list-hide';
const sourcesActiveClass = 'sources_item-active';
const lettersActiveClass = 'letters_item-active';

export default class App {
  constructor(key) {
    this.key = key;
    this.targetSource;
    this.targetLetter;
    this.page = 1;
    this.pageSize = 10;
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
    return fetch(`${baseUrl}everything?sources=${currentSource}&pageSize=${this.pageSize}&page=${this.page}&apiKey=${this.key}`)
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

    if (this.containerSources) {
      this.containerSources.classList.remove(sourcesHideClass);
    }

    if (target.tagName === 'SPAN') {
      target = target.parentNode;
    }
    const { letter: currentLetter} = target.dataset;
    if (this.targetLetter && this.targetLetter.dataset.letter === currentLetter) {
      return;
    }
    this.renderSources(currentLetter);

    if (this.targetLetter) {
      this.targetLetter.classList.remove(lettersActiveClass);
    }
    target.classList.add(lettersActiveClass);
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
      this.targetSource.classList.remove(sourcesActiveClass);
    }
    target.classList.add(sourcesActiveClass);
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

    this.containerSources.classList.add(sourcesHideClass);
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
    if (!this.containerSources) {
        this.containerSources = document.querySelector('.sources_list');
    }
    this.containerSources.innerHTML = this.sources
      .filter(source => source.name[0].toUpperCase() === letter)
      .map((source) => SourceTemplate(source))
      .join('');
  }

  renderNews(news) {
    if (!this.containerNews) {
      this.containerNews = document.querySelector('.news_list');
    }
    if (news.length === 0) {
        this.containerNews.innerHTML = Error();
      return;
    }
    this.containerNews.innerHTML = news
      .map(item => NewsTemplate(item))
      .join('');
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  renderError() {
    if (!this.containerError) {
      this.containerError = document.querySelector('.news_list');
    }
    this.containerError.innerHTML = Error(true);
  }

  renderLoader = () => {
    if (!this.containerLoader) {
      this.containerLoader = document.querySelector('.loader_container');
    }
    this.containerLoader.innerHTML = Loader();
  }

  removeLoader = () => {
    this.containerLoader.innerHTML = '';
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
