import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

export default class ApolloService {
    static client: ApolloClient<NormalizedCacheObject>;

    static getInstance(): ApolloClient<NormalizedCacheObject> {
        if (ApolloService.client) {
            return ApolloService.client;
        } else {
            ApolloService.client = new ApolloClient<NormalizedCacheObject>({
                uri: process.env.GRAPHQL_ZERO!,
                cache: new InMemoryCache(),
            });

            return ApolloService.client;
        }
    }
}