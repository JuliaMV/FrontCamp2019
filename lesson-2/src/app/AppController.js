import AppModel, { GET_SOURCES, GET_NEWS } from './AppModel';
import AppView from './AppView';

const API_KEY = '2d8e0d602e59435c86345a7b8b40c0d8';

const sourcesHideClass = 'sources_list-hide';
const sourcesActiveClass = 'sources_item-active';
const lettersActiveClass = 'letters_item-active';

export default class AppController {
  constructor() {
    this.model = new AppModel(API_KEY)
    this.view = new AppView();
    this.sources = [];
    this.targetLetter = null;
    this.targetSource = null;
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
    this.view.renderSources(currentLetter, this.sources, this.containerSources);

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

    this.view.renderLoader(this.containerLoader);

    try {
      const news = await this.model.proxyFactory({type: GET_NEWS, currentSource});
      this.view.renderNews(news, this.containerNews);
    } catch(error) {
      this.model.logError(error);
    }
    
    this.view.removeLoader(this.containerLoader);
    this.containerSources.classList.add(sourcesHideClass);
  }

  watch = () => {
    document.querySelector('.sources').addEventListener('click', this.clickSourceHandler);
    document.querySelector('.letters').addEventListener('click', this.clickLetterHandler);
    this.containerLetters = document.querySelector('.letters_list');
    this.containerSources = document.querySelector('.sources_list');
    this.containerNews = document.querySelector('.news_list');
    this.containerLoader = document.querySelector('.loader_container');
  }

  start = async () => {
    this.watch();
    this.view.renderLoader(this.containerLoader);
    try {
      this.sources = await this.model.proxyFactory({type: GET_SOURCES});
      this.view.renderLetters(this.sources, this.containerLetters);
    } catch(error) {
      this.model.logError(error);
    }

    this.view.removeLoader(this.containerLoader);
  }
}
