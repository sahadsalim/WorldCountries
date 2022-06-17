
const login=(item)=>{
    return{
    type: "LOGIN",
    payload : item,
    };
};
const signup=(item)=>{
    return{
    type: "SIGN_UP",
    payload : item,
    };
};
const updateData=(item)=>{
    return{
        type:"UPDATE_DATA",
        payload:item
    }
}
const setCountry=(item)=>{
    return{
        type: "SET_COUNTRY",
        payload:item
    };
};
const getCountryList=(item)=>{
    return{
        type:"GET_COUNTRY_LIST",
        payload:item
    }
}
const setFavorite=(item)=>{
    return{
        type:'SET_FAVORITE',
        payload:item
    }
}
const signOut=(item)=>{
    return{
        type:'SIGN_OUT',
        payload:item
    }
}
const deleteUser=(item)=>{
    return{
        type:"DELETE_USER",
        payload:item
    }
}
export {login,signup,signOut,setCountry,getCountryList,setFavorite,updateData,deleteUser};
