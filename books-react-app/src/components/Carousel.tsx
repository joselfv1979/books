import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';
import { useAppSelector } from '../hooks/redux-hooks';

const baseUrl = import.meta.env.VITE_API_URL;

const Carousel = () => {

  const { books } = useAppSelector((state) => state.book);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={50} // Space between slides
      slidesPerView={3} // Number of slides visible at once
      navigation // Enable navigation arrows
      pagination={{ clickable: true }} // Enable pagination dots
      scrollbar={{ draggable: true }} // Enable scrollbar
      onSlideChange={() => console.log('Slide changed')}
      autoplay={{
        delay: 2500, // Time interval between slides in milliseconds
        disableOnInteraction: false, // Allows autoplay to continue even after user interaction
      }}
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <div className="my-5">
            <img src={`${baseUrl}/${book.imagePath}`} width={200} height={300} alt={book.title} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;