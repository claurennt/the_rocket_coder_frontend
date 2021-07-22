import ReactWeather, { useOpenWeather } from "react-open-weather";

const CustomReactWeather = ({ latitude, longitude, location }) => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.REACT_APP_YOUR_API_KEY,
    lat: latitude,
    lon: longitude,
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });
  console.log(data);
  const customStyles = {
    background: "yellow",
    fontFamily: "Roboto",
    gradientStart: "red",
    gradientMid: "#04A7F9",
    gradientEnd: "#4BC4F7",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#B5DEF4",
    todayRangeFontColor: "#B5DEF4",
    todayDescFontColor: "#B5DEF4",
    todayInfoFontColor: "#B5DEF4",
    todayIconColor: "#FFF",
  };

  if (isLoading) return <span>loading...</span>;

  return (
    <div style={{ size: "11px" }}>
      <ReactWeather
        theme={customStyles}
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={location.city}
        unitsLabels={{ temperature: "°C", windSpeed: "Km/h" }}
        showForecast={false}
      />
      {/* <i className={data.icon}></i> */}
      {/* <p>{data.current.date}</p>
      <p>{data.current.description}</p>
      <p>{data.current.icon}</p> */}
    </div>
  );
};

export default CustomReactWeather;
