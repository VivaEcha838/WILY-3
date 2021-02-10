import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'


export default class BookTransactionScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedBookId: '',
            scannedStudentID: '',
            buttonState: 'normal'
        }
    }
    getCameraPermissions=async(ID)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status==="granted",
            buttonState: ID,
            scanned: false
        })
    }
    handleBarCodeScanned= async({type,data})=>{
        const {buttonState} = this.state.buttonState
        if(buttonState==="BookID"){
            this.setState({
                scanned: true,
                scannedBookID: data,
                buttonState: 'normal',
            })
        }else if(buttonState==="StudentID"){
            this.setState({
                scanned: true,
                scannedStudentID: data,
                buttonState: 'normal',
            })
        }
       
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState!=='normal ' && hasCameraPermissions){
           return(
               <BarCodeScanner
               onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
               style={StyleSheet.absoluteFillObject}
               />
           )
        }else if(buttonState==='normal'){
            return(
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View>
                        <Image
                        style={{width: 200, height: 200}}
                        source={require("../assets/booklogo.jpg")}
                        />
                        <Text style={{textAlign: 'center', fontSize: 40}}> 
                            WILY
                        </Text>
                    </View>
                    <View style={styles.inputView}>
                    <TextInput
                    style = {styles.inputBox}
                    placeholder = "Enter Book ID"
                    value = {this.state.scannedBookID}
                    />
                    <TouchableOpacity style={styles.scanButton}
                     onPress = {()=>{this.getCameraPermissions("BookID")}}
                    >
                      <Text style={styles.displayText}>
                          Scan
                      </Text>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.inputView}> 
                    <TextInput
                    style = {styles.inputBox}
                    placeholder = "Enter Student ID"
                    value = {this.state.scannedStudentID}
                    />
                    <TouchableOpacity style={styles.scanButton}
                     onPress = {()=>{this.getCameraPermissions("StudentID")}}
                    >
                    
                      <Text style={styles.displayText}>
                          Scan
                      </Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.scanning}
                   
                    >
                        <Text style={styles.displayText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            )
        }
        
    }
}
const styles = StyleSheet.create({
    scanning: {
        width: 200,
        height: 50,
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'gold',
        alignItems: 'center',
        justifyContent: 'center'
    },
    displayText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    inputView: {
        flexDirection: "row",
        margin: 20,
    },
    inputBox: {
       width: 200,
       height: 40,
       borderWidth: 1.5,
       fontSize: 20
    },
    scanButton: {
       backgroundColor: 'blue',
       width: 50,
       borderWidth: 1.5
    }
})