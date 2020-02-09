module.exports = {
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  reporters: [
    'default',
    [
      '@reportportal/reportportal-agent-jest',
      {
        token: '0e06c377-bf06-4bc2-92c0-d6b68d2a05b5',
        endpoint: 'https://rp.epam.com/api/v1',
        project: 'YULIYA_MIATLIONAK_PERSONAL',
        launch: 'YULIYA_MIATLIONAK_PERSONAL',
        tags: ['tag1', 'tag2'],
      },
    ],
  ],
};
