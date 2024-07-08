import { fireEvent, render } from "@testing-library/react";
import { Photo } from "../types/Photo";
import { PhotoList } from "./PhotoList";
import { photos } from "./test/MockUtils";

describe("PhotoList", () => {
  const fetchMore = jest.fn();
  const loading = false;
  const hasNextPage = true;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with photos", () => {
    const { getByText } = render(
      <PhotoList
        photos={photos as Photo[]}
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
      />
    );

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });

  it("renders correctly with no photos", () => {
    const { getByText } = render(
      <PhotoList
        photos={[]}
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
      />
    );

    expect(getByText("No photos found")).toBeInTheDocument();
  });

  it("renders loading text when loading", () => {
    const { getByText } = render(
      <PhotoList
        photos={photos as Photo[]}
        loading={true}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
      />
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("calls fetchMore when scrolling to the bottom of the page", () => {
    render(
      <PhotoList
        photos={photos as Photo[]}
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
      />
    );

    window.scrollY = 1000;
    fireEvent.scroll(window);
    expect(fetchMore).toHaveBeenCalled();
  });

  it("does not call fetchMore when loading", () => {
    render(
      <PhotoList
        photos={photos as Photo[]}
        loading={true}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
      />
    );

    window.scrollY = 1000;
    fireEvent.scroll(window);
    expect(fetchMore).not.toHaveBeenCalled();
  });

  it("does not call fetchMore when there is no next page", () => {
    render(
      <PhotoList
        photos={photos as Photo[]}
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={false}
      />
    );

    window.scrollY = 1000;
    fireEvent.scroll(window);
    expect(fetchMore).not.toHaveBeenCalled();
  });

  it("opens the photo in a new tab when clicked", () => {
    global.open = jest.fn();
    const { getAllByRole } = render(
      <PhotoList
        photos={photos as Photo[]}
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
      />
    );

    const img = getAllByRole("img")[0];
    fireEvent.click(img);

    expect(global.open).toHaveBeenCalledWith(photos[0].img_src, "_blank");
  });
});
