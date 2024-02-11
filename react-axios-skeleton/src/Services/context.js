import React from 'react';

const AxiosContext = React.createContext(null);

export const withAxios = Component => props => (
    <AxiosContext.Consumer>
        { axios => <Component {...props} axios={axios} />}
    </AxiosContext.Consumer>
);

export default AxiosContext;