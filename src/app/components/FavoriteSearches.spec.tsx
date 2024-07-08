import { fireEvent, render } from "@testing-library/react";
import { FavoriteSearches } from "./FavoriteSearches";

describe("FavoriteSearches", () => {
  const favorites = [
    { rover: "Curiosity", camera: "FHAZ", sol: 1000, earthDate: "2020-09-22" },
    {
      rover: "Opportunity",
      camera: "RHAZ",
      sol: 2000,
      earthDate: "2020-10-22",
    },
  ];
  const onLoadFavorite = jest.fn();
  const onSaveFavorite = jest.fn();
  const onDeleteFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of favorites", () => {
    const { getByText } = render(
      <FavoriteSearches
        favorites={favorites}
        onLoadFavorite={onLoadFavorite}
        onSaveFavorite={onSaveFavorite}
        onDeleteFavorite={onDeleteFavorite}
      />
    );

    expect(getByText("Favorite Searches")).toBeInTheDocument();
    expect(getByText("Save Favorite")).toBeInTheDocument();
    expect(getByText("Rover: Curiosity")).toBeInTheDocument();
    expect(getByText("Rover: Opportunity")).toBeInTheDocument();
  });

  it("renders correctly with no favorites", () => {
    const { getByText } = render(
      <FavoriteSearches
        favorites={[]}
        onLoadFavorite={onLoadFavorite}
        onSaveFavorite={onSaveFavorite}
        onDeleteFavorite={onDeleteFavorite}
      />
    );

    expect(getByText("No favorite searches saved.")).toBeInTheDocument();
  });

  it("calls onLoadFavorite when the Load button is clicked", () => {
    const { getAllByText } = render(
      <FavoriteSearches
        favorites={favorites}
        onLoadFavorite={onLoadFavorite}
        onSaveFavorite={onSaveFavorite}
        onDeleteFavorite={onDeleteFavorite}
      />
    );

    fireEvent.click(getAllByText("Load")[0]);
    expect(onLoadFavorite).toHaveBeenCalled();
  });

  it("calls onDeleteFavorite when the Delete button is clicked", () => {
    const { getAllByText } = render(
      <FavoriteSearches
        favorites={favorites}
        onLoadFavorite={onLoadFavorite}
        onSaveFavorite={onSaveFavorite}
        onDeleteFavorite={onDeleteFavorite}
      />
    );

    fireEvent.click(getAllByText("Delete")[0]);
    expect(onDeleteFavorite).toHaveBeenCalled();
  });

  it("calls onSaveFavorite when the Save button is clicked", () => {
    const { getByText } = render(
      <FavoriteSearches
        favorites={favorites}
        onLoadFavorite={onLoadFavorite}
        onSaveFavorite={onSaveFavorite}
        onDeleteFavorite={onDeleteFavorite}
      />
    );

    fireEvent.click(getByText("Save Favorite"));
    expect(onSaveFavorite).toHaveBeenCalled();
  });
});
