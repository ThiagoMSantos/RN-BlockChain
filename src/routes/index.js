import React, { useContext } from'react';
import AuthContext from '../contexts/auth';

import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

export default function Routes(){
    const { logado } = useContext(AuthContext);

    return (
        logado ? <AppRoutes/> : <AuthRoutes/>
    )
}