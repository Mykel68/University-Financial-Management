import superjson from "superjson";

import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      dehydrate: {
        //taking cache from client/ server to json object and sends to client in client side rendering
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        // the reverse of dehydrate; the client receives the json object and converts it back to a query
        deserializeData: superjson.deserialize,
      },
      queries: {
        staleTime: 30 * 1000,
      },
    },
  });
