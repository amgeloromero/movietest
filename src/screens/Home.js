import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar, SearchBar, Tab, TabView ,Icon } from '@rneui/themed';
import { Notify } from '../utils/notify';
import { Rendermovieitem,Favmovieitem } from '../components/';
import zusStore from "../store/zusStore";
export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [moviesfav, setMoviesfav] = useState([]);
    const [index, setIndex] = useState(0);
    const { favoritos, setFavoritos  } = zusStore();
    const searchMoviesInit = async () => {
        try {
            const response = await fetch(
                `http://www.omdbapi.com/?s=marvel&apikey=62878274`
            );
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
            }
        } catch (error) {
            console.error("Error fetching initial movies:", error);
        }
    };

    const Listdatafav = () => {    
        setMoviesfav(favoritos);   
        console.log('Listdatafav',moviesfav);
        console.log('favoritos',favoritos);
    };

    const changetab = (index) => {    
        setIndex(index);
        console.log('changetab',favoritos);
    };
    
    
    useEffect(() => {
        searchMoviesInit();
    }, []);


   


    const searchMovies = async () => {
        try {
            console.log("Searching for:", searchQuery);
            setLoading(true);
            const response = await fetch(
                `http://www.omdbapi.com/?s=${searchQuery}&apikey=62878274`
            );
            // console.log(response.data);
            const data = await response.json();
            // console.log("data",data);
            setLoading(false);
            if (data.Search) {
                setMovies(data.Search);
            } else {
                Notify.error(data.Error);

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

                onChange={(newIndex) => {
                    setIndex(newIndex);
                    Listdatafav();  // Ejecuta la función cuando se presiona un Tab
                }}
                //indicatorStyle={{ backgroundColor: 'red', height: 2 }}
               // variant="secondary"
            >
                <Tab.Item title="" titleStyle={styles.tabTitle} 
                   containerStyle={(active) => ({
                    backgroundColor: active ? "#fafafa": "#eaeaea" ,
                    })}
                    buttonStyle={(active) => ({
                        backgroundColor: active? "#fafafa": "#eaeaea",
                    })}
                    icon={<Icon name='movie'/>}
                    />
                <Tab.Item titleStyle={styles.tabTitle}  
                 onPress={Listdatafav}
                 icon={<Icon name='star'
                    onPress={Listdatafav}
                 />}
                containerStyle={(active) => ({
                backgroundColor: active ? "#fafafa": "#eaeaea" ,
                })} />

            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">

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
                        />
                        <FlatList
                            data={movies}
                            // renderItem={(item) => Rendermovieitem(item)}
                            renderItem={({ item }) => <Rendermovieitem item={item} 
                           // onfavorite={()=>props}
                            isFavorite={favoritos.some(fav => fav.imdbID === item.imdbID)}/>}
                            keyExtractor={item => item.imdbID}
                            style={styles.movieList}
                        />

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
        // padding: 16,     
        // marginLeft: 2,
        // marginRight: 2,
        // marginTop: 2,
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
        flex: 1,/*
        borderColor: 'red',
        borderWidth: 1,*/
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