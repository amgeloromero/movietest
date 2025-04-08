import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@rneui/themed';
import zusStore from "../store/zusStore";
export default function Details({ route }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const { movieImdb } = zusStore();
    const handleShareEmail = async () => {
            const movieInfo = `
            Movie: ${movieDetails.Title}
            Year: ${movieDetails.Year}
            Director: ${movieDetails.Director}
            Cast: ${movieDetails.Actors}
            Plot: ${movieDetails.Plot}
            Rating: ${movieDetails.imdbRating}
        `;

        const mailtoUrl = `mailto:?subject=Check out this movie: ${movieDetails.Title}&body=${encodeURIComponent(movieInfo)}`;

        try {
            const canOpen = await Linking.canOpenURL(mailtoUrl);
            if (canOpen) {
                await Linking.openURL(mailtoUrl);
            }
        } catch (error) {
            console.error('Error opening email:', error);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
    }, []);

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(
                `http://www.omdbapi.com/?i=${movieImdb}&apikey=62878274`
            );
            const data = await response.json();
            setMovieDetails(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    if (!movieDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['rgba(245, 15, 15, 0.8)', 'transparent']}
                style={styles.gradient}
            >
                <Image
                    source={{ uri: movieDetails.Poster }}
                    style={styles.poster}
                />
            </LinearGradient>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{movieDetails.Title}</Text>

                <Text style={styles.year}>{movieDetails.Year}</Text>
                <Text style={styles.year}> <TouchableOpacity
                    style={styles.shareButton}
                    onPress={handleShareEmail}
                >
                    <Icon
                        name="email"
                        color="#F44336"
                        size={24}
                    />
                </TouchableOpacity></Text>
                <View style={styles.infoRow}>
                    <Text style={styles.rating}>{movieDetails.Rated}</Text>
                    <Text style={styles.duration}>{movieDetails.Runtime}</Text>
                    <Text style={styles.genre}>{movieDetails.Genre}</Text>

                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Plot</Text>
                    <Text style={styles.plot}>{movieDetails.Plot}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cast</Text>
                    <Text style={styles.text}>{movieDetails.Actors}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Director</Text>
                    <Text style={styles.text}>{movieDetails.Director}</Text>
                </View>

                <View style={styles.ratingSection}>
                    <Text style={styles.sectionTitle}>Ratings</Text>
                    {movieDetails.Ratings?.map((rating, index) => (
                        <Text key={index} style={styles.text}>
                            {rating.Source}: {rating.Value}
                        </Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    poster: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
      
    },
    detailsContainer: {
        padding: 20,
        marginTop: 200,

        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    year: {
        fontSize: 18,
        color: '#666',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    rating: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
    },
    duration: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
    },
    genre: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    plot: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    ratingSection: {
        marginBottom: 20,
    },
});