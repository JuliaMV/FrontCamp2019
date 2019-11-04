import SourceTemplate from 'Templates/Source';
import NewsTemplate from 'Templates/News';
import Error from 'Templates/Error';
import Loader from 'Templates/Loader';
import Letter from 'Templates/Letter';

export default class AppView {
  renderLetters = (sources, container) => {
    const firstLetters = sources.map(source => source.name[0].toUpperCase());
    const letters = new Set(firstLetters);
    let lettersHTML = "";
    letters.forEach(letter => {
      lettersHTML += Letter(letter);
    })
    container.innerHTML = lettersHTML;
  }

  renderSources = (letter, sources, container) => {
    container.innerHTML = sources
      .filter(source => source.name[0].toUpperCase() === letter)
      .map((source) => SourceTemplate(source))
      .join('');
  }

  renderNews(news, container) {
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

  renderLoader = (container) => {
    container.innerHTML = Loader();
  }

  removeLoader = (container) => {
    container.innerHTML = '';
  }
}
