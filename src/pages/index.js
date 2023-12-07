import React, { useEffect, useState } from "react";
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

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const reduc = arr.reduce((acc, curr) => acc + curr);
  console.log(reduc);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["boats"],
    queryFn: fetchBoat,
  });

  const [currentBoat, setCurrentBoat] = useState();

  const date = Date.now();

  const index = data?.findIndex((boat) => {
    data?.map((boat) => {
      const dateBoat = new Date(boat.fields.date_passage);
      return dateBoat - date;
    });
  });

  useEffect(() => {
    if (index !== -1) {
      setCurrentBoat(data?.[index]);
    }
  }, [index, data]);

  console.log(currentBoat);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-6 border-gray-900"></div>
      </div>
    );
  }

  if (index === -1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-4xl text-center text-red-500 bg-amber-50/80 p-20 rounded-xl">Actuellement, il n&apos;y a aucune prévision de fermeture.<br/> <br/> <span className="text-green-500">Le pont est ouvert</span></div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="relative w-screen">
        <ChronoBoat
          data={data}
          currentBoat={currentBoat}
          setCurrentBoat={setCurrentBoat}
        />
      </div>
    );
  }
}
