import { Favorite } from "../types/Favorite";

type FavorteSearchesProps = {
  favorites: Favorite[];
  onLoadFavorite: (favorite: Favorite) => void;
  onSaveFavorite: () => void;
  onDeleteFavorite: (favorite: Favorite) => void;
};

export const FavoriteSearches = ({
  favorites,
  onLoadFavorite,
  onSaveFavorite,
  onDeleteFavorite,
}: FavorteSearchesProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold">Favorite Searches</h2>
      <button
        onClick={onSaveFavorite}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Save Favorite
      </button>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite, index) => (
            <li
              key={index}
              className="border p-2 flex items-center justify-between space-x-4"
            >
              <p>Rover: {favorite.rover}</p>
              <p>Camera: {favorite.camera}</p>
              <p>Sol: {favorite.sol}</p>
              <p>Earth Date: {favorite.earthDate}</p>
              <button
                onClick={() => onLoadFavorite(favorite)}
                className="bg-green-500 text-white py-1 px-2 rounded"
              >
                Load
              </button>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={() => onDeleteFavorite(favorite)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite searches saved.</p>
      )}
    </>
  );
};
