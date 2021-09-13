import { Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { NextPage } from "next";
import useInView from "react-cool-inview";

import style from "../styles/Content.module.css";
import Link from "next/link";

interface Props {
  data: any;
}

const dataCard: NextPage<Props> = ({ data }: any) => {
  const { colorMode } = useColorMode();
  const { observe, inView }: any = useInView({
    onEnter: ({ unobserve }) => {
      unobserve();
    }
  });

  return (
    <Link href={`/country/${data.alpha3Code}`}>
      <Flex
        direction="column"
        boxShadow="base"
        p={5}
        rounded="lg"
        className={colorMode === "light" ? style.card : style.cardDark}
        ref={observe}
      >
        {inView && (
          <>
            <Flex
              overflow="hidden"
              height="165px"
              justifyContent="center"
              direction="column"
              rounded="md"
            >
              <Image src={data.flag} rounded="md" alt="flag-image" />
            </Flex>
            <Flex mt={5} direction="column">
              <Text
                fontFamily="Spartan"
                fontWeight="700"
                textAlign="center"
                mb={5}
                width="100%"
                isTruncated
              >
                {data.name}
              </Text>
              <Flex justifyContent="space-around">
                <Flex direction="column" alignItems="center">
                  <Text fontFamily="Spartan" fontWeight="700" fontSize="18">
                    {data.population}
                  </Text>
                  <Text
                    fontFamily="Poppins"
                    fontWeight="600"
                    color="grey"
                    fontSize="12"
                  >
                    Population
                  </Text>
                </Flex>
                <Flex direction="column" alignItems="center">
                  <Text fontFamily="Spartan" fontWeight="700" fontSize="18">
                    {data.gini ? data.gini : "0"} %
                  </Text>
                  <Text
                    fontFamily="Poppins"
                    fontWeight="600"
                    color="grey"
                    fontSize="12"
                  >
                    Gini
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Link>
  );
};

export default dataCard;
