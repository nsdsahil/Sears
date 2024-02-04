import React from "react";
import Login from "../sections/Login";	

import {
	Box,
	Flex,
	Avatar,
	Link,
	HStack,
	Button,
	Input,
	Text,
	IconButton,
	ButtonGroup,
	Menu,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	useBreakpointValue,
	Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Profile } from "./Profile";
/**
 * @author Sahil Nishad
 * @function Navbar
 **/

const color = {
	primary: "#0948bb",
	secondary: "white",
	tertiary: "#41e0d0",
};
const Navbar = (props) => {
	const isMobile = useBreakpointValue({
		base: true,
		sm: true,
		md: false,
		lg: false,
		xl: false,
		xxl: false,
	});

	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Box bg={color.primary} px={4}>
				<Flex
					h={16}
					padding={2}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<IconButton
						size={"50px"}
						fontSize={"xl"}
						variant={"ghost"}
						color={color.secondary}
						icon={
							isOpen ? (
								<CloseIcon />
							) : (
								<HamburgerIcon color="white" boxSize={10} />
							)
						}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isMobile ? onClose : onOpen}
					/>
					<HStack width="100%" justifyContent={"space-around"} alignItems={"center"}>
						<Box >
							<img
							    width='100%'
								src="https://www.sears.com/assets/images/logos/sears_logo.svg"
								alt=""
							/>
						</Box>
						<HStack  
							as={"nav"}
							color={color.secondary}
							spacing={5}
							display={{ base: "none", md: "flex" }}
						>
							<Link color={color.secondary}> Products</Link>
							<Link color={color.secondary}>Shop</Link>
							<Link color={color.secondary}>Repairs</Link>
						</HStack>
						{!isMobile && <SearchBar />}
					</HStack>
					

					<Flex>
						{!isMobile && (
							<Button
								variant="ghost"
								backgroundColor={color.primary}
								color={color.secondary}
							>
								My Orders
							</Button>
						)}
						<Login/>
						<Profile/>
						<MdOutlineShoppingCart color="white" size="50px" />
					</Flex>
				</Flex>
				{isMobile && <SearchBar />}
				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							<Link>Home</Link>
							<Link>About</Link>
							<Link>Contact</Link>
						</Stack>
					</Box>
				) : null}
			</Box>

			<Box p={4}></Box>
		</>
	);
};

function SearchBar() {
	return (
		<Flex position={"relative"} width={"100%"} padding={5}>
			<Input
				borderRadius={"10"}
				width={"100%"}
				bg="white"
				variant="flushed"
				paddingLeft="10px"
				placeholder="Search"
			/>
			<IconButton
				zIndex={2}
				position={"absolute"}
				top={6}
				right={6}
				size={"sm"}
				backgroundColor={color.tertiary}
				aria-label="Search database"
				icon={<SearchIcon />}
			/>
		</Flex>
	);
}
export default Navbar;
