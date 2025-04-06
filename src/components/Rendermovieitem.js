import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar,Button,Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import zusStore from "../store/zusStore";
import { useNavigation } from '@react-navigation/native';

export default function Rendermovieitem(item,props) {
    const navigation = useNavigation();
    const setMovieImdb = zusStore((state) => state.setMovieImdb);
    const setFavoritos = zusStore((state) => state.setFavoritos);
    const favoritos = zusStore((state) => state.favoritos);
    item = item.item;
   
   // return false;

    const handlePress = () => {
        setMovieImdb(item.imdbID);
        navigation.navigate('Detalle');      
    };


    const setfav = (item) => {
        const isFavorite = favoritos.some(fav => fav.imdbID === item.imdbID);
        if (!isFavorite) {
            setFavoritos([...favoritos, item]);
        } else {
            console.log("Este elemento ya está en tus favoritos");
        }
    };

    return (<View   style={styles.movieItem} >
        <TouchableOpacity 
          
            onPress={() =>handlePress()}
        >
            <View style={styles.movieItemContent}>
                <Avatar
                    size={74}
                    rounded
                    source={item.Poster ? { uri: item.Poster } : {}}
                    key={item.imdbID}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.movieTitle}>{item.Title}</Text>
                    <Text>{item.Year}</Text>
                    <Text>{item.Type}</Text>
                  
                    <TouchableOpacity onPress={() =>handlePress()}>
                        <LinearGradient
                            colors={['#FF9800', '#F44336']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>Detalle Pelicula</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
        <View style={styles.heartIconContainer}>
  <Icon name="heart" type="font-awesome" color="#f50" size={24} 
  onPress={() => setfav(item)}/>
</View>

        </View>
    );
}

const styles = StyleSheet.create({
    heartIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10, // opcional, por si hay solapamientos
       /* borderColor: 'red',
        borderWidth: 5,*/
        padding: 5,
      },
    movieItem: {
        padding: 16,
        borderBottomWidth: 1,
       // borderBottomColor: '#eee',
        backgroundColor: '#eaeaea',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
    },
    movieItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'red',
       /* borderWidth: 5,
        marginRight: 30,*/
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
    gradient: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

//export default RenderMovieItem;