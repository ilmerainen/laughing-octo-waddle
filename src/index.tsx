import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from "@apollo/client";

import App from 'App';
import ApolloService from "services/ApolloService";

const client = ApolloService.getClient();

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById('root'));
