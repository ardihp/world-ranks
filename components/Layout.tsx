import { NextPage } from "next";
import { Flex, Box, Text } from "@chakra-ui/react";

import Header from "./Header";
import ToggleMode from "./ToggleMode";

const Layout: NextPage = ({ children }: any) => {
  return (
    <Flex direction="column" maxW="8xl" p={0} margin="0 auto">
      <Header>
        <Flex alignItems="center" fontSize="24">
          <Box mr={2}>
            <i className="fas fa-fire"></i>
          </Box>
          <Text fontFamily="Poppins" fontWeight="600">
            World Ranks
          </Text>
        </Flex>
        <ToggleMode />
      </Header>
      <Box minHeight="50px" px={{ md: 10, base: 6 }} py={7}>
        {children}
      </Box>
      <Flex justifyContent="center" px={5} pb={7} minHeight="50px" mt="auto">
        <Text fontFamily="Spartan" fontWeight="700">
          Made with <i className="fas fa-heart"></i> by Ardi.HP
        </Text>
      </Flex>
    </Flex>
  );
};

export default Layout;
