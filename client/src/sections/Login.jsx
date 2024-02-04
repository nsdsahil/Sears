
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,Box, useDisclosure,Input, FormControl, FormLabel, Stack, useColorModeValue,Heading,FormHelperText,FormErrorMessage } from "@chakra-ui/react"
import React from 'react' 
function Login() {
  const color = {
    primary: "#0948bb",
    secondary: "white",
    tertiary: "#41e0d0",
  };
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <>
      <Button
      variant="ghost"
      backgroundColor={color.primary}
      color={color.secondary}
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
      >
        Login
      </Button>
     
      <Modal  isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody width="90%">
          
			<div>
				<Heading>Login</Heading>
			</div>
			<FormControl textAlign={"left"}>
				<FormLabel>Email</FormLabel>
				<Input type="email" name="email" onChange={(e) => handlechange(e)} />
				<FormHelperText>
					Enter the email you'd like to receive the newsletter on.
				</FormHelperText>
				<FormErrorMessage>Email is required.</FormErrorMessage>
				<FormLabel>Password</FormLabel>
				<Input
					type="password"
					name="password"
					onChange={(e) => handlechange(e)}
				/>
				<FormHelperText>We'll never share your Password</FormHelperText>
				<Input
					bg={"teal"}
					color="white"
					width
					value="Login"
					type="submit"
					onClick={(e) => handleSubmit(e)}
				/>
			</FormControl>
		
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login