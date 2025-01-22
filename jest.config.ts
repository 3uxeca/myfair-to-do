import type { Config } from "jest";

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // next.config.js 및 .env 파일을 로드할 Next.js 앱의 경로
  dir: "./",
});

const customJestConfig: Config = {
  clearMocks: true,
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

const jestConfigWithOverrides = async (...args: any[]) => {
  const configFn = createJestConfig(customJestConfig);
  const res = await configFn(...args);
  res.moduleNameMapper = {
    '\\.svg': '<rootDir>/__mocks__/svgrMock.tsx', // .svg 확장자 검색
    ...res.moduleNameMapper,
  };

  return res;
}

// module.exports = createJestConfig(customJestConfig);
module.exports = jestConfigWithOverrides;
