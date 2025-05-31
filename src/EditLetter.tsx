/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, {Component, useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import './css/bootstrap.css'
import AuthenticationService from '../../schwartze-new-frontend/schwartze-frontend/src/service/AuthenticationService';
import {Navigate, useLocation} from "react-router";
import {AdminLetterApi, type Letter, type MyLocation, type Person} from "./generated-api";
import {apiConfig} from "./config.tsx";

const letterApi = new AdminLetterApi(apiConfig)

function EditLetter() {

    const location = useLocation()
    const params = location.pathname.split('/')
    const number = params[2]

    const [letter, setLetter] = useState<Letter>()
    const [senders, setSenders] = useState<Array<Person>>()
    const [recipients, setRecipients] = useState<Array<Person>>()
    const [sender_location, setSenderLocation] = useState<MyLocation>()
    const [recipient_location, setRecipientLocation] = useState<MyLocation>()
    const [recipientsString, setRecipientsString] = useState<string>()
    const [sendersString, setSendersString] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [editDone, setEditDone] = useState<boolean>(false)


    useEffect(() => {
        let postData = {
            number: number
        };

        letterApi.updateLetter(postData).then(response => {
            if (response.data.letter != null) {
                setLetter(response.data.letter)
                setSenders(response.data.letter.senders)
                setRecipients(response.data.letter.recipients)
                setSenderLocation(response.data.letter.sender_location[0])
                setRecipientLocation(response.data.letter.recipient_location[0])
                setRecipientsString(response.data.letter.recipients.map((r) => r.id).join(','))
                setSendersString(response.data.letter.senders.map((r) => r.id).join(','))
            }
        })

    }, []);


    function handleSenderId(event: { target: { value: string; }; }) {
        setSendersString(event.target.value)
    }

    function handleSenderLocation(event: { target: { value: MyLocation; }; }) {
        setSenderLocation(event.target.value)

    }

    function handleRecipientId(event: { target: { value: string; }; }) {
        const value = event.target.value;

        this.setState(prevState => ({
            recipientsString: value
        }))
    }

    function handleRecipientLocation(event: { target: { value: MyLocation; }; }) {
        const value = event.target.value;
        this.setState(prevState => ({
            recipient_location: {
                ...prevState.recipient_location,
                id: value
            }
        }))
    }

    function handleDate(event) {
        const value = event.target.value;
        this.setState(prevState => ({
            letter: {
                ...prevState.letter,
                date: value
            }
        }))
    }

    function handleSubmit(event) {

        let x
        let sendersList = []
        let splitSenders = sendersString.replace(/ /g, '').replace(/(^,)|(,$)/g, "").split(',')
        for (x in splitSenders) {
            sendersList.push(
                {
                    id: splitSenders[x]
                }
            )
        }
        let y
        let recipientList = []
        let splitRecipients = recipientsString.replace(' ', '').replace(/(^,)|(,$)/g, '').split(',')
        for (y in splitRecipients) {
            recipientList.push(
                {
                    id: splitRecipients[y]
                }
            )
        }

        let updated_letter = letter;
        updated_letter.senders = sendersList;
        updated_letter.recipients = recipientList;
        updated_letter.sender_location = [sender_location];
        updated_letter.recipient_location = [recipient_location];

        let postData = {
            letter: updated_letter
        };

        letterApi.updateLetter(postData).then(response => {
            if (response.data.letter != null) {
                setLetter(response.data.letter)
                setSenders(response.data.letter.senders)
                setRecipients(response.data.letter.recipients)
                setSenderLocation(response.data.letter.sender_location[0])
                setRecipientLocation(response.data.letter.recipient_location[0])
                setRecipientsString(response.data.letter.recipients.map((r) => r.id).join(','))
                setSendersString(response.data.letter.senders.map((r) => r.id).join(','))
            }
        })


    }

    if (editDone === true && letter != null) {
        return <Navigate to={'/get_letter_details/' + letter.number + '/0'}></Navigate>
    }

    const date = letter != null ? letter.date : '';

    let senderList = []
    if (this.state != null && senders != null) {
        senderList = senders.map((r) => <span>
                {r.nick_name} {r.tussenvoegsel} {r.last_name} </span>);
    } else {
        senderList = '';
    }


    let recipientList = []
    if (this.state != null && recipients != null) {
        recipientList = recipients.map((r) => <span>
                {r.nick_name} {r.tussenvoegsel} {r.last_name} </span>);
    } else {
        recipientList = '';
    }

    return (
        <div>
            <div>
                {errorMessage != null ?
                    <div className="mb-5">
                        <div>{errorMessage}</div>
                    </div> : null}

                <div>
                    <h3>Brief nummer {number} </h3>

                    <form onSubmit={handleSubmit}>
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
                                        <input
                                            type="text"
                                            className='form-control  mt-1 w-25 mb-5'
                                            id="sender.id"
                                            value={date}
                                            onChange={handleDate}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td width="150px">
                                        Afzender:
                                    </td>
                                    <td>
                                        {senderList} in {sender_location != null ? sender_location.name : ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className='mr-3' htmlFor="status">Persoon id</label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className='form-control  mt-1 w-25'
                                            id="senderId"
                                            value={sendersString}
                                            onChange={handleSenderId}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="status">Locatie id</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            className='form-control  mt-1 w-25'
                                            id="sender_location.id"
                                            value={sender_location != null ? sender_location.id : ''}
                                            onChange={handleSenderLocation}
                                        />
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
                                <tr>
                                    <td><label htmlFor="status">Persoon id</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            className='form-control  mt-1 w-25'
                                            id="recipientid"
                                            value={recipientsString}
                                            onChange={handleRecipientId}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="status">Locatie id</label></td>
                                    <td>
                                        <input
                                            type="text"
                                            className='form-control  mt-1 w-25'
                                            id="recipient_location.id"
                                            value={recipient_location != null ? recipient_location.id : ''}
                                            onChange={handleRecipientLocation}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <input
                            type="submit"
                            className="btn btn-outline-success mybutton"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}


export default EditLetter
