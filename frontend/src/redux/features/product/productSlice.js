import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productSlice = createSlice({
    name:"product_info",
    initialState:{
        baseurl: "/api/books/getall?",
        senturl: "/api/books/getall?",
        filter:{
            sort: null,
            genre:[]
        },
        pagination:{
            currpage:1,
            maxpage:null
        },
        books:[],
    },
    reducers:{
        updategenre:(state,action)=>{// take array of filters 
            //take state genre, append action.payload and new filter
            console.log(action.payload)
            state.filter.genre= action.payload
        },
        removegenre:(state,action)=>{// take a filter
            //take state genre, find and remove payload filter from state genre
            state.filter.genre = state.filter.genre.filter(genre => genre !== action.payload)  
        },
        updatesort:(state,action)=>{// take a sort tag
            //update state sort tag
            state.filter.sort = action.payload;
        },
        nextpage:(state,action)=>{
            //check current state current page, if < max page
            //update current state page ++
            state.pagination.currpage += 1;
        },
        prevpage:(state,action)=>{
            //check current state current page, if > 1
            //update current state page --
            state.pagination.currpage -= 1;
        },
        resetpage:(state,action)=>{
            // update current state page =1
            state.pagination.currpage = 1;
        },
        setbooks:(state,action)=>{
            //action payload = books[]
            // return {...state,books: action.payload}
            state.books = action.payload;
        },
        setmaxpage:(state,action)=>{
            // const{pagination}=state
            // pagination. maxpage=action.payload
            // return {...state,pagination:pagination}
            state.pagination.maxpage = action.payload;
        },
        setsenturl:(state,action)=>{
            state.senturl=`${action.payload}`
        }
    }
})

export function load(url){
    return async function loadbyThunk(dispatch,getState){
        const response = await axios.get(`${url}`)
        dispatch(setbooks(response.data.books))
        dispatch(setmaxpage(response.data.pagination.totalPages))
        console.log(response)
    }
}

export function nextpageasync (){
    return async function nextpagebyThunk(dispatch,getState){
        const {  pagination, senturl  } = await getState().product;
        const { currpage } = pagination;
        if (currpage < pagination.maxpage){
            await dispatch(nextpage())
            const url = `${senturl}&p=${currpage+1}`
            const rep = await dispatch(load(url))
            console.log(rep)
        }        
    }
}
export function prevpageasync (){
    return async function prevpagebyThunk(dispatch,getState){
        const {  pagination, senturl } = await getState().product;
        const { currpage } = pagination;
        if (currpage >1){
            await dispatch(prevpage())
            const url = `${senturl}&p=${currpage-1}`
            const rep = await dispatch(load(url))
            console.log(rep)
        }    
    }
}

export function changeFilter(){
    return async function changeFilterbyThunk(dispatch,getState){
        
        const {  filter:{genre,sort},baseurl  } = await getState().product;
        let theloai="&genre="
        for(let i =0;i<genre.length;i++){
            if(!genre[i]){
                continue;
            }
            if(i===genre.length-1){
                theloai+= encodeURIComponent(genre[i]) 
            }else{
                theloai+=(encodeURIComponent(genre[i])+',')
            }
        }
        let newurl=baseurl+theloai
        if(sort){
            let sapxep=`&sortBy=${sort}`
            newurl+=sapxep
        }
        dispatch(setsenturl(newurl))
        await dispatch(load(newurl))
        dispatch(resetpage())
    }
}

export function updategenreasync (newgenre){ // get array of filters
    return async function addgenrebyThunk(dispatch,getState){
        await dispatch(updategenre(newgenre))
        dispatch(changeFilter())
    }
}

export function updatesortasync (sorttag){
    return async function updatesortbyThunk(dispatch,getState){
        if(sorttag==="default"){
            await dispatch(updatesort(null))
            dispatch(changeFilter())
        }else{
            await dispatch(updatesort(sorttag))
        dispatch(changeFilter())
        }
        
    }
}

export const { updategenre,removegenre,updatesort,nextpage,prevpage,resetpage,setbooks,setmaxpage,setsenturl } = productSlice.actions;

export default productSlice.reducer;


export function initialload (){
    return async function initialloadbyThunk(dispatch,getState){
        const url = "/api/books/getall?"
        console.log(url)
        try{await dispatch(load(url))}
        catch(error){
            console.log(error)
        }
    }
}

