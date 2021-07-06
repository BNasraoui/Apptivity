import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

/* Universal Stylesheet */
export const styles = StyleSheet.create({
    containerIntial: {
		flex: 1,
		//justifyContent: 'center',
		//alignItems: 'center',
		//borderWidth: 1,
		flexWrap: 'wrap',
		backgroundColor: '#2c549e',
		padding: 10,
	},
	calendar: {
		borderColor:'white',
		borderTopWidth: 1,
		paddingTop: 5,
	  },

	group: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 10,
	},
	borderBottom: {
	    borderBottomWidth: 1,
	    borderColor: 'white',
    },
	left: {
		borderWidth: 1,
		height: 50,

	},
	right: {
        borderWidth: 1,
        height: 50
    },
    addButton: {
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        width: 40,
        alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000000'
    },
    deleteButton: {
	    borderWidth: 1,
	    borderRadius: 10,
	    height: 20,
	    width: 20,
	    alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		backgroundColor: '#000000'
    },
    newActivity: {
		borderWidth: 1,
		borderRadius: 10,
		height: 'auto',
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'black',
		flex: 3,
    },
    submitButton: {
		borderWidth: 1,
		borderRadius: 30,
		height: 60,
		width: 60,
		alignItems: 'flex-end',
		justifyContent: 'center',
		alignSelf: 'flex-end',
		marginRight: 20,
		backgroundColor: '#000000',
    },
    resizeableImage: {
		flex: 1,
		alignSelf: 'stretch',
		height: undefined,
		width: undefined,
    },
    baseText: {
        fontSize: 20,
        color: 'white',
	},
	
	containerAdmin: {
		flexDirection: 'column',
		backgroundColor: 'white'
		 
	},
	  
	overlayContainer: {
	    flex:0.45,
		backgroundColor: 'white',
		justifyContent:'center',
		alignContent:'center',
		alignItems:'center',
		alignSelf:'center',
    },
		
	pic: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: 100
	  
	},
	  
	Info: {
		position: "absolute",
		right:10,
		top:50,
		width: 40,
		height: 40,
	},
	  
	text1: {
	fontSize: 30,
	color: 'white',
	position:'absolute',
	alignItems: 'center',
	alignContent:'center',
	justifyContent: 'center',
	fontWeight: "bold",
	  
	},
	  
	text2: {
	position: 'absolute',
	fontSize: 25,
	color: '#3366CC',
	marginTop: 250,
	marginLeft: 50,
	bottom: 0,
	top: 180,
	left: 0,
	right: 0,
	alignItems: 'center',
	justifyContent: 'center',
	fontWeight: "bold",
	  
	},
	  
	  
	text3: {
		position: 'absolute',
		fontSize: 20,
		color: 'white',
		fontWeight: "bold",  
	},
	  
	buttonLoginUser: {
	    width: '80%', 
	    height: 60, 
	    backgroundColor: '#3366CC', 
	    justifyContent: 'center', 
	    alignItems: 'center',
	    alignSelf: 'center',
	    backgroundColor:'#FF9800',
	    padding: 10,  
	    marginBottom :20,
	    alignItems: 'center',
	    alignSelf: 'center',
	},
	  
	  
	buttonLoginAdmin: {
		width: '80%', 
		height: 60, 
		backgroundColor: '#FF9800', 
		justifyContent: 'center', 
		alignItems: 'center',
		alignSelf: 'center',
		padding: 10,
		marginBottom :20,
		marginTop:20,
		borderColor: 'white',
		backgroundColor:'#3366CC',
		  
	},

	containerInstructions: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: "center",
		alignItems: 'center',
		backgroundColor: 'rgba(37,79,109, .10)'
		   
	},
		
		
	defaultText : {
		textAlign: 'center',
		padding: 10,
		fontSize: 22,
		margin: 5,
		color: "black",
		borderWidth: StyleSheet.hairlineWidth,
			
	},
		  
	picIn: {
		marginTop: 100,
		padding: 10,
		width: 200,
		height: 200,
		  
    },
		
	picIn1: {
		marginTop: 40,
		padding: 10,
		width: 200,
		height: 200,
		  
    },
		
	picIn2: {
		marginTop: 40,
		padding: 10,
		width: 200,
		height: 200,
		  
	},
		
	picIn3: {
	    marginTop: 40,
		padding: 10,
		width: 200,
		height: 200, 
	},
		
		
	text7: {
		fontSize: 20,
		color: '#3366CC',
		padding: 20,
		
	},
		
	back: {
		width: 30,
		height: 30,
		marginTop: 65,
		marginRight: 300,
		position: 'relative',
	},

	containerLoginAdmin: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DCDCDC',
	},
	
	inputContainer: {
		borderBottomColor: '#F5FCFF',
		backgroundColor: '#FFFFFF',
		borderRadius:30,
		borderBottomWidth: 1,
		width:250,
		height:45,
		marginBottom:20,
		flexDirection: 'row',
		alignItems:'center'
	},
	
	inputs:{
		height:45,
		marginLeft:16,
		borderBottomColor: '#FFFFFF',
		flex:1,
		  
	},
		 
	inputIcon:{
		width:30,
		height:30,
		marginLeft:15,
		justifyContent: 'center'
	},
		  
	buttonContainer: {
		height:45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom:20,
		width:250,
		borderRadius:30,
	},
		  
	LoginasUser: {
		fontSize: 30,
		color: '#3366CC',
		bottom: 50,
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: "bold",
	},
		  
	loginButton: {
		backgroundColor: "#00b5ec",
	},
	
	loginText: {
		color: 'white',
	},
	  
	inputContainer: {
		borderBottomColor: '#F5FCFF',
		backgroundColor: '#FFFFFF',
		borderRadius:30,
		borderBottomWidth: 1,
		width:250,
		height:45,
		marginBottom:20,
		flexDirection: 'row',
		alignItems:'center'
	},
		
	inputs:{
		height:45,
		marginLeft:16,
		borderBottomColor: '#FFFFFF',
		flex:1,
	},
		
	inputIcon:{
		width:30,
		height:30,
		marginLeft:15,
		justifyContent: 'center'
	},
	  
	LoginasUser: {
		fontSize: 30,
		color: '#3366CC',
		bottom: 50,
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: "bold",
	},
		
	buttonContainer: {
		height:45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom:20,
		width:250,
		borderRadius:30,
	},

	loginButton: {
		backgroundColor: "#3366CC",
		
	},
		
	loginText: {
		color: 'white',	
	},
		
	containerTabs: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	
	MonitorUser: {

        justifyContent: 'flex-end',
		padding: 10,
		width: '60%', 
		height: 60, 
		alignItems: 'center',
		alignSelf: 'center',
		fontSize: 20,
		color: 'white',
		fontWeight: "bold",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor:'#3366CC',
		top: 100
    },

    AccountSettings: {
		padding: 10,
		width: '60%', 
		height: 60, 
		top: 70,
		marginTop:20,
		justifyContent: 'center', 
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 10,
		backgroundColor:'#FF9800',
    },
   
	container: {
	    flex: 1,
        justifyContent: "center",
   
	},

    CreateUser: {
        padding: 10,
        width: '60%', 
        height: 60, 
        top: 70,
        marginTop:20,
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor:'#3366CC',
    },

    containerButton: {
        justifyContent:'flex-start',
	    alignContent:'center',
	    alignItems:'center',

    },
 
    containerUser: {
        flex: 1,
        justifyContent: "center",  
    },

	title12: {
  		fontSize: 30,
  		color: '#3366CC',
  		bottom:50,
  		alignItems: 'center',
  		justifyContent: 'center',
  		alignSelf: 'center',
  		fontWeight: "bold",
  		marginTop:10,

	},

	
	titleDataGraph: {
		fontSize: 30,
		color: '#3366CC',
		bottom:10,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		fontWeight: "bold",
		marginTop:10,

  },





  	EditUser: {
    	width: '60%', 
    	height: 60, 
    	backgroundColor: '#FF9800', 
    	justifyContent: 'center', 
    	alignItems: 'center',
    	alignSelf: 'center',
    	position: 'absolute',
    	padding: 10,
    	fontSize: 20,
    	color: 'white',
    	fontWeight: "bold",
    	borderWidth: 1,
    	bottom:250,
    	borderRadius: 10,
    	borderColor: 'white',
    	fontWeight: "bold",
    	backgroundColor:'#3366CC',
    	textDecorationLine: 'underline',
      
	},
	
	containerDiaryPage: { 
		flex: 1, 
		padding: 16,
		paddingTop: 30,
		backgroundColor: '#fff' 
	},
	
	headDiaryPage: {
		height: 40,
		backgroundColor: '#27508a' 
	},
	
	textDiaryPage: { 
		textAlign: 'center', 
		fontWeight: '100', 
		margin: 10, 
		fontSize: 16
	},
	rowDiaryPage: {
		flexDirection: 'row', 
		backgroundColor: '#6a96d4'
	},
	btn: {
		width: 58,
		height: 18, 
		backgroundColor: '#6a96d4',  
		borderRadius: 2 
	},
	addBtn: {
		width: 40,
		height: 40,
		backgroundColor: '#6a96d4',  
		borderRadius: 2 
	},
	arrowBtn: { 
		width: 30, 
		height: 30, 
		backgroundColor: '#6a96d4',  
		borderRadius: 2 
	},
	
	btnText: {
		textAlign: 'center', 
		color: '#fff' 
	},
	buttonPos: {
	  	borderWidth: 1,
	  	borderRadius: 5,
	  	height: 20,
	  	width: 20,
	  	backgroundColor: '#6a96d4',
	  	alignItems: 'flex-end',
	  	justifyContent: 'center',
	  	alignSelf: 'flex-end',
		  marginRight: 20 
	},
	
	groupDiaryPage: {
	  	flexDirection: 'row',
	  	alignItems: 'center',
	  	justifyContent: 'center',
	  	paddingTop: 20,
		paddingBottom: 20
		
	},

	pickerStyle: {
		height: 30,
		width: 200
	},

	dialogStyle: {
		flexDirection: 'column',
		alignItems: 'center',
		// justifyContent: 'center',
		paddingTop: 20,
	  	paddingBottom: 20
	},

	groupDataGraphPage: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		// margin: 20,
	},
  });





/* BaseText component allows all base text to have the same look */
export class BaseText extends React.Component {
	render() {
		return (
			<Text style={[styles.baseText, this.props.style]} >{this.props.children}</Text>
	    );
	}
}

/* PersonalisedActivity component is used to show the personalised activities in the create and edit user screens */
export class PersonalisedActivity extends React.Component {
	render() {
		return (
			<View style={styles.newActivity}>
				<Text style={[{color: 'black', fontSize: 20}]} >{this.props.children}</Text>
			</View>
	    );
	}
}

/* ActivityDelete component is used to show the personalised activities in the create and edit user screens */
export class ActivityDelete extends React.Component {
	render() {
		return (
			<View style={styles.newActivity}>
				<Text style={[{color: 'black', fontSize: 20}]} >{this.props.children}</Text>
			</View>
	    );
	}
}

