import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar, SearchBar, Tab, TabView, Icon } from '@rneui/themed';
import { Notify } from '../utils/notify';
import { Rendermovieitem, Favmovieitem } from '../components/';
import zusStore from "../store/zusStore";
import Ajax from '../core/Ajax';
export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [moviesfav, setMoviesfav] = useState([]);
    const [index, setIndex] = useState(0);
    const { favoritos, setFavoritos } = zusStore();
    const searchMoviesInit = async () => {

        setMovies([]);
        /*
        INFO: esto es para que no se carguen los datos al iniciar la app
        try {
             const response = await Ajax.get('/', {
                params: {
                  s: 'marvel' // solo el término de búsqueda
                }
              });
         
            const {Search} = response.data;
            const {Response} = response.data;
         
            if (Response) {
                setMovies(Search);
            }
        } catch (error) {
            console.error("Error fetching initial movies:", error);
        }
        */
    };

    const Listdatafav = () => {
        setMoviesfav(favoritos);

    };
    

    useEffect(() => {
        searchMoviesInit();
    }, []);





    const searchMovies = async () => {
        try {

            setLoading(true);

            const response = await Ajax.get('/', {
                params: {
                    s: searchQuery // solo el término de búsqueda
                }
            });

            setLoading(false);
            const { Search } = response.data;
            const { Response } = response.data;

            if (Response == 'True') {

                setMovies(Search);
            } else {

                const { Error } = response.data;

                Notify.error(Error);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <View style={styles.container}>

            <Tab
                value={index}
                //  onChange={setIndex}
                dense={true}
                onChange={(newIndex) => {
                    setIndex(newIndex);
                    Listdatafav();  // Ejecuta la función cuando se presiona un Tab
                }}

            >
                <Tab.Item title="" titleStyle={styles.tabTitle}
                    containerStyle={(active) => ({
                        backgroundColor: active ? "#fafafa" : "#eaeaea",
                    })}
                    buttonStyle={(active) => ({
                        backgroundColor: active ? "#fafafa" : "#eaeaea",
                    })}
                    icon={<Icon name='movie' />}
                />
                <Tab.Item titleStyle={styles.tabTitle}
                    onPress={Listdatafav}
                    icon={<Icon name='star'
                        onPress={Listdatafav}
                    />}
                    containerStyle={(active) => ({
                        backgroundColor: active ? "#fafafa" : "#eaeaea",
                    })} />

            </Tab>
            <TabView value={index} onChange={(newIndex) => {
                setIndex(newIndex);
                Listdatafav();  //comentario: Ejecuta la función cuando se presiona un Tab
            }} animationType="spring">

                <TabView.Item style={{
                    width: '100%',
                    flex: 1,
                }}>
                    <>
                        <SearchBar
                            onClear={searchMoviesInit}
                            searchIcon={{ color: 'white' }}
                            round={true}
                            blur={true}
                            placeholder="Busque su pelicula"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                            showLoading={loading}
                            onSubmitEditing={searchMovies}
                            containerStyle={styles.searchbar}
                            loadingProps={{ size: 'small', color: 'white' }}
                        />
                        {(movies) ? <FlatList
                            data={movies}
                            // renderItem={(item) => Rendermovieitem(item)}
                            renderItem={({ item }) => <Rendermovieitem item={item}
                                // onfavorite={()=>props}
                                isFavorite={favoritos.some(fav => fav.imdbID === item.imdbID)} />}
                            keyExtractor={item => item.imdbID}
                            style={styles.movieList}
                        /> :
                            <><Text><Icon name="schedule" /> Loading..</Text></>}

                    </>

                </TabView.Item>


                <TabView.Item style={{
                    width: '100%',
                    flex: 1,
                }}>
                    <FlatList
                        data={moviesfav}
                        renderItem={({ item }) => <Favmovieitem item={item} />}
                        keyExtractor={item => item.imdbID}
                        style={styles.movieList}
                    />
                </TabView.Item>

            </TabView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    movieList: {
        flex: 1,
    },
    movieItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    movieItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    movieItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    searchbar: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderTopWidth: 0,
        borderRadius: 18,
    }
});