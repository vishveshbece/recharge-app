import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function Home() {
  return (
    <div className="p-4">
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <img src="https://via.placeholder.com/800x300" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x300" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x300" alt="Slide 3" />
        </div>
      </Carousel>
    </div>
  );
}

export default Home;
