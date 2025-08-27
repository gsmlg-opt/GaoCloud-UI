export default {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 1,
      functions: 3,
      lines: 10,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    'utils': '<rootDir>/src/utils',
    'com': '<rootDir>/src/com',
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: ['<rootDir>/internals/testing/test-bundler.js'],
  setupFiles: ['<rootDir>/internals/testing/setup.js'],
  testRegex: 'tests/.*\\.test\\.js$',
  transformIgnorePatterns: [
    '/node_modules/(?!cheerio|@fortawesome|@babel|react-simple-code-editor|react-dnd|dnd-core|@react-dnd|react-router|query-string|strict-uri-encode|react-virtualized|@vx|d3-shape|d3-path|d3-array|d3-scale|d3-time|d3-interpolate|d3-color|d3-format|d3-time-format|@data-ui).+\\.js$',
  ],
  extensionsToTreatAsEsm: ['.js', '.jsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testEnvironment: 'jsdom',
};
