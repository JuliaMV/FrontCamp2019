import "./Letter.scss";

const Letter = (letter) => `
  <li data-letter=${letter} class="letters_item">
    <span>${letter}</span>
  </li>
`;

export default Letter;