//Text that appears in the center of the landing page:
// -Greetings,
// -QUESTION + Todo
// quote of the day from ZenQuotes API https://premium.zenquotes.io/zenquotes-documentation/#api-structure
import React from "react";
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
  const { loading, data, error } = useQuery(allQuotesQuery);
  const classes = useStyles();

  const defaultQuote = {
    quote:
      "I can only imagine the sacrifices you've made to be here, but it's never a bad decision to choose yourself.",
    author: "Elektra Abundance-Evangelista",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("ciao");
    e.target.taskInput.value = "";
  };

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
            <Typography variant="h3">Good Morning, Rocket Coder!🚀</Typography>
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
