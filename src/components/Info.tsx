import React, { useContext, useState } from "react";
import {
  Badge,
  Box,
  Card,
  createStyles,
  Group,
  Image,
  Text,
  Button as MantineButton,
  Popover,
  Menu,
} from "@mantine/core";
import { Context } from "../App";

import { IContext } from "../interface/interface";

import { ReactComponent as MoneyIcon } from "../assets/icons/dollar.svg";
import { ReactComponent as WalkIcon } from "../assets/icons/walk.svg";
import { ReactComponent as SubwayIcon } from "../assets/icons/subway.svg";
import { ReactComponent as BikeIcon } from "../assets/icons/bike.svg";
import { Button } from "./Button";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    fontWeight: 500,
    paddingTop: 0,
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingTop: 0,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: "16px",
    pointerEvents: "none",
    zIndex: 2,
    fontWeight: 500,
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 500,
    fontFamily: "MADE TOMMY",
  },
}));

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const Info = () => {
  const [opened, setOpened] = useState(false);
  const { classes, theme } = useStyles();
  const context: IContext = useContext(Context);
  const service = new window.google.maps.DirectionsService();
  const directionRender = new google.maps.DirectionsRenderer();

  const getDirections = (mode: string) => {
    openInNewTab(
      `https://www.google.com/maps/dir/?api=1&origin=${context.lat},${context.lng}&destination=${context.barLat},${context.barLng}&travelmode=${mode}`,
    );
  };

  return (
    <Box
      p={0}
      sx={{
        zIndex: 1,
        position: "absolute",
        top: "22%",
        left: "50%",
        transform: "translate(-50%, -22%)",
        width: 370,
        paddingTop: 0,
      }}
    >
      <Card withBorder radius="md" p="md" className={(classes.card, "ignore-padding")}>
        <Badge className={classes.rating} variant="gradient" gradient={{ from: "yellow", to: "red" }}>
          {context.rating ? `${context.rating} / 5` : null}
        </Badge>
        <Card.Section sx={{ minHeight: 20 }}>
          {context.image && <Image src={context.image} alt="Bar photo" height={180} />}
        </Card.Section>
        <Card.Section className={classes.section} mt="md">
          <Group position="apart">
            <Text size="lg" weight={500}>
              {context.name}
            </Text>
            <Badge
              sx={{ fontWeight: 500, display: "flex", flexDirection: "row" }}
              size="md"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              {[...new Array(context.priceLevel)].map((_, index) => (
                <MoneyIcon scale={0.5} key={index} />
              ))}
            </Badge>
          </Group>
        </Card.Section>
        <Card.Section sx={{ padding: 10, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Menu transition="pop-top-right" position="bottom-end">
            <Menu.Target>
              <Button style={{ margin: 0 }} onClick={() => setOpened(!opened)}>
                Get directions
              </Button>
            </Menu.Target>
            <Menu.Dropdown sx={{ marginLeft: 10 }}>
              <MantineButton.Group>
                <Button
                  style={{ borderRight: "1px solid #5c3ac3", marginTop: 0, marginLeft: "none" }}
                  onClick={() => getDirections("walking")}
                >
                  <WalkIcon fill="#291a56" />
                </Button>
                <Button
                  style={{ borderRight: "1px solid #5c3ac3", marginTop: 0, marginLeft: "none" }}
                  onClick={() => getDirections("bicycling")}
                >
                  <BikeIcon fill="#291a56" />
                </Button>
                <Button style={{ marginTop: 0, marginLeft: "none" }} onClick={() => getDirections("transit")}>
                  <SubwayIcon fill="#291a56" />
                </Button>
              </MantineButton.Group>
            </Menu.Dropdown>
          </Menu>
          <Button style={{ margin: 0 }} onClick={() => openInNewTab(context.url ?? "")}>
            Website
          </Button>
        </Card.Section>
      </Card>
    </Box>
  );
};
