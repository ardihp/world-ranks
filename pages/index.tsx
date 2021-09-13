import { Button, Flex, Box, Input } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { Country } from "../types/interface";
import dynamic from "next/dynamic";

const Content = dynamic(() => import("../components/Content"));
const Layout = dynamic(() => import("../components/Layout"));

interface Props {
  countries: Country[];
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              _focus={{}}
            />
          </Flex>
          <Flex>
            <Button
              size="sm"
              onClick={() => setValueAndDirection("population")}
              mr={3}
              aria-label="Sort by Population"
            >
              Sort By Population
              {value === "population" && SortArrow(direction)}
            </Button>
            <Button
              size="sm"
              onClick={() => setValueAndDirection("name")}
              aria-label="Sort by Name"
            >
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries
    }
  };
};

export default Index;
