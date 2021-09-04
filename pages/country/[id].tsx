import { NextPage } from "next";
import { Flex, Button, SimpleGrid, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/Layout";

const getCountry = async (id: string) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};

const Index: NextPage = ({ country }: any) => {
  const [borders, setBorders] = useState([]);

  const getBorder = async () => {
    const countryBorder: any = await Promise.all(
      country.borders.map((name: string) => getCountry(name))
    );

    setBorders(countryBorder);
  };

  useEffect(() => {
    getBorder();
  }, []);

  return (
    <>
      <Head>
        <title>{country.name}</title>
      </Head>
      <Layout>
        <Flex
          alignItems="flex-start"
          justifyContent="center"
          direction={{ md: "row", base: "column" }}
        >
          <Flex direction="column" width={{ md: "inherit", base: "100%" }}>
            <Flex mb={5}>
              <Link href="/">
                <Button size="sm">Back</Button>
              </Link>
            </Flex>
            <Flex
              boxShadow="base"
              direction="column"
              p={7}
              rounded="lg"
              mr={{ md: 10, base: 0 }}
            >
              <Flex justifyContent="center">
                <Image
                  src={country.flag}
                  width="300px"
                  height="100%"
                  rounded="md"
                  boxShadow="base"
                />
              </Flex>
              <Flex alignItems="center" my={7} direction="column">
                <Text
                  fontFamily="Spartan"
                  fontWeight="700"
                  fontSize="24"
                  width={{ md: "300px", base: "100%" }}
                  textAlign="center"
                >
                  {country.name}
                </Text>
                <Text fontFamily="Poppins">{country.region}</Text>
              </Flex>
              <Flex justifyContent="space-around">
                <Flex direction="column" alignItems="center">
                  <Text fontFamily="Spartan" fontWeight="700" fontSize="18">
                    {country.population}
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
                    {country.area}
                  </Text>
                  <Text
                    fontFamily="Poppins"
                    fontWeight="600"
                    color="grey"
                    fontSize="12"
                  >
                    Area
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            boxShadow="base"
            direction="column"
            rounded="lg"
            mt={{ md: 0, base: 7 }}
            width={{ md: "750px", base: "100%" }}
            fontFamily="Poppins"
          >
            <Text
              py={10}
              fontSize="20"
              fontWeight="700"
              textAlign="center"
              fontFamily="Spartan"
            >
              Details
            </Text>
            <SimpleGrid column="1" spacing="20px" pb={5}>
              <Flex
                justifyContent="space-between"
                boxShadow="sm"
                pb="20px"
                px={7}
              >
                <Text fontWeight="600">Capital</Text>
                <Text textAlign="right">{country.capital}</Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                boxShadow="sm"
                pb="20px"
                px={7}
              >
                <Text fontWeight="600">Languages</Text>
                <Text textAlign="right">
                  {country.languages.map(({ name }: any) => name).join(", ")}
                </Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                boxShadow="sm"
                pb="20px"
                px={7}
              >
                <Text fontWeight="600">Currencies</Text>
                <Text textAlign="right">
                  {country.currencies.map(({ name }: any) => name).join(", ")}
                </Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                boxShadow="sm"
                pb="20px"
                px={7}
              >
                <Text fontWeight="600">Native Name</Text>
                <Text textAlign="right">{country.nativeName}</Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                boxShadow="sm"
                pb="20px"
                px={7}
              >
                <Text fontWeight="600">Gini</Text>
                <Text textAlign="right">{country.gini ? country.gini : "0"} %</Text>
              </Flex>
            </SimpleGrid>
            <Text mx={7} fontWeight="700" fontSize="18" fontFamily="Spartan">
              Neighbouring Country
            </Text>
            <SimpleGrid columns={[1, 2, null, 3]} spacing="20px" p={7}>
              {borders === [] ? (
                <Text>Nothing Border This Country</Text>
              ) : (
                borders.map((border: any) => (
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    key={border.alpha3Code}
                  >
                    <Flex
                      overflow="hidden"
                      height="110px"
                      justifyContent="center"
                      direction="column"
                      rounded="md"
                      boxShadow="base"
                    >
                      <Image src={border.flag} rounder="md" boxShadow="base" />
                    </Flex>
                    <Text
                      fontFamily="Poppins"
                      fontSize="12"
                      mt={2}
                      fontWeight="700"
                    >
                      {border.name}
                    </Text>
                  </Flex>
                ))
              )}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  const paths = countries.map((country: any) => ({
    params: { id: country.alpha3Code }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }: any) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country
    }
  };
};
