import React from "react";
import Card from "./Card";
import { withInfo } from "@storybook/addon-info";

export default {
  title: "Card",
  decorators: [Wrapper, withInfo]
};

function Wrapper(storyFn) {
  return <div style={{ background: "#F9F6F2", width: "30%" }}>{storyFn()}</div>;
}

export const card = () => (
  <Card
    title="Nachrichten aus Deutschland: Dompteur von erschossenem Zebra: "
    description="Hamburg: Mann auf offener Straße erstochen +++ Enningerloh: 49-Jährige stirbt nach Messerstichen +++ Nachrichten aus Deutschland"
    urlToImage="https://image.stern.de/8937838/16x9-1200-675/2f54e7e39528d569265b8efbee7f3069/Rl/zebra.jpg"
  />
);

export const card_isBookmarked = () => (
  <Card
    title="Nachrichten aus Deutschland: Dompteur von erschossenem Zebra: "
    description="Hamburg: Mann auf offener Straße erstochen +++ Enningerloh: 49-Jährige stirbt nach Messerstichen +++ Nachrichten aus Deutschland"
    urlToImage="https://image.stern.de/8937838/16x9-1200-675/2f54e7e39528d569265b8efbee7f3069/Rl/zebra.jpg"
    isBookmarked="true"
  />
);
