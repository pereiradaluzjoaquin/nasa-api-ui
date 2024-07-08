import { fireEvent, render } from "@testing-library/react";
import { InfiniteScroll } from "./InfiniteScroll";

describe("InfiniteScroll", () => {
  let fetchMore: jest.Mock;

  beforeEach(() => {
    fetchMore = jest.fn();
    Object.defineProperty(window, "innerHeight", { value: 1000 });
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
    });
  });

  afterEach(() => {
    window.removeEventListener("scroll", () => {});
  });

  it("calls fetchMore when scrolling to the bottom of the page", () => {
    render(
      <InfiniteScroll
        fetchMore={fetchMore}
        hasNextPage={true}
        loading={false}
      />
    );
    window.scrollY = 1000;
    fireEvent.scroll(window);
    expect(fetchMore).toHaveBeenCalled();
  });

  it("does not call fetchMore when loading", () => {
    render(
      <InfiniteScroll fetchMore={fetchMore} hasNextPage={true} loading={true} />
    );
    window.scrollY = 1000;
    fireEvent.scroll(window);
    expect(fetchMore).not.toHaveBeenCalled();
  });

  it("does not call fetchMore when there is no next page", () => {
    render(
      <InfiniteScroll
        fetchMore={fetchMore}
        hasNextPage={false}
        loading={false}
      />
    );
    window.scrollY = 1000;
    fireEvent.scroll(window);
    expect(fetchMore).not.toHaveBeenCalled();
  });
});
