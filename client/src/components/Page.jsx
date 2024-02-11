import { Box } from "@chakra-ui/react";
import { CartProvider, useCart } from "react-use-cart";
import { Button, Heading, Text, Flex } from "@chakra-ui/react";


function Cart() {
	const { isEmpty,emptyCart,cartTotal,totalUniqueItems, items, updateItemQuantity, removeItem } =
		useCart();
  
    const totalCartPrice=items.reduce((total, item) => total + parseInt(item.price.substring(1))*item.quantity, 0);


	if (isEmpty) return <Heading size="sm">Your cart is empty</Heading>;

	return (
		<>
    <Box p={4}  boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px">
			<Heading size={["xs", "sm", "md", "md", "md"]}>
				Cart ({totalUniqueItems})
			</Heading>
			<Box >
				{items.map((item) => (
					<Box padding={2} borderBottom="1px solid gray" key={item.id}>
						<Box width="70px">
							<img src={item["img-fluid-product-src"]} alt="" />
						</Box>
						<Heading size="sm">
							{item.price} - ${item["custom-div-title"]}
						</Heading>
						<Text>
							{item.quantity} x {item.price} &mdash;
						</Text>
						<Flex justifyContent="space-between">
							<Box borderRadius={5} boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" gap={10}>
             
								<Button
									fontSize={"25px"}
									background={"white"}
                  color={"#0948bb"}
									onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
								>
									-
								</Button>
								<Text fontSize={"20px"} display={"inline"}>
									{item.quantity}
								</Text>
								<Button
									background={"white"}
                  color={"#0948bb"}
									fontSize={"25px"}
									onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
								>
									+
								</Button>
							</Box>
							<Button
								backgroundColor={"#0948bb"}
								color="white"
								onClick={() => removeItem(item.id)}
							>
								Remove
							</Button>
						</Flex>
					</Box>
				))}
			</Box>

      </Box>
      <Box bg="white" position={"sticky"} bottom={"0px"} boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" p={4}>
        <Text>Total: ${totalCartPrice}</Text>
        
        <Button backgroundColor={"#0948bb"} color="white">Checkout</Button>
		<Button backgroundColor={"#0948bb"} onClick={() => emptyCart()} color="white">Empty Cart</Button>
      </Box>
	  

		</>
	);
}

export {  Cart };
