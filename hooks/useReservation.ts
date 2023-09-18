import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    date,
    time,
    partySize,
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
    setDidBook,
  }: {
    slug: string;
    date: string;
    time: string;
    partySize: string;
    bookerEmail: string;
    bookerPhone: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerOccasion: string;
    bookerRequest: string;
    setDidBook: Dispatch<SetStateAction<boolean>>;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${slug}/reserve`,
        {
          bookerEmail,
          bookerPhone,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            date,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };
  return { loading, error, createReservation };
}
