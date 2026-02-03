module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^/vite\\.svg$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|jpeg|gif|webp)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
}