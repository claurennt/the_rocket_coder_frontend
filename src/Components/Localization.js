// Allow localization to be used in the browser also for the timer component
// date of today
// weatehr of today
//change image every day and fetch 20 images suitable with our design with the api endpoints and params. (the image logic should happen in App.js)
// Nice images : 
// 2021 July 18
// 2021 July 12
// 2021 July 10
// 2021 July 5
// 2021 June 29
// 2021 June 28
// 2021 June 24
// 2021 June 21
// 2021 June 17
// 2021 June 3
// 2021 May 30
// 2021 May 28
// 2021 May 27
// 2021 May 22
// 2021 May 20
// 2021 May 19
// 2021 May 18
// 2021 May 17
// 2021 May 16
// 2021 May 15 can be the default image as it is the most beautiful and colorful 
// 2021 May 11
// import React from "react";
// import ReactWeather, { useOpenWeather } from 'react-open-weather';

// const Localization = () => {
//   const { data, isLoading, errorMessage } = useOpenWeather({
//     key: 'YOUR-API-KEY',
//     lat: '48.137154',
//     lon: '11.576124',
//     lang: 'en',
//     unit: 'metric', // values are (metric, standard, imperial)
//   });
//   return (
//     <ReactWeather
//       isLoading={isLoading}
//       errorMessage={errorMessage}
//       data={data}
//       lang="en"
//       locationLabel="Munich"
//       unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
//       showForecast
//     />
//   );
// };