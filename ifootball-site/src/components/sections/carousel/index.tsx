import styles from './styles.module.scss'
import { useEffect, useState } from 'react'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'

export function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    slideIndex > 300 && setSlideIndex(0);

    const interval = setInterval(() => {
      setSlideIndex(slideIndex + 100)
    }, 3000);
    return () => clearInterval(interval);
  }, [slideIndex])

  const slideData = [
   {
      banner: 'https://www.futbolemotion.com/imagescontenidos/lanzamientos/nike-fire-and-ice/banner.jpg'
    },
    {
      banner: 'https://www.futbolemotion.com/imagescontenidos/lanzamientos/adidas-cold-blooded/banner.jpg'
    },
    {
      banner: 'https://camisasechuteiras.com/wp-content/uploads/2015/03/topbanner.jpg'
    },
    {
      banner: 'https://www.futbolemotion.com/imagescontenidos/lanzamientos/adidas-cold-blooded/banner.jpg'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {slideData.map((slide, i) => (
          <div
            className={styles.item}
            key={i}
            style={{right: `${slideIndex}%`}}
          >
            <img src={slide.banner} alt="random banner" />
          </div>
        ))}
      </div>
      <button
        className={styles.previousBtnCarousel}
        onClick={() => setSlideIndex(slideIndex - 100)}
        disabled={slideIndex === 0 ? true : false}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        className={styles.nextBtnCarousel}
        onClick={() => setSlideIndex(slideIndex + 100)}
        disabled={slideIndex === 300 ? true : false}
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  )
}