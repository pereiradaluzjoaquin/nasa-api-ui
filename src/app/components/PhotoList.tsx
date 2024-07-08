import { Photo } from "../types/Photo";
import { InfiniteScroll } from "./utils/InfiniteScroll";
import Image from "next/image";

type PhotoListProps = {
  photos: Photo[];
  loading: boolean;
  fetchMore: () => void;
  hasNextPage: boolean;
};

export const PhotoList = ({
  photos,
  loading,
  fetchMore,
  hasNextPage,
}: PhotoListProps) => {
  return (
    <>
      {photos.length === 0 && <p>No photos found</p>}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos
          .sort((a, b) => a.earth_date.localeCompare(b.earth_date))
          .map((photo) => (
            <li key={photo.id}>
              <Image
                src={photo.img_src}
                alt={photo.camera.full_name}
                width={400}
                height={400}
                className="h-64 w-64 cursor-pointer"
                onClick={() => window.open(photo.img_src, "_blank")}
              />
              <p>{photo.id}</p>
            </li>
          ))}
      </ul>
      <p>{loading ? "Loading..." : ""}</p>
      <InfiniteScroll
        loading={loading}
        fetchMore={fetchMore}
        hasNextPage={hasNextPage}
      />
    </>
  );
};
