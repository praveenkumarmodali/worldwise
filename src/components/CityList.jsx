import styles from "./CityList.module.css";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Message from "../components/Message";

// context
import { CitiesContext } from "../context/CitiesContext";
import { useContext } from "react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// main router
function CityList() {
  const { cities, isLoading } = useContext(CitiesContext);
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Add your first city by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

// cities display
function CityItem({ city }) {
  // console.log(city);
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;
  const { currentCity, deleteCity } = useContext(CitiesContext);
  // console.log(lat, lng);
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityList;
