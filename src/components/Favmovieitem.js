import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar,Button ,Icon} from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import zusStore from "../store/zusStore";
import { useNavigation } from '@react-navigation/native';

export default function Favmovieitem(item) {
    const navigation = useNavigation();
    const setMovieImdb = zusStore((state) => state.setMovieImdb);
    item = item.item;
   console.log("🚀 ~ Rendermovieitem ~ item:", item)
    //return false;

    const handlePress = () => {
        setMovieImdb(item.imdbID);
        navigation.navigate('Detalle');      
    };

    return (
        <TouchableOpacity 
            style={styles.movieItem} 
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
                            colors={[ '#3374ff','#8fadee']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.gradient}
                        >
                           
                            <Text style={styles.buttonText}>Detalle Pelicula Favorita</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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