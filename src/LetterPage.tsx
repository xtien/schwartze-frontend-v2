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
import {apiConfig} from "./service/AuthenticationService.tsx";
import type {CommentFormProps} from "./interface/CommentFormProps.tsx";
import strings from "./strings.tsx";
import {isAdmin} from "./service/AuthenticationService.tsx";
import Util from "./service/Util.tsx";

const letterApi = new LettersApi(apiConfig)
const imageApi = new ImagesApi(apiConfig)
const adminLetterApi = new AdminLetterApi(apiConfig)

function LetterPage() {
    const location = useLocation()
    const params = location.pathname.substring(1).split('/')
    const number = params[1]

    const [letter, setLetter] = useState<Letter>({
        collectie: undefined,
        comment: "",
        date: "",
        id: 0,
        localDate: "",
        number: 0,
        senders: [],
        recipients: [],
        recipient_locations: [],
        sender_locations: [],
        remarks: "",
        text: undefined
    })
    const [letterText, setLetterText] = useState<string>()
    const [showEdit, setShowEdit] = useState(false)
    const [imageData, setImageData] = useState<string[]>([])
    const [edit_letter, setEdit_letter] = useState(false)
    const [delete_letter, setDelete_letter] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState<string>()
    // const [goSearch, setGoSearch] = useState(false)
    // const [search_term, setSearch_term] = useState('')

    const lang: string = language()

    useEffect(() => {
        const request: LetterRequest = {
            'number': parseInt(number),
            'language' : lang
        }
        letterApi.getLetter(request).then((response) => {
            if (response.data.letter !== undefined) {
                setLetter(response.data.letter)
                setLetterText(response.data.lettertext)
                getLetterImages(number);
            }

        }).catch((error) => {
            console.log(error)
            setShowError(true)
            setError(error.toString())
        })
    }, [])

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
        next()
    }

    function back() {
        previous()
    }

    function next() {
        const request: LetterRequest = {
            'number': letter.number
        }
        letterApi.getNextLetter(request).then((response) => {
            if (response.data.letter != null) {
                setLetter(response.data.letter)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function previous() {
        const request: LetterRequest = {
            'number': letter.number
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
    const senderList = letter.senders.map((s: Person) =>
        <span><Link to={`/get_person_details/${s.id}`}
                    className='linkStyle'>{s.nick_name} {s.tussenvoegsel} {s.last_name} </Link> </span>);
    const recipientList = letter.recipients.map((r: Person) => <span><Link
        to={`/get_person_details/${r.id}`}
        className='linkStyle'>{r.nick_name} {r.tussenvoegsel} {r.last_name} </Link> </span>);

    const senderLocationList = letter.sender_locations.map((s: MyLocation) => <span><Link
        to={`/get_location_details/${s.id}`} className='linkStyle'>{s.location_name} </Link> </span>);
    const recipientLocationList = letter.recipient_locations.map((s: MyLocation) => <span><Link
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
                    error != null && showError ?
                        <div className='alert alert-danger' role='alert'></div>
                        : null
                }

                { showEdit ? null : (

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
                                                    {strings.editCommentLine}
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
                                                    {strings.editsenderRecipient}
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
                                                    {strings.deleteLetter}
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
                                    letter={letter}
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
                                        {strings.collection}
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
                    {letterText != null && letterText != null ?
                        <div
                            dangerouslySetInnerHTML={{__html: letterText != null && letterText != null ? letterText : ''}}/>
                        : null}
                    <div className='textpage mt-5 ml-5'>
                        {letter.text != null && Util.isNotEmpty(letter.text.text_string) ?
                            <div>
                                {/* TODO: this needs to change when others than myself get access to data entry */}

                                {letter.text.text_string === undefined ? '' :
                                    <div
                                        dangerouslySetInnerHTML={{__html: letter.text.text_string.substring(0, 300)}}/>
                                }

                                {letter.text.text_string !== undefined && letter.text.text_string.length > 300 ?
                                    <p>
                                        <Link to={linkTo} className='mt-5 mb-5'> {strings.meer} </Link>
                                    </p>
                                    : null}
                            </div> : null}
                        <div className='remark'>
                            {letter.comment}
                        </div>
                    </div>


                    {isAdmin() === "true" ?
                        <div className='mb-5 mt-5 ml-5'>
                            <Link to={linkToEditText}>
                                {strings.editText}
                            </Link>
                        </div>
                        : null}

                    <div className='list_of_letters'>
                        {listItems}
                    </div>
                </div>
            </div>
        </>
    )

    function CommentForm({letter, toggleEditDone, setLetter}: CommentFormProps) {

        const [text, setText] = useState(letter.text != null ? letter.text.text_string : '');
        const [date, setDate] = useState(letter.date);

        function handleChange(event: { target: { value: string; }; }) {
            setText(event.target.value);
        }

        function handleDateChange(event: { target: { value: string; }; }) {
            setDate(event.target.value);
        }

        function handleSubmit() {
            const request: LetterRequest =
                {
                    comment: text,
                    date: date, number: letter.number,
                }

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
                        value={text}
                        className="form-control  mb-5"
                        onChange={handleChange}/>
                    <label htmlFor="status">Datum</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
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
}

export default LetterPage
