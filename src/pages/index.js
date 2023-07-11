import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ChronoBoat from "@/components/ChronoBoat";

const fetchBoat = async () => {
  const response = await fetch(
    "https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=previsions_pont_chaban&q=&rows=100&facet=bateau"
  );
  const data = await response.json();
  const sortedRecords = data.records.sort((a, b) => {
    const dateA = new Date(a.fields.date_passage);
    const dateB = new Date(b.fields.date_passage);
    return dateA - dateB;
  });
  return sortedRecords;
};

export default function Home() {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["boats"],
    queryFn: fetchBoat,
  });

  const [currentBoat, setCurrentBoat] = useState(0);
  const boat = data?.[currentBoat];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-6 border-gray-900"></div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="relative w-screen">
        <ChronoBoat
          data={data}
          boat={boat}
          currentBoat={currentBoat}
          setCurrentBoat={setCurrentBoat}
        />
      </div>
    );
  }
}
