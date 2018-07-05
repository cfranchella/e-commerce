import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import Appbar from '../components/Appbar'
import ProductsContainer from './ProductsContainer'
import SidebarContainer from './SidebarContainer'
import { Grid } from '@material-ui/core'
import SingleProductContainer from './SingleProductContainer'
import SingleOrderContainer from './SingleOrderContainer'
import UserIdContainer from './UserIdContainer'
import CrearUsuario from './CrearUsuario'
import SingleOrder from '../components/SingleProduct'
import CreateProductContainer from './CreateProductContainer';

export default class Main extends React.Component {

    render() {
        return (
            <div>
                <Appbar />
                <br />
                        <Switch>
                            <Route
                                exact path='/products' render={() =>
                                <Grid container spacing={16}>
                                    <Grid item xs={2}>
                                    <SidebarContainer />
                                    </Grid>
                                    <Grid item xs={10}>
                                    <ProductsContainer />
                                    </Grid>
                                </Grid>
                                } />
                            <Route
                                exact path='/products/new' render={() =>
                                    <CreateProductContainer />
                                } />
                            <Route
                                exact path='/products/:id' render={() =>
                                    <SingleProductContainer />
                                } />
                            <Route
                                exact path='/accounts/user/:id' render={() =>
                                    <UserIdContainer />
                                } />
                            <Route
                                exact path='/accounts/new' render={() =>
                                    <CrearUsuario />
                                } />
                            <Route
                                exact path='/orders/:id' render={() =>
                                    <SingleOrderContainer />
                                } />
                            <Redirect from="/" to="/products" />
                        </Switch>
            </div>
        )
    }
}
