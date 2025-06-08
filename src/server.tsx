import { type Context, Hono } from "hono";
import { serveStatic } from "hono/bun";

type CountryData = {
  capital: string;
  population: number;
  area: number;
};

const countryMap: Record<string, CountryData> = {
  Canada: {
    capital: "Ottawa",
    population: 36624199,
    area: 9984670,
  },
  China: {
    capital: "Beijing",
    population: 1409517397,
    area: 9596961,
  },
  France: {
    capital: "Paris",
    population: 67022000,
    area: 640679,
  },
  Germany: {
    capital: "Berlin",
    population: 83019200,
    area: 357022,
  },
  Spain: {
    capital: "Madrid",
    population: 46754783,
    area: 505992,
  },
  "United Kingdom": {
    capital: "London",
    population: 67215293,
    area: 244820,
  },
  "United States": {
    capital: "Washington, D.C.",
    population: 327167434,
    area: 9629091,
  },
};

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

app.post("/country", async (c: Context) => {
  const formData = await c.req.formData();
  const name = (formData.get("name") as string) || "";
  const data = countryMap[name];
  if (data) {
    return c.html(
      <>
        <h1>{name}</h1>
        <div>
          <label>Capital: </label>
          {data.capital}
        </div>
        <div>
          <label>Population: </label>
          {data.population.toLocaleString()}
        </div>
        <div>
          <label>Area: </label>
          {data.area.toLocaleString()} square miles
        </div>
      </>
    );
  }

  return c.html(<h1>No data is available for the country "{name}".</h1>);
});

export default app;
