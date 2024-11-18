import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  fetchDetailsMovieAsync,
  clearMovieDetails,
  addFavouriteMovie,
  removeFavouriteMovie,
  resetFavouriteMovies,
} from '../home/actions';
import {useNavigation} from '@react-navigation/native';
import useSelector from '../../utils/useSelector';
import FastImage from 'react-native-fast-image';
import {useToast} from 'react-native-toast-notifications';
const Detail = props => {
  const {movieId} = props.route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = React.useState(false);
  const {detailMovie, detailLoading, detailError, favouriteMovies} =
    useSelector(state => state.home);
  useEffect(() => {
    // console.log('movieId', movieId);
    if (movieId) {
      dispatch(fetchDetailsMovieAsync.request(movieId));
    }
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [movieId]);

  useEffect(() => {
    if (detailError) {
    //   console.log('detailError', detailError);
      toast.hideAll();
      toast.show(detailError.message, {
        type: 'danger',
      });
    }
  }, [detailError]);

  useEffect(() => {
    if (favouriteMovies && favouriteMovies?.length > 0) {
      let favourite = favouriteMovies.some(movie => {
        return movie.id == movieId;
      });
      setIsFavourite(favourite);
    } else {
      setIsFavourite(false);
    }
  }, [favouriteMovies]);

  useEffect(() => {
    console.log('rerender or not isFavourite', isFavourite);
  }, [isFavourite]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {detailMovie == null && detailLoading == false ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>No Data Found</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 10,
              marginHorizontal: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {detailLoading ? (
            <Text style={styles.title}>Loading...</Text>
          ) : (
            <ScrollView>
              <View style={styles.container}>
                <View
                  style={{
                    width: '100%',
                    height: 300,
                    backgroundColor: 'black',
                  }}>
                  <FastImage
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                  }}>
                  <Text style={styles.title}>
                    {detailMovie?.title}
                    {' ( '}
                    {detailMovie?.release_date?.split('-')[0]}
                    {' ) '}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: 10,
                    }}>
                    {detailMovie?.genres?.map(genre => {
                      return (
                        <Text style={styles.genre} key={genre.id}>
                          {genre.name}
                        </Text>
                      );
                    })}
                  </View>
                  <Text style={styles.title}>Story Line</Text>
                  <Text style={styles.overview}>{detailMovie?.overview}</Text>
                </View>
              </View>
              {/* add to favourite */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 20,
                }}>
                {isFavourite == false && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'green',
                      padding: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      dispatch(addFavouriteMovie(detailMovie));
                    }}>
                    <Text style={styles.buttonText}>Add to Favourite</Text>
                  </TouchableOpacity>
                )}
                {isFavourite == true && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      padding: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      dispatch(removeFavouriteMovie(detailMovie));
                    }}>
                    <Text style={styles.buttonText}>Remove from Favourite</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                  borderRadius: 10,
                  marginHorizontal: 20,
                }}
                onPress={() => {
                  dispatch(resetFavouriteMovies());
                }}>
                <Text style={styles.buttonText}>Reset Favourite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'blue',
                  padding: 10,
                  borderRadius: 10,
                  marginHorizontal: 20,
                }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  genre: {
    fontSize: 16,
    marginTop: 10,
    backgroundColor: 'lightgray',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  overview: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
  },
});
export default Detail;
