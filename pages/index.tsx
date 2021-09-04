import { Button, Flex, Box, Text, Input } from "@chakra-ui/react";
import { NextPage, GetStaticProps } from "next";
import { useState } from "react";
import Head from "next/head";

import Content from "../components/Content";
import Layout from "../components/Layout";

interface Props {
  countries: any;
  query: string;
}

const Index: NextPage<Props> = ({ countries }) => {
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState<string | null>();
  const [value, setValue] = useState("");

  const filterCountry = countries.filter((country: any) =>
    country.name.toLowerCase().includes(query)
  );

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value: string) => {
    switchDirection();
    setValue(value);
  };

  const SortArrow = (direction: string | null | undefined) => {
    if (direction === "asc") {
      return (
        <Box ml={2}>
          <i className="fas fa-angle-up"></i>
        </Box>
      );
    }

    if (direction === "desc") {
      return (
        <Box ml={2}>
          <i className="fas fa-angle-down"></i>
        </Box>
      );
    }
  };

  return (
    <>
      <Head>
        <title>World Ranks</title>
      </Head>
      <Layout>
        <Flex
          justifyContent="space-between"
          alignItems={{ md: "center", base: "" }}
          direction={{ md: "row", base: "column" }}
        >
          <Flex
            alignItems="center"
            rounded="lg"
            boxShadow="base"
            mb={{ md: 0, base: 5 }}
          >
            <Box mx={4}>
              <i className="fas fa-search"></i>
            </Box>
            <Input
              p={0}
              border="none"
              placeholder="Filter by Name"
              fontFamily="Poppins"
              fontSize="14"
              onChange={e => setQuery(e.target.value)}
              _focus={{}}
            />
          </Flex>
          <Flex>
            <Button
              size="sm"
              onClick={() => setValueAndDirection("population")}
              mr={3}
            >
              Sort By Population
              {value === "population" && SortArrow(direction)}
            </Button>
            <Button size="sm" onClick={() => setValueAndDirection("name")}>
              Sort By Name
              {value === "name" && SortArrow(direction)}
            </Button>
          </Flex>
        </Flex>
        <Content data={filterCountry} value={value} direction={direction} />
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries
    }
  };
};

export default Index;
