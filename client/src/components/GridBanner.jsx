import React from "react";
import { Grid, Box, GridItem, Button, Heading } from "@chakra-ui/react";
import { ShopNowButton } from "./ShopNow";

/**
 * @author
 * @function GridBanner
 **/

export const GridBanner = ({ heading }) => {
	const color = {
		primary: "#0948bb",
		secondary: "white",
		tertiary: "#41e0d0",
	};
	return (
		<Box  >
			<Heading
				letterSpacing={"4px"}
				marginBottom={"5%"}
				textAlign={"center"}
				size="2xl"
			>
				{heading}
			</Heading>
			<Grid
				h={["800px", "800px", "600px", "500px", "600px"]}
				templateRows={[
					"repeat(4, 1fr)",
					"repeat(4, 1fr)",
					"repeat(2, 1fr)",
					"repeat(2, 1fr)",
					"repeat(2, 1fr)",
				]}
				templateColumns={[
					"repeat(1, 1fr)",
					"repeat(1, 1fr)",
					"repeat(6, 1fr)",
					"repeat(6, 1fr)",
					"repeat(6, 1fr)",
				]}
				gap={5}
			>
				<GridItem
					position={"relative"}
					// backgroundImage={
					// 	"https://www.sears.com/staticpage/content/sears/shc/en/homepage/images/Box-Jewelry-020224.jpg"
					// }
				    width={"100%"}
					bgSize="contain"
					bgPos="center"
					rowSpan={[1, 1, 2, 2, 2]}
					colSpan={3}
				>
					
					<img width={'100%'} height={'100%'} src="https://www.sears.com//staticpage/content/sears/shc/en/homepage/images/Box-Jewelry-020224.jpg" alt="" />
					<p>
						<span></span>
						<span></span>
					</p>
					<ShopNowButton/>
				</GridItem>
				<GridItem
					position={"relative"}
					// backgroundImage={
					// 	"https://www.sears.com//staticpage/content/sears/shc/en/homepage/images/Box-Furniture2-020224.jpg"
					// }

					colSpan={3}

				>
					<Box>
					<img width={'100%'} src="https://www.sears.com//staticpage/content/sears/shc/en/homepage/images/Box-Furniture2-020224.jpg" alt=""/>
					</Box>
					<ShopNowButton/>
				</GridItem>
				<GridItem
				    position={"relative"}
					colSpan={3}
					
				>
					<Box>
					<img src="https://www.sears.com//staticpage/content/sears/shc/en/homepage/images/Box-Furniture2-020224.jpg" alt="" /></Box>
					<ShopNowButton/>
				</GridItem>
			</Grid>
		</Box>
	);
};
