import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface GalleryItems {
  id: number;
  thumbnail: string;
  name: string;
  artist_name: string;
}

// Define the context
export const DataContext = createContext<GalleryItems[] | null>(null);

// Define a provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<GalleryItems[] | null>(null);

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      try {
        const response = await axios.get<GalleryItems[]>(
          "https://gallerianode-production.up.railway.app/"
        );
        console.log("Data fetched successfully:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
