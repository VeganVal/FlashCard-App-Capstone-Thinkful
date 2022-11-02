import CardForm from "./CardForm"
import React, {useState, useEffect} from "react"; 
import { readDeck, createCard } from "../../utils/api";
import {useParams, useHistory } from "react-router-dom";

function AddCard(){

const [deck, setDeck] = useState({});

const [ formInfo, setFormInfo ]= useState({
    front:"",
    back:""
})

const {deckId} = useParams();


const changeHandler = (e) => {
    console.log(e.target.name, e.target.value )
    setFormInfo({
      ...formInfo, //spread operator, adds alll the properties
      [e.target.name]: e.target.value,
    });
  };

useEffect(()=> {
   const abortController = new AbortController();
   readDeck(deckId, abortController.signal).then(setDeck);
   return () => abortController.abort()
}, [deckId])
 
const history = useHistory();
const onClick = () => {
    history.push(`/decks/${deck.id}`);
}

const handleSubmit = (e) => {
   e.preventDefault();
   createCard(deckId, formInfo )
   setFormInfo(formInfo) // this doesn't make the page rerender, ask TA
   history.go(0)//other way: refresh the page, 1 makes you go forward
}


console.log(deck)
 return (
    <CardForm
    deckName= {`${deck.name} :`}
    title="Add Card!"
    buttonText1="Done"
    buttonText2="Save"
    handleSubmit={handleSubmit}
    formInfo={formInfo}
    setFormInfo={setFormInfo}
    changeHandler={changeHandler}
    onClick={onClick}
    />
 )

 }


export default AddCard;