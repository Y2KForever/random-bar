import { useMantineColorScheme, SegmentedControl, Group, Center, Box } from '@mantine/core';
import { ReactComponent as SunIcon } from "../assets/icons/sun.svg";
import { ReactComponent as MoonIcon } from "../assets/icons/moon.svg";


export const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      sx={{
        zIndex: 1,
        position: "absolute",
        backgroundColor: colorScheme === "dark" ? "#fff" : "#2c2e33",
        width: 180,
        right: 10,
        top: 10,
      }}
      value={colorScheme}
      onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
      data={[
        {
          value: 'light',
          label: (
            <Center>
              <SunIcon />
              <Box ml={10}>Light</Box>
            </Center>
          ),
        },
        {
          value: 'dark',
          label: (
            <Center>
              <MoonIcon />
              <Box ml={10}>Dark</Box>
            </Center>
          ),
        },
      ]}
    />
  );
};