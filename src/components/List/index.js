import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Button,
  CardFooter,
  Flex,
  ButtonGroup,
  Container,
  Badge,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSearch } from "../../contexts/SearchContext";

export default function List() {
  const books = useSelector((state) => state.books.items);
  const isLoading = useSelector((state) => state.books.isLoading);
  const isHasMore = useSelector((state) => state.books.isHasMore);

  const { startIndex, setStartIndex } = useSearch();

  const [selectedBook, setSelectedBook] = useState({
    id: "",
    saleInfo: {
      buyLink: "",
    },
    volumeInfo: {
      categories: [],
      authors: [],
      language: "",
      pageCount: 0,
      publishedDate: "",
      title: "",
      imageLinks: {
        smallThumbnail: "",
        thumbnail: "",
      },
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      {isLoading && (
        <div
          style={{
            width: "100vw",
            height: "30vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxW={"container.md"} textAlign={"center"}>
            <Spinner size={"xl"} />
          </Container>
        </div>
      )}
      <Container maxW={"container.xl"} mt={10}>
        <Flex wrap={"wrap"} gap={10} justifyContent={"center"}>
          {books.map((book, i) => {
            return (
              <Card maxW={"xs"} key={i} p={2}>
                <Flex justifyContent={"center"} position={"relative"}>
                  <Image
                    w={"160px"}
                    objectFit={"contain"}
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.thumbnail
                        : ""
                    }
                    alt={book.volumeInfo.title}
                    mb={5}
                  />
                  <HStack position={"absolute"} top={2} right={2}>
                    <Badge colorScheme="red">{book.volumeInfo.language}</Badge>
                    {book.saleInfo.saleability === "FREE" && (
                      <Badge colorScheme="green">FREE</Badge>
                    )}
                  </HStack>
                </Flex>
                <CardBody>
                  <Heading as="h2" size={"sm"} fontWeight={"500"}>
                    {book.volumeInfo.title}{" "}
                    <Badge colorScheme="purple">
                      {book.volumeInfo.publishedDate}
                    </Badge>
                  </Heading>
                  {!book.accessInfo.pdf.isAvailable && (
                    <Text color={"red"} fontSize={"0.65rem"}>
                      Sorry, PDF not available
                    </Text>
                  )}
                  {book.volumeInfo.authors && (
                    <>
                      <Heading
                        as="h3"
                        size={"xs"}
                        fontWeight={"500"}
                        color={"blue"}
                        mt={3}
                      >
                        Yazar/Yazarlar
                      </Heading>
                      <ul>
                        {book.volumeInfo.authors.map((author, i) => {
                          return (
                            <li key={i}>
                              <Heading as="h3" size={"xs"} fontWeight={"400"}>
                                {author}
                              </Heading>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  {book.volumeInfo.publisher && (
                    <>
                      <Heading
                        as="h3"
                        size={"xs"}
                        fontWeight={"500"}
                        mt={3}
                        color={"blue"}
                      >
                        Yayınlayan
                      </Heading>
                      <Heading as="h3" size={"xs"} fontWeight={"400"}>
                        {book.volumeInfo.publisher}
                      </Heading>
                    </>
                  )}
                </CardBody>
                <CardFooter>
                  <ButtonGroup>
                    <Button size={"sm"} colorScheme="green">
                      <a href={book.saleInfo.buyLink} target="_blank">
                        Satın Al
                      </a>
                    </Button>
                    <Button
                      size={"sm"}
                      colorScheme="blue"
                      variant={"outline"}
                      onClick={() => {
                        setSelectedBook(book);
                        onOpen();
                      }}
                    >
                      İncele
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </Flex>

        <Flex alignItems={"center"} justifyContent={"center"} gap={20} mt={5}>
          <Button
            colorScheme={startIndex > 0 ? "blue" : "gray"}
            variant={"outline"}
            onClick={() => {
              if (startIndex > 0) setStartIndex(startIndex - 10);
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            colorScheme={isHasMore ? "blue" : "gray"}
            variant={"outline"}
            onClick={() => {
              if (isHasMore) setStartIndex(startIndex + 10);
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"blue"}>Detaylar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={selectedBook.volumeInfo.imageLinks.thumbnail}
              alt={selectedBook.volumeInfo.title}
            />
            <Heading as="h2" size={"sm"} mt={3}>
              {selectedBook.volumeInfo.title} #{selectedBook.id}
            </Heading>
            {selectedBook.volumeInfo.categories && (
              <HStack mt={2}>
                {selectedBook.volumeInfo.categories.map((category, i) => {
                  return <Badge key={i}>{category}</Badge>;
                })}
              </HStack>
            )}
            <Text size={"xs"} mt={3}>
              Yayın Tarihi:{" "}
              {selectedBook.volumeInfo.publishedDate !== ""
                ? selectedBook.volumeInfo.publishedDate
                : "Bilinmiyor"}
            </Text>
            {selectedBook.volumeInfo.authors && (
              <>
                <Heading as="h2" size={"sm"} color={"blue"} mt={2}>
                  Yazar/Yazarlar
                </Heading>
                <ul>
                  {selectedBook.volumeInfo.authors.map((author, i) => {
                    return (
                      <li key={i}>
                        <Heading as="h3" size={"xs"} fontWeight={"400"}>
                          {author}
                        </Heading>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            <Text size={"xs"} mt={2}>
              Sayfa Sayısı: {selectedBook.volumeInfo.pageCount}
            </Text>
            <Text size={"xs"}>Dil: {selectedBook.volumeInfo.language}</Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="green">
                <a href={selectedBook.saleInfo.buyLink} target="_blank">
                  Satın Al
                </a>
              </Button>
              <Button colorScheme="red" variant={"outline"} onClick={onClose}>
                Kapat
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
