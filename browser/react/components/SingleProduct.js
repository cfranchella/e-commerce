import React from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Grid, IconButton } from '@material-ui/core'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import Star from '@material-ui/icons/Star'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    card: {
        maxWidth: 345,
        minWidth: 345,

    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        height: 200,
        maxWidth: 345,

    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',

    },
    title: {
        marginBottom: 16,
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    buttonStar: {
        color: "#D7DF01"
    },
}

export default withStyles(styles)(props => {
    const { classes } = props
    const imgGrid = !props.product.imagens ? [] : props.product.imagens.slice(1)
    // const rating = props.product.reviews && props.product.reviews.reduce((total, review) => {
    //     return total + review.rating;
    // }, 0) / props.product.reviews.length;
    return (

        <div>
            <Grid container spacing={16}>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={!props.product.imagens ? './' : props.product.imagens[0].ruta}
                        />
                    </Card>
                    <br />
                    <div className={classes.root}>
                        <GridList className={classes.gridList} cols={1}>
                            {imgGrid.map(data => (
                                <GridListTile key={data.id}>
                                    <img src={data.ruta} />
                                    <GridListTileBar
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} variant="headline" component="h2">
                                {props.product.precio + '$'}
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {props.product.nombre}
                            </Typography>
                            <Typography component="p">
                                {props.product.descripcion}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton size="small" color="secondary">
                                <AddShoppingCart />
                            </IconButton>
                            <Typography component="p">
                            </Typography>
                        </CardActions>

                    </Card>

                </Grid>
            </Grid>

        </div>
    )
})








