module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["./modules/**/*.ts", "!./modules/**/__fixtures__/*"],
  coverageDirectory: "./coverage/",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
