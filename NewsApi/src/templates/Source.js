import './Source.scss';

const SourceTemplate = ({ id, name }) => `
  <li class="sources_item" data-id=${id}>
    <span>${name}</span>
  </li>
`;

export default SourceTemplate;