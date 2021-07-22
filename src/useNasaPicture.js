import { useEffect, useState } from "react";
import { differenceInHours, parseISO } from "date-fns";

const { REACT_APP_NAMESPACE, REACT_APP_NASA_KEY } = process.env;

const useNasaPicture = () => {
  const [picOfTheDay, setPicOfTheDay] = useState();

  useEffect(() => {
    const getImage = () => {
      fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&start_date=2021-05-08&end_date=2021-05-23`
      )
        .then((response) => response.json())
        .then((data) => {
          const dataToStore = {
            picOfTheDay: data[Math.floor(Math.random() * data.length)].url,
            dateOfArrival: new Date(),
          };
          localStorage.setItem(
            REACT_APP_NAMESPACE,
            JSON.stringify(dataToStore)
          );
          setPicOfTheDay(dataToStore.picOfTheDay);
        });
    };

    const retrievedData = localStorage.getItem(REACT_APP_NAMESPACE);

    if (!retrievedData) {
      getImage();
    }

    if (retrievedData) {
      const now = new Date();
      const userData = JSON.parse(retrievedData);
      const difference = differenceInHours(
        now,
        parseISO(userData.dateOfArrival)
      );
      setPicOfTheDay(userData.picOfTheDay);
      if (difference >= 24) {
        getImage();
      }
    }
  }, []);

  return { picOfTheDay };
};

export default useNasaPicture;
