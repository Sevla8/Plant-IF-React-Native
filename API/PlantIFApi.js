// const URL="http://192.168.137.243:8080/SMARTweb/ActionServlet"
const URL="http://10.0.2.2:8080/SMARTweb/ActionServlet"

export function addPlant(plantInfos){
    console.log("Add a plant with API")
    const data=JSON.stringify(plantInfos)
    console.log("data sent",data)
    return fetch(URL,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type':'application/json',
                },
            }
        )
        .then((response)=>response.json())
        .catch((error)=>console.error(error))
}

export function registerUser(userInfos){
    // userInfos={
    //     todo: "newUser",
    //     mail: "@mail3",
    //     password: "fieldPassword2",
    //     address: "fieldAddress2", 
    //     name: "fieldName2"
    // }
    console.log("Register a user with API")
    const data=JSON.stringify(userInfos)
    console.log("data sent",data)
    return fetch(URL,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type':'application/json',
                },
            }
        )
        .then((response)=>response.json())
        .catch((error)=>console.error(error))
}

export function modifyUser(userName,mail,newPassword,currentPassword){
    console.log("Mofify with the API")
    const data=JSON.stringify({
        todo: "modifyUser",
        mail: login,
        userName: userName,
        newPassword: newPassword,
        currentPassword: currentPassword
    })
    console.log("data sent",data)
    return fetch(URL,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type':'application/json',
                },
            }
        )
        .then((response)=>response.json())
        .catch((error)=>console.error(error))
}

export function getUser(mail){
    console.log("Mofify with the API")
    const data=JSON.stringify({
        todo: "getUser",
        mail: mail
    })
    console.log("data sent",data)
    return fetch(URL,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type':'application/json',
                },
            }
        )
        .then((response)=>response.json())
        .catch((error)=>console.error(error))
}


export function signInUser(login,password){
    console.log("Sign in with the API")
    const data=JSON.stringify({
        todo: "authenticate",
        mail: login,
        password: password
    })
    console.log("data sent",data)
    return fetch(URL,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type':'application/json',
                },
            }
        )
        .then((response)=>response.json())
        .catch((error)=>console.error(error))
}

export function testApi(){
    console.log("Test Plant if API")

    const url=URL//+"?todo=getPlant&arduinoNumber=1002105"
    const data=JSON.stringify({
        todo: 'newPlant',
        arduinoNumber: '12346'
    })
    return fetch(url,
        {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>console.log(response.status))
    .catch((error)=>console.error(error))

}

export function getPlant(idPlant){
    console.log("Get plant info the API")
    const data=JSON.stringify({
        todo: "getPlant",
        plantId: idPlant
    })
    console.log("data sent",data)
    return fetch(URL,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type':'application/json',
                },
            }
        )
        .then((response)=>response.json())
        .catch((error)=>console.error(error))
}

export function reportDeadPlant(idPlant){
    console.log("Report dead plant to the API")
    const data=JSON.stringify({
        todo: "reportDeadPlant",
        plantId: idPlant
    })
    console.log("data sent",data)
    return fetch(URL,
            {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type':'application/json',
                },
            }
        )
        .then((response)=>response.json())
        .catch((error)=>console.error(error))
    
}

export function getProfilePlant(idPlant){
    return fetch("https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=fd297d03-bf72-40c7-b27e-24cc7023360c",
        // {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type':'application/json',
        //     },
        // }
    )
    .then((response)=> ({
            customizeName:"myPlant",
            deviceId: '100205',
            address: '73 bd des provinces',
            zip: '69110',
            city: 'ste foy',
            visibility: true,
            creationDate: '04/05/2022'
        })
    )
    .catch((error)=>console.error(error))
}

export function getNeedsPlant(idPlant){
    return fetch("https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=fd297d03-bf72-40c7-b27e-24cc7023360c",
        // {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type':'application/json',
        //     },
        // }
    )
    .then((response)=> ({
            commonName: "common Name 123",
            botanicalName: 'botanical Name',
            maintenance: 'low'
        })
    )
    .catch((error)=>console.error(error))
}


export function addImageToPlant(urn,idPlant){
    // console.log(urn)
    console.log("Add image to plant")
    var img=urn.assets[0]
    var type=img.type
    type=type.split('/')[1]
    const data=JSON.stringify({
        todo: 'addImage',
        plantId: idPlant,
        type: img.type,
        image: img.base64
    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))
}

export function getPlantImage(idPlant){
    console.log("Get image of a plant")
    const data=JSON.stringify({
        todo: 'getImage',
        plantId: idPlant,
    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))
}

export function getLatestPlantImage(idPlant){
    console.log("Get Latest image of a plant")
    const data=JSON.stringify({
        todo: 'getLatestImage',
        plantId: idPlant,
    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))
}

export function getVisiblePlants(){
    console.log("Get visible plants")
    const data=JSON.stringify({
        todo: 'listVisiblePlants',
    })
     const url=URL
     return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
     )
     .then((response)=>response.json())
     .catch((error)=>console.error(error))


    /*var res = Math.random();
    if (res <= 0.5){
        res=0
    }else{
        res= 1
    }
    return res;*/
    markers = [
         {
           key: "Hi",
           latlng:  {
                latitude: 37.6,
                longitude: -122,
                latituteDelta: 0.01,
                longitudeDelta: 0.01
           },
           title: "Mayarachide",
           type_plante: "Orchid??e",
           photo: "../assets/plante.jpg",
           humeur: "Happy",
           isAlive: "yes"
         },
         {
            key: "Hii",
            latlng:  {
                latitude: 37.8,
                longitude: -122,
                latituteDelta: 0.02,
                longitudeDelta: 0.01
            },
            title: "Benoit le renoi",
            type_plante: "Orchid??e",
            photo: '../assets/fleur.jpg',
            humeur: "Dead",
            isAlive: "no"
         },
         {
           key: "Hiii",
           latlng:  {
                latitude: 45.771944,
                longitude: 4.8,
                latituteDelta: 0.01,
                longitudeDelta: 0.01
           },
            title: "Hello",
            type_plante: "Rose rouge",
            photo: "../assets/plant.jpg",
            humeur: "Sad",
            isAlive: "yes"
         },
       ]
    return (markers);
}

export function getPlantConstantGlobal(idPlant,date){
    console.log("Get plant constant global")
    const data=JSON.stringify({
        todo: 'meanGlobal',
        idPlant: idPlant,
        date: date

    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))
}

export function getPlantConstantWater(idPlant,date){
    console.log("Get plant constant water")
    const data=JSON.stringify({
        todo: 'meanWater',
        idPlant: idPlant,
        date: date

    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))
}

export function getPlantConstantLight(idPlant,date){
    console.log("Get plant constant light")
    const data=JSON.stringify({
        todo: 'meanLight',
        idPlant: idPlant,
        date: date

    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))
}

export function getPlantConstantTemperature(idPlant,date){
    console.log("Get plant constant light")
    const data=JSON.stringify({
        todo: 'meanTemp',
        idPlant: idPlant,
        date: date

    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))
}

export function getAllAlivePlants(){
    console.log("Get plants alive")
    const data=JSON.stringify({
        todo: 'listAlivePlants',
    })
    // console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))

}

export function getAllDeadPlants(){
    console.log("Get plant dead")
    const data=JSON.stringify({
        todo: 'listDeadPlants',
    })
    console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))

}

export function getAlerts(){
    console.log("Get alerts ")
    const data=JSON.stringify({
        todo: 'getAlert',
    })
    console.log(data)
    const url=URL
    return fetch(
        url,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type':'application/json',
            },
        }
    )
    .then((response)=>response.json())
    .catch((error)=>console.error(error))

}