import React, { useContext } from "react";
import Login from "../sections/Login";

import { Link } from "react-router-dom";

import {
	Box,
	Flex,
	Avatar,
	HStack,
	Button,
	Input,
	Text,
	IconButton,
	ButtonGroup,
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	useBreakpointValue,
	Stack,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { Profile } from "./Profile";
import CartSection from "./CartSection";
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
	const toast = useToast();
	const { isLogin, setIsLogin } = React.useContext(AuthContext);
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
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack
						width="100%"
						justifyContent={"space-around"}
						alignItems={"center"}
					>
						<Box as={Link} to="/">
							<img
								width="100%"
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
							<Link to="/products" color={color.secondary}>
								{" "}
								Products
							</Link>
							<Shop />
							<Link to="/hotdeals" color={color.secondary}>
								Hot Deals
							</Link>
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
						{isLogin ? <Logout /> : <Login />}
						<Profile />
						<CartSection />
					</Flex>
				</Flex>
				{isMobile && <SearchBar />}
				{isOpen ? (
					<Box color={color.secondary} pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							<Link to="/products" color={color.secondary}>
								{" "}
								Products
							</Link>
							<Link color={color.secondary}>Shop</Link>
							<Link to="/hotdeals" color={color.secondary}>
								Hot Deals
							</Link>
						</Stack>
					</Box>
				) : null}
			</Box>

			<Box p={4}></Box>
		</>
	);
};

function SearchBar() {
	const navigate=useNavigate();
	const{products,setProducts}=useContext(AuthContext)
	const [searchItem, setSearchItem] = React.useState("");
	async function handleSubmit() {
		console.log(searchItem)
		await axios
			.get("http://localhost:8080/products/search/" + searchItem)
			.then((res) => {
				console.log(res.data);
				setProducts(res.data);
				navigate("/products");
			})
			.catch((err) => {
				console.log(err);
			});
	}
	return (
		<Flex position={"relative"} width={"100%"} padding={5}>
			<Input
				borderRadius={"10"}
				width={"100%"}
				bg="white"
				onChange={(e) => {
					setSearchItem(e.target.value);
				}}
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
				onClick={() => {
					handleSubmit(searchItem);
				}}
				backgroundColor={color.tertiary}
				aria-label="Search database"
				icon={<SearchIcon />}
			/>
		</Flex>
	);
}

function Shop() {
	return (
		<Menu>
			<MenuButton color={color.secondary}>Shop</MenuButton>
			<MenuList color={"black"}>
				<MenuItem as="a" href="#">
					<Link>Appliances</Link>
				</MenuItem>
				<MenuItem as="a" href="#">
					<Link>Tools</Link>
				</MenuItem>
				<MenuItem as="a" href="#">
					<Link>Clothing</Link>
				</MenuItem>
				<MenuItem as="a" href="#">
					<Link>Lawn and Gardening</Link>
				</MenuItem>
				<MenuItem as="a" href="#">
					<Link>Tv and Technologies</Link>
				</MenuItem>
			</MenuList>
		</Menu>
	);
}

const Logout = () => {
	const { setIsLogin } = useContext(AuthContext);
	const toast = useToast();
	const handleClick = async () => {
		await axios
			.get("https://sears-40h2.onrender.com/user/logout", {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.msg == "logout successful") {
					toast({
						title: res.msg,
						description: "You are logged out",
						status: "success",
					});
					setIsLogin(false);
				} else {
					toast({
						title: res.msg,
						description: res.data.msg,
						status: "error",
					});
				}
			})
			.catch((err) => {
				toast({
					title: err.msg,
					description: "try again",
					status: "error",
				});
				console.log(err);
			});
	};
	return (
		<>
			<Button
				backgroundColor={color.primary}
				color={color.secondary}
				onClick={handleClick}
			>
				Logout
			</Button>
		</>
	);
};

export default Navbar;
