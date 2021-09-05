import { NextPage } from "next";
import { Box, Button, useColorMode } from "@chakra-ui/react";

const ToggleMode: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Button
        onClick={toggleColorMode}
        size="md"
        rounded="full"
        p={0}
        background="none"
        boxShadow="base"
        aria-label="Change Theme"
      >
        {colorMode === "light" ? (
          <i className="fas fa-moon"></i>
        ) : (
          <i className="fas fa-sun"></i>
        )}
      </Button>
    </Box>
  );
};

export default ToggleMode;
