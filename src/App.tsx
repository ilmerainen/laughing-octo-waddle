import React from 'react';
import {ApolloProvider} from "@apollo/client";
import ApolloService from "./services/ApolloService";

const client = ApolloService.getInstance();

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
            </div>
        </ApolloProvider>
    );
}

export default App;
