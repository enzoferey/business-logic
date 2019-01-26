import helloWorld from "../hello-world";

test("works", () => {
  const num: number = 42;
  expect(helloWorld("Enzo")).toBe("Hello world Enzo");
});
