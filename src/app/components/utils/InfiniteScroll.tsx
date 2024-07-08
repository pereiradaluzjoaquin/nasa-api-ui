import { useEffect } from "react";

type InfiniteScrollProps = {
  fetchMore: () => void;
  hasNextPage: boolean;
  loading: boolean;
};

export const InfiniteScroll = ({
  fetchMore,
  hasNextPage,
  loading,
}: InfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (hasNextPage && !loading) {
          fetchMore();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMore, hasNextPage, loading]);

  return null;
};
