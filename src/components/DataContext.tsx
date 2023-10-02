import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface GalleryItems {
  id: number;
  thumbnail: string;
  name: string;
  artist_name: string;
}

export const DataContext = createContext<GalleryItems[] | null>(null);

interface DataProviderProps {
  children: ReactNode;
  initialContext?: GalleryItems[];
}

export const DataProvider: React.FC<DataProviderProps> = ({
  children,
  initialContext = [
    {
      id: 0,
      thumbnail: "",
      name: "",
      artist_name: "",
    },
  ],
}) => {
  const [data, setData] = useState<GalleryItems[] | null>(initialContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<GalleryItems[]>(
          "https://gallerianode-production.up.railway.app/"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
