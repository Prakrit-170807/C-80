import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class IssLocationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ISS_LOCATION : {}
        }
    }

    componentDidMount() {
        this.get_DATA()
        try {
            setInterval(async () => {
                this.get_DATA(), 500
            })
        }
        catch (error) {
            console.log(error.message)
        }
    }

    get_DATA = () => {
        axios.get("https://api.wheretheiss.at/v1/satellites/25544").then(Response_get => {
            this.setState({ ISS_LOCATION : Response_get.data })
        })
            .catch(
                error => {
                    Alert.alert("error", error.message)
                }
            )
    }

    render() {
        if (Object.keys(this.state.ISS_LOCATION).length == 0) {
            return (
                <View style={{ flex: 1, justifyContent:"center"}}>
                    <ActivityIndicator size="large" color="Black"/>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, }}>
                    <ImageBackground source={require("../assets/bg.png")} style={styles.bg}>
                        <Text style={styles.txt}>International Space Station Location</Text>

                        <MapView
                            region={{
                                latitude: this.state.ISS_LOCATION.latitude,
                                longitude: this.state.ISS_LOCATION.longitude,
                                latitudeDelta: 180,
                                longitudeDelta: 180,
                            }}
                            style={{ width: '100%', height: '100%' }}>
                            <Marker coordinate={{
                                latitude: this.state.ISS_LOCATION.latitude,
                                longitude: this.state.ISS_LOCATION.longitude,
                            }}>
                                <Image source={require("../assets/ISS.png")} style={styles.img} />
                            </Marker>
                            <View>
                                <Text style={styles.txt1}>lat : {this.state.ISS_LOCATION.latitude}</Text>
                                <Text style={styles.txt1}>log : {this.state.ISS_LOCATION.longitude}</Text>
                                <Text style={styles.txt1}>alt : {this.state.ISS_LOCATION.altitude}</Text>
                                <Text style={styles.txt1}>velo : {this.state.ISS_LOCATION.velocity}</Text>
                                <Text style={styles.txt1}>Visible : {this.state.ISS_LOCATION.visibility}</Text>
                            </View>

                        </MapView>
                    </ImageBackground>
                </View>
            )
        }
    }
}



const styles = StyleSheet.create({
    bg: {
        flex: 1,
        resizeMode: "cover",
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