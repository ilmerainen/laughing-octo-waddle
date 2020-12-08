import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

export default class ApolloService {
    static client: ApolloClient<NormalizedCacheObject>;

    static getClient(): ApolloClient<NormalizedCacheObject> {
        if (ApolloService.client) {
            return ApolloService.client;
        } else {
            ApolloService.client = new ApolloClient<NormalizedCacheObject>({
                uri: process.env.REACT_APP_GRAPHQL_ZERO!,
                cache: new InMemoryCache(),
            });

            return ApolloService.client;
        }
    }
}