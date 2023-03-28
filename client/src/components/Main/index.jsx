import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";


function NasaPictureOfTheDay() {
  const [picture, setPicture] = useState(null);
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=Ws6popMz9wJrWIFouz5ynYUVrfcTQotGw1Lx1IjE`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((data) => setPicture(data))
      .catch((error) => console.error(error));
  }, []);

  if (!picture) {
    return <div>Loading...</div>;
  }

  const isImage = picture.media_type === "image";
  console.log(isImage);

  var finalUrl = picture.url;

  const prefix = "http";
  if (finalUrl.substr(0, prefix.length) !== prefix) {
    finalUrl = prefix + finalUrl;
  }
  console.log(finalUrl);

  return (
    <div>
      	<div className={styles.main_container}>
        <nav className={styles.navbar}>
          <h1>Nasa Picture of the Day</h1>
          <button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
      </div>

      <h2>{picture.title}</h2>
      {isImage ? (
        <img src={finalUrl} alt={picture.title} />
      ) : (
        <iframe
          src={finalUrl}
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      )}

      {/* <img crossorigin="anonymous" src={picture.url} alt={picture.title} style={{ maxWidth: '100px', maxHeight: '100x' }} /> */}

      <p>{picture.explanation}</p>

  </div>
  );
}

export default NasaPictureOfTheDay;
