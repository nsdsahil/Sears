import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ShopNowButton } from "./ShopNow";

/**
 * @author
 * @function FlexBanner
 **/

export const FlexBanner = (props) => {
	return (
		<Box>
			<Box display={"flex"}  gap={5} flexWrap={"wrap"}>
				<Box position={"relative"}
					height={"300px"}
                    bgPos={"center"}
                    bgSize={"cover"}
					backgroundImage={
						"https://www.sears.com//staticpage/content/sears/shc/en/homepage/images/091823-Bigbox_tv.jpg"
					}
					width={["100%", "100%", "100%", "49%", "49%", "49%"]}
				>
					<Container>
						<span></span>
						<span></span>
						<span></span>
						<ShopNowButton />
					</Container>
				</Box>
				<Box
                    position={"relative"}
					backgroundImage={
						"https://www.sears.com/staticpage/content/sears/shc/en/homepage/images/100621_BOX_Console_v4.jpeg"
					}
                    height={"300px"}
                    bgPos={"center"}
                    bgSize={"cover"}

					width={["100%", "100%", "100%", "49%", "49%", "49%"]}
				>
					<Container>
						<span></span>
						<span></span>
						<span></span>
						<ShopNowButton />
					</Container>
				</Box>
			</Box>
		</Box>
	);
};
