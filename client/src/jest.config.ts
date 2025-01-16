export {};

const config = {
  testEnvironment: 'jsdom',  // to simulate a browser environment
  testRunner: 'jest-circus/runner', // Using the new test runner
  transformIgnorePatterns: ['/node_modules/(?!(react-router-dom)/)'],
  preset: 'ts-jest', // Use ts-jest to transpile TypeScript files
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest', // Process TypeScript and JavaScript files
  },
};

export default config;
