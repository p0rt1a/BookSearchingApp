import { Input, Image, Button, Flex, HStack } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useSearch } from "../../contexts/SearchContext";

export default function Navbar() {
  const { searchTerms, setSearchTerms } = useSearch();

  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"40vh"}>
      <Flex
        w={"100vw"}
        h={"40vh"}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src="https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          objectFit={"cover"}
          alt="books"
          h={"100%"}
          w={"100%"}
        />
        <div
          style={{
            zIndex: "1",
            backgroundColor: "rgba(0,0,0,0.2)",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
          }}
        ></div>
        <div
          style={{
            zIndex: "2",
            position: "absolute",
          }}
        >
          <HStack paddingX={5} paddingY={3} borderRadius={"xl"}>
            <Input
              placeholder="Arama..."
              color={"white"}
              value={searchTerms}
              w={["60vw", "xs", "md"]}
              onChange={(e) => setSearchTerms(e.target.value)}
              style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            />
            <Button colorScheme="gray">
              <Search2Icon />
            </Button>
          </HStack>
        </div>
      </Flex>
    </Flex>
  );
}
