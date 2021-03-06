// Screens/Home.js
import React from 'react'
import {ScrollView, FlatList,StyleSheet, View,Text, TouchableOpacity,Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { getAlerts, getLatestPlantImage, getPlantImage, testApi } from '../API/PlantIFApi';
import {getUserPseudo} from '../Helpers/GetPseudo';
import { getLatestImage } from '../Helpers/GetLatestImage'
import NotificationItem from '../Components/NotificationItem'
import {withNavigation } from 'react-navigation'


const HOME_ICON=<FontAwesome name="home" size={25} color='black' style={{marginTop: 5}}/>
const LIBRARY_ICON=<FontAwesome name="list-ul" size={25} color='black' style={{marginTop: 5}}/>
const ADD_ICON=<MaterialIcons name="add-circle" size={25} color='black' style={{marginTop: 5}}/>
const NETWORK_ICON=<MaterialIcons name="group" size={25} color='black' style={{marginTop: 5}}/>
const PROFILE_ICON=<MaterialIcons name="account-circle" size={25} color='black' style={{marginTop: 5}}/>
const DOWN_ICON=<FontAwesome name="angle-down" size={25} color='#449C76'/>

const TEMPERATURE_ICON=<FontAwesome name="thermometer" size={30} color='#449C76'/>
const SUN_ICON=<Ionicons name="sunny-sharp" size={30} color='#449C76'/>
const WATER_ICON=<Ionicons name="water" size={30} color='#449C76'/>
const WARNNING_ICON=<Ionicons name="warning" size={30} color='#449C76'/>
const CAMERA_ICON=<EntypoIcon name="camera" size={24} color='#449C76' style={{backgroundColor:'yellow'}}/>


const TUTORIAL={
    home:{
        icon: HOME_ICON,
        label: 'Home',
        value: 'This page is the menu, it will show all the notifications you have received about your plants in the last couple of days.'
    },
    library:{
        icon: LIBRARY_ICON,
        label: 'Library',
        value: 'This page will show you your recently added plants, and all the plants you possess in your library.'
    },
    addPlant:{
        icon: ADD_ICON,
        label: 'Add Plant',
        value: 'In this page, you will be able to add a plant to your library. You can either take a photo, or directly enter the plant name. You will also be able to register the needs of the plants, the name and the device ID.'
    },
    social:{
        icon: NETWORK_ICON,
        label: "Plant'IF Network",
        value: 'This page will show you your friend list, but also people who possess the same type of plants, hence people that could give you advice. You will also be able to find the plants close to you.'
    },
    profile:{
        icon: PROFILE_ICON,
        label: 'Profile',
        value: 'In this section, you will find all the informations about your profile and you will be able to modify anything you wouold like.'
    }
}

class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showTutorial: false,
            pseudo: "",
            latestImage: undefined,
            notifications: [],
            nbNotif: 0
        }
        
        getUserPseudo().then(data=>{
            this.setState({pseudo:data})
        })
        props.navigation.addListener('focus',payload=>{
            console.log("re render")
            this.componentDidMount()
            this.render()
        })
    }

    componentDidMount(){
        getAlerts().then(response=>{
            console.log(response)
            this.setState({notifications: response.notifications, nbNotif: response.notifications.length})
        })
    }
    _displayTutorial(){
        return (
            <View style={styles.main_container}>
                {Object.entries(TUTORIAL).map(([key,item]) =>
                    <View key={key} style={{flexDirection: 'row'}}>
                        {item.icon}
                        <Text 
                            style={{
                                marginLeft:10,
                                marginBottom:10,
                                color:'black',
                                fontSize: 15
                            }}
                        >
                            {item.value}
                        </Text>
                    </View>
                )}
                
                    
            </View>
        )
    }
    _displayPlantHealth=(idPlant)=>{
        console.log("Display plant with id " + idPlant)
        this.props.navigation.navigate("PlantHealth",{idPlant: idPlant})
    }

    _displayIconProblem(problem){
        switch(problem){
            case 'water':
                return WATER_ICON
                break
            case 'sun':
                return SUN_ICON
                break
            case 'temperature':
                return TEMPERATURE_ICON
                break
            case 'photo':
                return CAMERA_ICON
                break
            default:
                return WARNNING_ICON
                break
        }
    }  
    _displayNotifications(){
        var data=[
            {
                idPlant: 2,
                customizeName: "my tulip",
                image: "blue sky",
                need: "needs more water",
                problem: 'water'
            },
            {
                idPlant: 2,
                customizeName: "my orchid",
                image: "blue sky",
                need: "needs more sun",
                problem: 'sun'
            },
            {
                idPlant: 2,
                customizeName: "my dandelion",
                image: "blue sky",
                need: "needs more temperature",
                problem: 'temperature'
            },
            {
                idPlant: 2,
                customizeName: "my dandelion",
                image: "blue sky",
                need: "needs more picture",
                problem: 'photo'
            },
            {
                idPlant: 1200,
                customizeName: "my dandelion",
                image: "blue sky",
                need: "is in a bad health",
                problem: 'general'
            }
        ]
        
        return(
            <View style={styles.main_container}>
                <Text style={styles.title_container}>Notifications :</Text>
                
                {this.state.nbNotif==0?<Text>You don't have any notification</Text>:null}
                {Object.entries(this.state.notifications).map(([key,item]) =>
                    <View key={key}>
                        <NotificationItem plant={item} displayPlantHealth={this._displayPlantHealth}/>
                    </View>
                )}
            </View>
        )
    }
    
    render(){        
        console.warn("hidden")
        return(
        <ScrollView>
            <Text style={styles.menu}>Home</Text>
            <View style={styles.main_container}>
                <Text id = "title" style={[styles.title_container,{fontStyle: 'italic'}]}>
                    PlantIF, the first app to take care of all your plants!
                    With this application, you can follow the evolution and needs of your plant throughout its life.
                </Text>
            </View>
            <View style={styles.main_container}>
                <Text style = {styles.title_container}>
                    Welcome back {this.state.pseudo != null ? this.state.pseudo : ''} ! Look below to see what your plants need.
                </Text>
            </View>
            <View style={styles.main_container}>
                <TouchableOpacity
                    onPress={()=>this.setState({showTutorial: !this.state.showTutorial})}
                    style={{flexDirection: 'row'}}
                >
                    <Text style = {[styles.title_container,{marginRight:10}]} >Tutorial</Text>
                    {DOWN_ICON}
                </TouchableOpacity>
                {this.state.showTutorial ? this._displayTutorial():null}
            </View>
            {this._displayNotifications()}
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        backgroundColor: '#8FF4C8',
        margin: 20,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 4,
    },
    title_container:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        width: 400,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#8fbc8f",
        color: "#20232a",
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5
    },
    text: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        width: 400,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#8fbc8f",
        color: "#20232a",
        textAlign: "center",
        fontSize: 15,
        marginLeft: 5
    },
    image:{
        height: 49,
        width: 48,
    },
    menu:{
        marginTop: 0,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black'
    },
    image:{
        height: 49,
        width: 48,
    },
    notification: {
        marginTop: 5,
        borderWidth: 4,
        width: 200,
        height: 160,
        borderColor: "#20232a",
        borderRadius: 10,
        backgroundColor: "#aba8c8",
        color: "#20232a",
        fontSize: 18,
        marginLeft: 180,
        flexGrow: 0.2
    }

});

export default HomeScreen