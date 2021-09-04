import { Box, Flex, Input, Text, useColorMode } from "@chakra-ui/react";
import { NextPage } from "next";
import style from "../styles/Header.module.css";

const Header: NextPage = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={7}
      px={{md: 10, base: 6}}
      boxShadow="sm"
      className={colorMode === "light" ? style.header : style.headerDark}
    >
      {children}
    </Flex>
  );
};

export default Header;
