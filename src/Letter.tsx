/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {useEffect, useState} from 'react'
import './App.css'
import './css/bootstrap.css'
import {Link} from "react-router-dom";
import {Navigate, useLocation} from "react-router";
import arrow_left from "./images/arrow_left.png";
import arrow_right from "./images/arrow_right.png";
import language from "./language";
import {
    AdminLetterApi,
    ImagesApi,
    type Letter,
    type LetterRequest,
    LettersApi,
    type MyLocation,
    type Person
} from "./generated-api";
import {apiConfig} from "./config.tsx";
import type {CommentFormProps} from "./interface/CommentFormProps.tsx";
import strings from "./strings.tsx";
import {isAdmin} from "./service/AuthenticationService.tsx";
import Util from "./service/Util.tsx";

const letterApi = new LettersApi(apiConfig)
const imageApi = new ImagesApi(apiConfig)
const adminLetterApi = new AdminLetterApi(apiConfig)

function Letter() {


    const [letter, setLetter] = useState<Letter>({})
    const [lettertext, setLettertext] = useState('')
    const [letterNumber, setLetterNumber] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [senders, setSenders] = useState<Person[]>([])
    const [recipients, setRecipients] = useState<Person[]>([])
    const [imageData, setImageData] = useState<string[]>([])
    const [sender_locations, setSender_locations] = useState<MyLocation[]>([])
    const [recipient_locations, setRecipient_locations] = useState<MyLocation[]>([])
    const [edit_letter, setEdit_letter] = useState(false)
    const [delete_letter, setDelete_letter] = useState(false)
    // const [goSearch, setGoSearch] = useState(false)
    // const [search_term, setSearch_term] = useState('')

    const location = useLocation()

    const params = location.pathname.split('/')
    const number = params[4]

    setLetterNumber(number)


    language()

    useEffect(() => {
        const request: LetterRequest = {
            'number': parseInt(number),
        }
        letterApi.getLetter(request).then((response) => {
            if (response.data.letter !== undefined) {
                setLetter(response.data.letter)
                if (response.data.letter.text?.text_string !== undefined) {
                    setLettertext(response.data.letter.text.text_string)
                }
                if (response.data.letter.senders !== undefined) {
                    setSenders(response.data.letter.senders)
                }
                if (response.data.letter.recipients !== undefined) {
                    setRecipients(response.data.letter.recipients)
                }
                if (response.data.letter.sender_location !== undefined) {
                    setSender_locations(response.data.letter.sender_location)
                }
                if (response.data.letter.recipient_location !== undefined) {
                    setRecipient_locations(response.data.letter.recipient_location)
                }
                getLetterImages(number);
            }

        }).catch((error) => {
            console.log(error)
        })
    })


    function toggleEditDone() {
        setShowEdit(false)
    }

    function editComment() {
        setShowEdit(true)
    }

    function editLetter() {
        setEdit_letter(true)
    }

    function deleteLetter() {
        setDelete_letter(true)
    }

    function forward() {
        next(letterNumber)
    }

    function back() {
        previous(letterNumber)
    }

    function next(number: string) {
        const request: LetterRequest = {
            'number': parseInt(number)
        }
        letterApi.getNextLetter(request).then((response) => {
            if (response.data.letter != null)
                setLetter(response.data.letter)
        }).catch((error) => {
            console.log(error)
        })
    }

    function previous(number: string) {
        const request: LetterRequest = {
            'number': parseInt(number)
        }
        letterApi.getPreviousLetter(request).then((response) => {
            if (response.data.letter != null) {
                setLetter(response.data.letter)
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    function getLetterImages(number: string) {

        const request = {
            'number': parseInt(number)
        }

        imageApi.getLetterImages(request).then((response) => {

            if (response.data.images != null && response.data.images.length > 0)
                setImageData(response.data.images)
        }).catch((error) => {
            console.log(error)
        })
    }

    // if (goSearch) {
    //     return <Navigate to={'/search_letters/' + search_term}/>
    // }

    let linkTo = '';
    let linkToEditText = '';

    const listItems = imageData.map((d) => (
        <div className='letter_image ml-4 mt-5'><img alt="original letter" src={`data:image/jpeg;base64,${d}`}/>
        </div>));
    const senderList = senders.map((s: Person) =>
        <span><Link to={`/get_person_details/${s.id}`}
                    className='linkStyle'>{s.nick_name} {s.tussenvoegsel} {s.last_name} </Link> </span>);
    const recipientList = recipients.map((r: Person) => <span><Link
        to={`/get_person_details/${r.id}`}
        className='linkStyle'>{r.nick_name} {r.tussenvoegsel} {r.last_name} </Link> </span>);

    const senderLocationList = sender_locations.map((s: MyLocation) => <span><Link
        to={`/get_location_details/${s.id}`} className='linkStyle'>{s.location_name} </Link> </span>);
    const recipientLocationList = recipient_locations.map((s: MyLocation) => <span><Link
        to={`/get_location_details/${s.id}`} className='linkStyle'>{s.location_name} </Link> </span>);

    if (letter != null) {
        linkTo = '/get_text/letter/' + letter.id;
        linkToEditText = '/edit_text/letter/' + letter.id;
    }

    if (edit_letter === true) {
        return <Navigate to={'/edit_letter/' + letter.number}/>
    }
    if (delete_letter === true) {
        return <Navigate to={'/delete_letter/' + letter.number}/>
    }

    return (

        <>
            <div className='container mt-3'>
                {
                    showEdit ? null : (

                        <div>
                            <div className="row">
                                <div className='col-sm-1'>
                                    <button type="button"
                                            className='btn btn-link'
                                            onClick={back}>
                                        <img src={arrow_left} alt="back"/>
                                    </button>
                                </div>
                                <div className='col-sm-3'>
                                    <div>
                                        {
                                            isAdmin() === "true" ?
                                                <button
                                                    className="btn btn-outline-success mybutton"
                                                    onClick={editComment}>
                                                    Edit commentaarregel
                                                </button> : null}
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div>
                                        {
                                            isAdmin() === "true" ?
                                                <button
                                                    className="btn btn-outline-warning mybutton ml-2"
                                                    onClick={editLetter}>
                                                    Edit afzender/ontvanger
                                                </button> : null}
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div>
                                        {
                                            isAdmin() === "true" ?
                                                <button
                                                    className="btn btn-outline-warning mybutton ml-2"
                                                    onClick={deleteLetter}>
                                                    Delete brief
                                                </button> : null}
                                    </div>
                                </div>
                                <div className='col-sm-1'>
                                    <button
                                        className="btn btn-link"
                                        onClick={forward}>
                                        <img src={arrow_right} alt="forward"/>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}

                <div>
                    {showEdit ?
                        <div>
                            <div>
                                <CommentForm
                                    letterNumber={letter.number}
                                    text={letter.remarks}
                                    date={letter.date}
                                    toggleEditDone={toggleEditDone}
                                    setLetter={setLetter}
                                />
                            </div>
                        </div> : null}
                </div>
                <div className='letter'>
                    <table>
                        <tbody>
                        <tr>
                            <td width="80">
                                <div>
                                    {strings.nummer}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {letter.number}
                                </div>
                            </td>
                        </tr>
                        {letter.collectie != null ?
                            <tr>
                                <td width="80">
                                    <div className='mb-3'>
                                        Collectie:
                                    </div>
                                </td>
                                <td colSpan={2}>
                                    {letter.collectie.name}
                                </td>
                            </tr>
                            : null
                        }
                        <tr>
                            <td>{strings.from}:</td>
                            <td>{senderList}</td>
                            <td>
                                <div className='ml-3'>{senderLocationList}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>{strings.to}:</td>
                            <td>{recipientList}</td>
                            <td>
                                <div className='ml-3'>{recipientLocationList}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>{strings.date}:</td>
                            <td>{letter.date}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className='letter'>
                    <div dangerouslySetInnerHTML={{__html: lettertext}}/>
                </div>
                <div className='textpage mt-5 ml-5'>
                    {letter.text != null && Util.isNotEmpty(letter.text.text_string) ?
                        <div>
                            {/* TODO: this needs to change when others than myself get access to data entry */}
                            <p>
                                {letter.text.text_string === undefined ? '' :
                                    <div dangerouslySetInnerHTML={{__html: letter.text.text_string.substring(0, 300)}}/>
                                }
                            </p>
                            {letter.text.text_string !== undefined && letter.text.text_string.length > 300 ?
                                <p>
                                    <Link to={linkTo} className='mt-5 mb-5'> Meer </Link>
                                </p>
                                : null}
                        </div> : null}
                    <div className='remark'>
                        {strings.remarks}
                    </div>

                </div>


                {isAdmin() === "true" ?
                    <div className='mb-5 mt-5 ml-5'>
                        <Link to={linkToEditText}>
                            Edit tekst
                        </Link>
                    </div>
                    : null}

                <div className='list_of_letters'>
                    {listItems}
                </div>
            </div>
        </>
    )
}


function CommentForm({letterNumber, text, date, toggleEditDone, setLetter}: CommentFormProps) {

    const [letter, _setLetter] = useState<Letter>({});
    const [_text, setText] = useState(text);
    const [_date, setDate] = useState(date);

    useEffect(() => {
        const request: LetterRequest = {
            number: letterNumber
        }
        letterApi.getLetter(request).then(() => {
            _setLetter(letter)
        }).catch((error) => {
            console.log(error)
        }).catch((error) => {
            console.log(error)
        })
    }, [])


    function handleChange(event: { target: { value: any; }; }) {
        setText(event.target.value);
    }

    function handleDateChange(event: { target: { value: any; }; }) {
        setDate(event.target.value);
    }

    function handleSubmit() {
        const request: LetterRequest = {comment: _text}
        adminLetterApi.updateLetterComment(request).then(response => {
            if (response.data.letter != null) {
                setLetter(response.data.letter)
            }
            toggleEditDone()
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="status"></label>
                <textarea
                    id="text"
                    value={_text}
                    className="form-control  mb-5"
                    onChange={handleChange}/>
                <label htmlFor="status">Datum</label>
                <input
                    type="text"
                    id="date"
                    value={_date}
                    className="form-control "
                    onChange={handleDateChange}/>
            </div>
            <input
                type="submit"
                className="btn btn-outline-success mybutton"
                value="Submit"
            />
        </form>
    );
}


export default Letter
