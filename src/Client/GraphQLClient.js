import { GraphQLClient } from "graphql-hooks";

const client = new GraphQLClient({
  url: "https://spark-api-graphql.herokuapp.com/",
  useGETForQueries: true,
});

const allQuotesQuery = `
query{
    randomQuote{
      body
      author
      authorType
      category{
        name
      }
    }
  }
`;
export { client, allQuotesQuery };
