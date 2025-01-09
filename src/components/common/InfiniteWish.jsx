import React, { useState, useEffect, useRef } from "react";

const InfiniteWish = ({ fetchWishes }) => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const loadWishes = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newWishes = await fetchWishes(pageRef.current);
    setWishes((prevWishes) => [...prevWishes, ...newWishes]);
    setLoading(false);

    if (newWishes.length === 0) {
      setHasMore(false);
    } else {
      pageRef.current += 1;
    }
  };

  const handleScroll = () => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      loadWishes();
    }
  };

  useEffect(() => {
    loadWishes();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishes.map((wish) => (
        <Card key={wish.id} wish={wish} />
      ))}
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more wishes!</div>}
    </div>
  );
};

export default InfiniteWish;
