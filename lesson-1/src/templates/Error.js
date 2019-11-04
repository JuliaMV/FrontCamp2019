import './Error.scss';

const Error = (isError) => {
  const errorMessage = "Something went wrong, try again later";
  const noNewsMessage = "No news provided, choose something else"
  return `
  <li class="error">${isError ? errorMessage : noNewsMessage }</li>
`};

export default Error;