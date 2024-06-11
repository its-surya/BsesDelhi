import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';

interface ImageSliderProps {
    images: any[];
}

const { height, width } = Dimensions.get('window');

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    return (
        <View style={styles.wrapper}>
            <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={3}
                paginationStyle={styles.pagination}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
            >
                {images.map((image, index) => (
                    <View key={index}>
                        <Image source={image} style={styles.image} />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

export default ImageSlider;

const styles = StyleSheet.create({
    wrapper: {
        height : height * 0.25,
    },
    pagination: {
        bottom: 10,
    },
    dot: {
        backgroundColor: 'lightgrey',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
    image: {
        width: width *0.96,
        height: height * 0.25, // Set your desired height here
        resizeMode: 'cover',
        borderRadius : 8
    },
});
