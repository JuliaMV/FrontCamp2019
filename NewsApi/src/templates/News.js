import './News.scss';

// const placeholder = 'https://309w5s255371fs4df2vftgbl-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/placeholder.jpg';
import placeholder from "../assets/img/placeholder.jpg";

const NewsTemplate = ({ urlToImage, url, title, description, publishedAt }) => `
  <li class="news_item">
    <div class="news_imageContainer">
      <img class="news_image" src=${urlToImage || placeholder} alt="image for news">
    </div>
    <div class="news_text">
      <h2 class="news_title">
        <a href=${url || ''} target="_blank">
          ${title || 'No title'}
        </a>
      </h2>
      <p class="news_description">${description || 'No despription provided'}</p>
      <div class="news_footer">
        <span class="news_date">${new Date(publishedAt).toLocaleString() || ''}</span>
        <span class="news_link"><a href=${url || ''} target="_blank">Read&nbsp;more...</a></span>
      </div>
    </div>
  </li>
`;

export default NewsTemplate;
