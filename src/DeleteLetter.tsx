/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {
    useEffect,
    useState,
} from 'react'
import './App.css'
import './css/bootstrap.css'
import {Navigate} from "react-router-dom";
import {useLocation, useNavigate} from "react-router";
import {
    AdminLetterApi,
    type Letter,
    type LetterRequest,
    LettersApi,
    type MyLocation,
    type Person
} from "./generated-api";
import {apiConfig} from "./config.tsx";
import type {JSX} from 'react/jsx-runtime';
import {isAdmin} from "./service/AuthenticationService.tsx";

const adminLetterApi = new AdminLetterApi(apiConfig)
const letterApi = new LettersApi(apiConfig)

function DeleteLetter() {

    const location = useLocation();
    const navigate = useNavigate()

    const params = location.pathname.split('/')
    const number = params[1]

    const [letter, setLetter] = useState<Letter>()
    const [senders, setSenders] = useState<Array<Person>>()
    const [recipients, setRecipients] = useState<Array<Person>>()
    const [sender_location, setSenderLocation] = useState<MyLocation>()
    const [recipient_location, setRecipientLocation] = useState<MyLocation>()
    const [recipientsString, setRecipientsString] = useState<string>()
    const [sendersString, setSendersString] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [deleted, setDeleted] = useState<boolean>(false)
    const [cancel, setCancel] = useState<boolean>(false)


    let postData: LetterRequest = {
        number: parseInt(number)
    };

    useEffect(() => {

            letterApi.getLetter(postData).then(response => {
                if (response.data.letter != null) {
                    setLetter(response.data.letter)
                    setSenders(response.data.letter.senders)
                    setRecipients(response.data.letter.recipients)
                    setSenderLocation(response.data.letter.sender_location[0])
                    setRecipientLocation(response.data.letter.recipient_location[0])
                    setRecipientsString(response.data.letter.recipients.map((r) => r.id).join(','))
                    setSendersString(response.data.letter.senders.map((r) => r.id).join(','))


                    let senderIdList: number[] = []
                    if (senders != null && senders.length > 0) {
                        senderIdList = senders.map((p) =>
                            p.id != undefined ? p.id : 0);
                    }
                    let senderIds = ''
                    let id
                    for (id in senderIdList) {
                        senderIds += senderIdList[id];
                    }

                    let recipientIdList: number[] = []
                    if (recipients != null && recipients.length > 0) {
                        recipientIdList = recipients.map((r) =>
                            r.id != undefined ? r.id : 0);
                    }
                    let recipientIds = ''
                    for (id in recipientIdList) {
                        recipientIds += recipientIdList[id];
                    }

                    setSendersString(senderIds)
                    setRecipientsString(recipientIds)
                }
            }).catch(error => {
                console.log(error)
            })
        }

        ,
        []
    )
    ;


    function _cancel() {
        setCancel(true)
    }

    function deleteLetter() {

        const postData = {
            letter: letter
        };

        adminLetterApi.deleteLetter(postData).then(() => {
            setDeleted(true)
        }).catch(error => {
            console.log(error)
            setErrorMessage(error)
        })


    }

    if (cancel === true && letter != null) {
        return <Navigate to={'/get_letter_details/' + letter.number + '/0'}></Navigate>
    }

    if (deleted === true) {
        navigate('get-letters')
    }

    const date = letter != null ? letter.date : '';

    let senderList: JSX.Element[] = []
    if (senders != null) {
        senderList = senders.map((r) => <span>
                {r.nick_name} {r.tussenvoegsel} {r.last_name} </span>);
    } else {
        senderList = [];
    }

    let recipientList: JSX.Element[] = []
    if (recipients != null) {
        recipientList = recipients.map((r) => <span>
                {r.nick_name} {r.tussenvoegsel} {r.last_name} </span>);
    } else {
        recipientList = [];
    }



    const errorM = errorMessage;

    return (
        <div>
            <div>
                {errorM != null ?
                    <div className="mb-5">
                        <div>{errorMessage}</div>
                    </div> : null}

                <div>
                    <h3>Brief nummer {number} </h3>

                    <div className='form-group mt-5'>
                        <table width="600px">
                            <tbody>
                            <tr>
                                <td width="150px">
                                    <div className='mb-5'>
                                        Datum:
                                    </div>
                                </td>
                                <td>
                                    {date}
                                </td>
                            </tr>
                            <tr>
                                <td width="150px">
                                    Afzender:
                                </td>
                                <td>
                                    {senderList} in {sender_location != null ?   sender_location.name : ''}
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='form-group mt-5'>
                        <table width="600px">
                            <tbody>
                            <tr>
                                <td width="150px">
                                    Ontvanger
                                </td>
                                <td>
                                    {recipientList} in {recipient_location != null ? recipient_location.name : ''}
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <td width="10">
                        <div className="mt-5">
                            {
                                isAdmin() === "true" ?
                                    <button
                                        className="btn btn-outline-success mybutton"
                                        onClick={_cancel}>
                                        Cancel
                                    </button> : null}
                        </div>
                    </td>
                    <td width="1000">
                        <div className="mt-5 ml-5">
                            {
                                isAdmin() === "true" ?
                                    <button
                                        className="btn btn-outline-warning mybutton ml-2"
                                        onClick={deleteLetter}>
                                        Delete
                                    </button> : null}
                        </div>
                    </td>

                </div>
            </div>
        </div>
    )
}


export default DeleteLetter
