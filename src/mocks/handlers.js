import { rest } from "msw";
import { weatherUrl } from "../api/urlCreator";
import { fakeWeatherResponse } from "./fakeResponse";

export const handlers = [
  rest.get(
    weatherUrl({
      date: ":date",
      location: ":location",
      key: ":key",
      withoutQuery: true,
    }),
    (req, res, ctx) => {
      const { location, date } = req.params;

      if (location !== "mashhad") {
        throw new Error();
      }

      return res(
        ctx.json(fakeWeatherResponse({ address: location, datetime: date }))
      );
    }
  ),
];
