import { useState, useEffect } from "react";
import Slider from "./Slider";
import Loading from "./Loading";
import "./Sliders.scss";
const url =
  "https://raw.githubusercontent.com/programmer-rahad/json-files/main/testimonials.json";

function Sliders() {
  const [loading, setLoading] = useState(true);
  const [sliders, setSliders] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const sliders = await response.json();
      setLoading(false);
      setSliders(sliders);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  useEffect(() => {
    const lastIndex = sliders.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, sliders]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section">
      {sliders.map((slider, personIndex) => {
        let position = "nextSlide";
        if (personIndex === index) {
          position = "activeSlide";
        }
        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === sliders.length - 1)
        ) {
          position = "lastSlide";
        }
        return <Slider key={slider.id} {...slider} position={position} />;
      })}
      <button className="prev" onClick={() => setIndex(index - 1)}>
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button className="next" onClick={() => setIndex(index + 1)}>
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </section>
  );
}

export default Sliders;
