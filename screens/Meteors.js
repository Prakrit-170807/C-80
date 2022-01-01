import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, Alert, Image, ActivityIndicator, FlatList } from 'react-native';

export default class MeteorScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Meteors: {}
        }
    }

    componentDidMount() {
        this.get_DATA()
    }

    get_DATA = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=0QM2FmFNgHZO7ltpI51Dh4ixoJCaHRCELwR5dhFT").then(Response_get => {
            this.setState({ Meteors: Response_get.data.near_earth_objects })
        })
            .catch(
                error => {
                    Alert.alert("error", error.message)
                }
            )
    }

    render() {
        if (Object.keys(this.state.Meteors).length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="Black" />
                </View>
            )
        }
        else {

            let meteotary = Object.keys(this.state.Meteors).map(meteor_date => {
                return (
                    this.state.Meteors[meteor_date]
                )
            })

            let meteorinfo = [].concat.apply([], meteotary)

            meteorinfo.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let scary_element = (diameter / (element.close_approach_data[0].miss_distance.kilometers) / 1000000000)
                element.scary_element = scary_element

            })

            meteorinfo.sort(function (a, b) {
                return b.scary_element - a.scary_element
            })

            meteorinfo = meteorinfo.slice(0, 5)

            return (
                <View style={{ flex: 1, }}>
                    <FlatList data={meteorinfo}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item }) => {
                                let meteorinfo = item
                                let bgimg

                                if (meteorinfo.scary_element <= 30) {
                                    bgimg = require("../assets/bg.png")
                                }
                                else if (meteorinfo.scary_element <= 75) {
                                    bgimg = require("../assets/meteor.png")
                                }
                                else {
                                    bgimg = require("../assets/ISS.png")
                                }
                                return (

                                    <View>
                                        <ImageBackground source={bgimg} style={styles.bg} />
                                    </View>
                                )
                            }
                        }


                        horizontal={true}
                    />

                </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    img: {
        width: 100,
        height: 60,
        resizeMode: "contain",
    },
    img2: {
        flex: 1,
        position: "absolute",
        resizeMode: "contain",
        width: "100%",
        height: "100%",
        marginTop: -50,
        transform: [{ rotate: "-100deg" }],
    },
    txt: {

        color: "white",
        textAlign: "left",
        fontSize: 40,
        marginTop: 70,
        marginLeft: 10,
        fontWeight: "bold",
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2,
        textShadowColor: 'grey',
    },
    txt1: {
        color: "white",
        right: -15,
        bottom: -535,
        fontSize: 18,

        fontWeight: "bold",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: 'black',
    },
    txt2: {
        color: "white",
        textAlign: "left",
        fontSize: 40,
        marginTop: 70,
        marginLeft: 30,
        marginBottom: 15,
        fontWeight: "bold",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        textShadowColor: 'black',
    },
    TOuchOPA: {
        backgroundColor: "#282424",
        margin: 20,
        marginTop: 100,
        borderRadius: 30,
    }
});