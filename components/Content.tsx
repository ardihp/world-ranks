import { Flex, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const CountryCard = dynamic(() => import("./countryCard"));

interface Props {
  data: any;
  value: string;
  direction: string | undefined | null;
}

const orderBy = (
  countries: any,
  value: string,
  direction: string | null | undefined
) => {
  if (direction === "asc") {
    return [...countries].sort((a: any, b: any) =>
      a[value] > b[value] ? 1 : -1
    );
  }
  if (direction === "desc") {
    return [...countries].sort((a: any, b: any) =>
      a[value] > b[value] ? -1 : 1
    );
  }
  return countries;
};

const Content: NextPage<Props> = ({ data, value, direction }) => {
  const countries = orderBy(data, value, direction);

  return (
    <Flex direction="column" py={7}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="30px">
        {countries.map((country: any) => (
          <CountryCard key={country.alpha3Code} data={country} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Content;
