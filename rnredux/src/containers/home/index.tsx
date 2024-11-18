import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import {TMDB_API_KEY} from '@env';
import useSelector from '../../utils/useSelector';
import {fetchPopularMoviesAsync, fetchUpcomingMoviesAsync} from './actions';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {Movie} from './types';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
const Home = () => {
  const {
    popularLoading,
    popularMovies,
    popularError,
    upcomingLoading,
    upcomingMovies,
    upcomingError,
  } = useSelector(state => state.home);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const [popularPage, setPopularPage] = React.useState(1);
  const [upcomingPage, setUpcomingPage] = React.useState(1);
  const [popularMovieList, setPopularMovieList] = React.useState([]);
  const [upcomingMovieList, setUpcomingMovieList] = React.useState([]);
  useEffect(() => {
    dispatch(fetchPopularMoviesAsync.request(popularPage));
    dispatch(fetchUpcomingMoviesAsync.request(upcomingPage));
  }, []);

  useEffect(() => {
    toast.hideAll();
    if(popularError) {
        // console.log('popularError', popularError);
      toast.show(popularError.message, {
        type: 'danger',
      });
    }

    if(upcomingError) {
        // console.log('upcomingError', upcomingError);
      toast.show(upcomingError.message, {
        type: 'danger',
      });
    }
  }, [popularError, upcomingError]);

  useEffect(() => {
    if (popularMovies && popularMovies?.length > 0) {
      const updatedList = deduplicateItems(popularMovieList, popularMovies);
      setPopularMovieList(updatedList);
    }
  }, [popularMovies]);

    useEffect(() => {
        if (upcomingMovies && upcomingMovies?.length > 0) {
        const updatedList = deduplicateItems(upcomingMovieList, upcomingMovies);
        setUpcomingMovieList(updatedList);
        }
    }, [upcomingMovies]);

  useEffect(() => {
    // console.log('popularMovieList', popularMovieList);
  }, [popularMovieList, popularLoading]);

  const renderMovieItem = ({item}: {item: Movie}) => {
    return (
      <TouchableOpacity
        style={{
          width: 150,
          margin: 10,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('Detail', {movieId: item?.id.toString()});
        }}>
        <FastImage
          style={{width: '100%', height: 250, borderRadius: 10}}
          resizeMode="cover"
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 5,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontSize: 12}}>
            {Number(item.vote_average).toFixed(1)}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 5,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const refreshMovies = () => {
    console.log('refreshMovies');
    setPopularMovieList([]);
    setPopularPage(1);
    dispatch(fetchPopularMoviesAsync.request(1));

    setUpcomingMovieList([]);
    setUpcomingPage(1);
    dispatch(fetchUpcomingMoviesAsync.request(1));
  };

  const deduplicateItems = (oldItems: Movie[], newItems: Movie[]) => {
    const combinedItems = [...oldItems, ...newItems];
    const uniqueItems = combinedItems.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return uniqueItems;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={popularLoading}
            onRefresh={refreshMovies}
          />
        }>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Popular Movies
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          {popularLoading && <Text>Loading...</Text>}
          {!popularLoading && popularMovies?.length === 0 && (
            <Text>No popularMovies found</Text>
          )}
          <FlatList
            data={popularMovieList ? popularMovieList : []}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              if (!popularLoading) {
                setPopularPage(popularPage + 1);
                dispatch(fetchPopularMoviesAsync.request(popularPage + 1));
              }
            }}
            ListFooterComponent={() => {
              return popularLoading ? <Text>Loading...</Text> : null;
            }}
          />
        </View>

        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Upcoming Movies
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          {!upcomingLoading && upcomingMovies?.length === 0 && (
            <Text>No upcomingmovies found</Text>
          )}
          <FlatList
            data={upcomingMovieList ? upcomingMovieList : []}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              if (!upcomingLoading) {
                setUpcomingPage(upcomingPage + 1);
                dispatch(fetchUpcomingMoviesAsync.request(upcomingPage + 1));
              }
            }}
            ListFooterComponent={() => {
              return upcomingLoading ? <Text>Loading...</Text> : null;
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
