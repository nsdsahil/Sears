import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { Box } from "@chakra-ui/react";
import { render } from "react-dom";
import { useBreakpointValue } from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
/**
 * @author
 * @function ProductSlider
 **/
const ProductSlider = ({ products }) => {
     
      const breakpoint = useBreakpointValue({ base: 2, sm: 3, md: 5, lg: 5, xl: 6, xxl: 7 })
	return (
		<Swiper
			// install Swiper modules
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={50}
			slidesPerView={breakpoint}
			navigation
            autoplay={{delay: 2500, disableOnInteraction: true}}
            loop={true}
			pagination={{ clickable: true }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log("slide change")}
		>
            {console.log(products)}
			{products.map((product) => (
				<SwiperSlide>
					<Box>
						<img src={product.image} alt="carousel" />
						<span>{product.unMarkedPrice}</span>
						<span>{product.markedPrice}</span>
						<p>{product.name}</p>
						<ReactStars
							count={5}  
                            value={product.rating}
                            edit={false}
							size={24}
							activeColor="#ffd700"
						/>
					</Box>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ProductSlider;
