import { Flex, Text, Image, Box } from "@chakra-ui/react";
import ReactLogo from "../../assets/react_logo.png";
import NetlifyLogo from "../../assets/netlify_logo.png";
import ChakraUILogo from "../../assets/chakraui_logo.png";

export default function Footer() {
  return (
    <Flex
      p={5}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      gap={[3, 5]}
      backgroundColor={"gray.200"}
      mt={10}
      pt={[5, 10]}
    >
      <Text fontSize={["md", "lg"]} color={"blue.700"}>
        Created By Alperen Polat
      </Text>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={[5, 10]}
      >
        <Image
          boxSize={["100px", "120px", "160px"]}
          src={ReactLogo}
          objectFit={"contain"}
        />
        <Image
          boxSize={["100px", "120px", "160px"]}
          src={NetlifyLogo}
          objectFit={"contain"}
        />
        <Image
          boxSize={["100px", "120px", "160px"]}
          src={ChakraUILogo}
          objectFit={"contain"}
        />
      </Flex>
    </Flex>
  );
}
