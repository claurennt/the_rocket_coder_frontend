//Text that appears in the center of the landing page:
// -Greetings,
// -QUESTION + Todo
// quote of the day from ZenQuotes API https://premium.zenquotes.io/zenquotes-documentation/#api-structure
import { React, useEffect, useState } from "react";
// import { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { ThemeProvider } from "@material-ui/core/styles/";
import AddIcon from "@material-ui/icons/Add";
import { useStyles, theme, loaderCSS } from "./MainBodyStyles";

import { useQuery } from "graphql-hooks";
import { allQuotesQuery } from "../db/GraphQLClient";

import BarLoader from "react-spinners/BarLoader";

export default function MainBody() {
  const classes = useStyles();
  // hook for GraphQL query---gets one random quote
  const { loading, data, error } = useQuery(allQuotesQuery);

  // small helper function to display the current moment of the day
  const timeOfNow = () => {
    const time = new Date().getHours();
    const timeOfTheDay =
      time >= 5 && time <= 12
        ? "Morning"
        : time > 12 && time <= 18
        ? "Afternoon"
        : time > 18 && time < 24
        ? "Evening"
        : "Night";

    return timeOfTheDay;
  };

  // saves the current moment of the day in a variable
  const momentOfTheDay = timeOfNow();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("ciao");
    e.target.taskInput.value = "";
  };

  // default quote that is  displayed in case of fetcherror
  const defaultQuote = {
    quote:
      "I can only imagine the sacrifices you've made to be here, but it's never a bad decision to choose yourself.",
    author: "Elektra Abundance-Evangelista",
  };

  // logic to display default quote+author if error or quote+author coming from the external api if no error and data is there
  const quoteElement = error ? (
    <div>
      <p>{defaultQuote.quote}</p>
      <p>
        <em>{defaultQuote.author}</em>
      </p>
    </div>
  ) : (
    data && (
      <div>
        <p>{data.randomQuote.body}</p>
        <p>
          <em>{data.randomQuote.author}</em>
        </p>
      </div>
    )
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className={classes.box}>
          <Box pt={40}>
            <Typography variant="h3">
              Good {momentOfTheDay} Rocket Coder!🚀
            </Typography>
            <Typography variant="h5">
              What are your main tasks for today?
            </Typography>
            <form onSubmit={handleSubmit}>
              <Input
                className={classes.input}
                aria-describedby="todays-tasks"
                name="taskInput"
              />
              <IconButton aria-label="add" type="submit">
                <AddIcon />
              </IconButton>
            </form>

            <BarLoader
              color="#0F044C"
              loading={loading}
              css={loaderCSS}
              width={50}
            />

            <Typography variant="subtitle1">{quoteElement}</Typography>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
