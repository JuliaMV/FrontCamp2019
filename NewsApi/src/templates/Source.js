import './Source.scss';

const SourceTemplate = (source) => `
  <li class="sources_item" data-id=${source.id}>
    <span>${source.name}</span>
  </li>
`;

export default SourceTemplate;