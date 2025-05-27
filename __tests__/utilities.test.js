import { getNewPage } from "../src/utils/getNewPage";

describe("getNewPage function", () => {
  test("Returns a number", () => {
    expect(typeof getNewPage(1, 1)).toBe("number");
  });

  test("Correctly increments the current page number, based on the second argument", () => {
    expect(getNewPage(1, 3)).toBe(4);
    expect(getNewPage(5, 8)).toBe(13);
    expect(getNewPage(200, 125)).toBe(325);
  });

  test("Correctly decrements the current page number, based on the second argument", () => {
    expect(getNewPage(10, -7)).toBe(3);
    expect(getNewPage(200, -25)).toBe(175);
    expect(getNewPage(3, -2)).toBe(1);
  });

  test("Returns current page if second argument is 0", () => {
    expect(getNewPage(1, 0)).toBe(1);
    expect(getNewPage(5, 0)).toBe(5);
  });

  test("Does not mutate arguments", () => {
    const currentPage = 5;
    const change = 3;
    getNewPage(currentPage, change);
    expect(currentPage).toBe(5);
    expect(change).toBe(3);
  });
});
