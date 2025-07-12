import React, { useEffect } from "react";
import FetchApi from "../Zustand/FetchApi";
import Card from "../Components/FoodCard";

export default function Home() {
  const { fetchData, data, loading, error } = FetchApi();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
     

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center w-full">
        {data.map((item) => (
          <Card key={item.idCategory} {...item} />
        ))}
      </div>
    </div>
  );
}
