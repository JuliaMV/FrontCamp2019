import './News.scss';

const placeholder = 'https://309w5s255371fs4df2vftgbl-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/placeholder.jpg';

const NewsTemplate = (news) => `
  <li class="news_item">
    <div class="news_imageContainer">
      <img class="news_image" src=${news.urlToImage || placeholder} alt="image for news">
    </div>
    <div class="news_text">
      <h2 class="news_title">
        <a href=${news.url || ''}>
          ${news.title || 'No title'}
        </a>
      </h2>
      <p class="news_description">${news.description || 'No despription provided'}</p>
      <div class="news_footer">
        <span class="news_date">${new Date(news.publishedAt).toLocaleString() || ''}</span>
        <span class="news_link"><a href=${news.url || ''}>Red more...</a></span>
      </div>
    </div>
  </li>
`;

export default NewsTemplate;
