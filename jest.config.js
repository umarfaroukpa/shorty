module.exports = {
    preset: 'ts-jest',
     // Use 'node' if you're not testing in a browser-like environment
    testEnvironment: 'jsdom', 
    transform: {
        // Use Babel for transforming TypeScript/JSX files
      '^.+\\.tsx?$': 'babel-jest',  
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
     // Make sure node_modules are ignored by Jest
    transformIgnorePatterns: ['<rootDir>/node_modules/'], 
  };
  