import axios from "axios";
import { useState } from "react";

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);
  const fetchAvailabilities = async ({
    slug,
    date,
    time,
    partySize,
  }: {
    slug: string;
    date: string;
    time: string;
    partySize: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${slug}/availability`,
        {
          params: {
            date,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };
  return { loading, error, data, setData, fetchAvailabilities };
}
