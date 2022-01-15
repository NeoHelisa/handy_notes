import "./notesHandler.css";
import React, { useState, useReducer } from 'react';
import nextId from "react-id-generator";


const noteStateInitial = {
    lastNote: null,
    numbOfNotes: 0,
    notes_content: [],
};

const noteReducer = (prevState, action) => {
    switch(action.type) {
        case 'NEW_NOTE' : {
            const newNoteState = {
            numbOfNotes: prevState.notes_content.length + 1,
            notes_content: [...prevState.notes_content, action.payload]
        };
        return newNoteState;
        }
        case 'DEL_NOTE' : {
            const newNoteState = {
                ...prevState,
                numbOfNotes: prevState.notes_content.length -1,
                notes_content: prevState.notes_content.filter(note => note.id !== action.payload.id)
            }
            return newNoteState;
        }
    }
}
const Notes = () => {

    const [noteContent, setNoteContent] = useState('');
    const [noteState, dispatch] = useReducer(noteReducer, noteStateInitial)
    const newNote = event =>{
        event.preventDefault();

        if(!noteContent){
            return;
        }
        const addNote = {
            id: nextId(),
            text: noteContent,
            rotate: Math.floor(Math.random() * 25),
        }
        dispatch( {type: 'NEW_NOTE', payload: addNote});
    }

    const noteDrag = event =>
    {
        event.target.style.left = `${event.pageX - 75}px`;
        event.target.style.top = `${event.pageY - 75}px`;
    }
    
    const clearNotes = event =>
    {
        {noteState.notes_content.map(note => (
        () => dispatch({type: "DEL_NOTE", payload: note})
        ))}
    }

    return ( 
    <>
        <div className="noteCreator">
            <form className="notesHandler-form">
                <textarea 
                id="texarea_form"
                value={noteContent} 
                placeholder="Add new note.."
                onChange={event => setNoteContent(event.target.value)}
                ></textarea>
                <button className="add_btn" onClick={newNote}>ADD</button>      
                <button className="clr_btn" onClick={clearNotes}>CLR </button>
            </form>  
            
            </div>
            {noteState.notes_content.map(note => (
                <div className="note"
                style={{transform:`rotate(${note.rotate}deg)`}}
                draggable="true"
                onDrag={noteDrag}
                key={note.id}>

                    <div onClick={() => dispatch({type: "DEL_NOTE", payload: note})} className="deleteBttn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <pre className="text">{note.text}</pre>
                </div>
            ))}
            </>   
         )
};

export default Notes;
