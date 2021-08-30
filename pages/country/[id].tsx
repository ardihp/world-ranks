import { NextPage } from "next";
import { Flex, Button, SimpleGrid, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";

import Layout from "../../components/Layout";

const getCountry = async (id: string) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};

const Index: NextPage = ({ country }: any) => {
  const [borders, setBorders] = useState([]);
  console.log(country);

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
    <Layout>
      <Flex alignItems="flex-start" justifyContent="center">
        <Flex direction="column">
          <Flex mb={5}>
            <Link href="/">
              <Button size="sm">Back</Button>
            </Link>
          </Flex>
          <Flex boxShadow="base" direction="column" p={7} rounded="lg" mr={10}>
            <Image
              src={country.flag}
              width="300px"
              rounded="md"
              boxShadow="base"
            />
            <Flex alignItems="center" my={7} direction="column">
              <Text
                fontFamily="Spartan"
                fontWeight="700"
                fontSize="24"
                width="300px"
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
          width="750px"
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
              <Text>{country.capital}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              boxShadow="sm"
              pb="20px"
              px={7}
            >
              <Text fontWeight="600">Languages</Text>
              <Text>
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
              <Text>
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
              <Text>{country.nativeName}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              boxShadow="sm"
              pb="20px"
              px={7}
            >
              <Text fontWeight="600">Gini</Text>
              <Text>{country.gini ? country.gini : "0"} %</Text>
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
  