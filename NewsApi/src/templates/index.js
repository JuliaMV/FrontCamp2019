export const newsTemplate = (news) => `
  <span>${news.title}</span>
`;

export const sourceTemplate = (source) => `
  <span data-id=${source.id}>${source.id}</span>
`;