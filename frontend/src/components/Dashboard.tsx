import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';
import DashboardContext from '../contexts/DashboardContext';
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function isBottom(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) {
    return false;
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

export default function Dashboard() {
  const classes = useStyles();
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {movies, throttledLoad} = useContext(DashboardContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasMoreData = movies.length < 1000;

  const onBottomHit = throttledLoad;

  useEffect(() => {
    if (initialLoad) {
      onBottomHit();
      setInitialLoad(false);
    }
  }, [onBottomHit, initialLoad]);

  useEffect(() => {
    const onScroll = () => {
      if (!isLoading && hasMoreData && isBottom(contentRef)) {
        onBottomHit();
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [onBottomHit, isLoading, hasMoreData]);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container ref={contentRef} className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {movies.map(movie => (
              <Grid item key={movie._id} xs={12}>
                <Card className={classes.card}>
                  {/*<CardMedia*/}
                  {/*  className={classes.cardMedia}*/}
                  {/*  image={product.imageUrl}*/}
                  {/*  title={movie.title}*/}
                  {/*/>*/}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {movie.title}
                    </Typography>
                    <Typography>description</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <button onClick={throttledLoad}>load next</button>
      </main>
    </React.Fragment>
  );
}
