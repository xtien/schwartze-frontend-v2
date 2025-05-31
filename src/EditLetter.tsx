/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {useEffect, useState} from 'react'
import './App.css'
import './css/bootstrap.css'
import {Navigate, useLocation, useNavigate} from "react-router";
import {
    AdminLetterApi, AdminLocationApi,
    AdminPersonApi,
    type Letter,
    type LetterRequest, type LocationsRequest,
    type MyLocation, type PeopleRequest,
    type Person
} from "./generated-api";
import {apiConfig} from "./config.tsx";

const letterApi = new AdminLetterApi(apiConfig)
const adminLocationApi = new AdminLocationApi(apiConfig)
const adminPersonApi = new AdminPersonApi(apiConfig)

function EditLetter() {

    const location = useLocation()
    const params = location.pathname.split('/')
    const number = params[2]
    const navigate = useNavigate()

    const [letter, setLetter] = useState<Letter>()
    const [senders, setSenders] = useState<Array<Person>>()
    const [recipients, setRecipients] = useState<Array<Person>>()
    const [senderLocations, setSenderLocations] = useState<Array<MyLocation>>()
    const [recipientLocations, setRecipientLocations] = useState<Array<MyLocation>>()
    const [senderLocationId, setSenderLocationId] = useState<number>()
    const [recipientLocationId, setRecipientLocationId] = useState<number>()
    const [recipientsString, setRecipientsString] = useState<string>()
    const [sendersString, setSendersString] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [editDone, setEditDone] = useState<boolean>(false)
    const [date, setDate] = useState<string>()

    useEffect(() => {
        let postData: LetterRequest = {
            number: parseInt(number)
        };

        letterApi.updateLetter(postData).then(response => {
            if (response.data.letter != null) {
                setLetter(response.data.letter)
                setDate(response.data.letter.date)
                setSenders(response.data.letter.senders)
                setRecipients(response.data.letter.recipients)
                setSenderLocationId(response.data.letter.sender_location[0].id)
                setRecipientLocationId(response.data.letter.recipient_location[0].id)
                setRecipientsString(response.data.letter.recipients.map((r) => r.id).join(','))
                setSendersString(response.data.letter.senders.map((r) => r.id).join(','))
            }
        })

    }, []);

    function getPeopleFromIdsString(idsString: string, func: (people: Array<Person>) => void) {
        const ids = idsString.replace(' ', '').split(',')
        const numbers = ids.map((id) => parseInt(id))
        const request: PeopleRequest = {
            ids: numbers
        }
        adminPersonApi.getPersonsForIds(request).then(response => {
            if (response.data.people != null) {
                func(response.data.people)
            }
        })
    }

    function getLocationsFromIdsString(idsString: string, func: (location: Array<MyLocation>) => void) {
        const ids = idsString.replace(' ', '').split(',')
        const numbers = ids.map((id) => parseInt(id))
        const request: LocationsRequest = {
            ids: numbers
        }
        adminLocationApi.getLocationsForIds(request).then(response => {
            if (response.data.locations != null) {
                func(response.data.locations)
            }
        })
    }

    function handleSenderIds(event: { target: { value: string; }; }) {
        getPeopleFromIdsString(event.target.value, setRecipients)
    }

    function handleSenderLocationIds(event: { target: { value: string; }; }) {
        getLocationsFromIdsString(event.target.value,setSenderLocations)
    }


    function handleRecipientIds(event: { target: { value: string; }; }) {
        getPeopleFromIdsString(event.target.value, setSenders)
    }

    function handleRecipientLocationId(event: { target: { value: string; }; }) {
        getLocationsFromIdsString(event.target.value ,setRecipientLocations)
    }

    function handleDate(event: { target: { value: string; }; }) {
        setDate(event.target.value);
    }

    function handleSubmit() {

        if (letter != null) {
            let updated_letter = letter;
            if (senders != null) {
                updated_letter.senders = senders;
            }
            if (recipients != null) {
                updated_letter.recipients = recipients;
            }
            if(senderLocations != null) {
                updated_letter.sender_location = senderLocations;
            }
            if(recipientLocations != null) {
                updated_letter.recipient_location = recipientLocations;
            }

            let postData = {
                letter: updated_letter
            };

            letterApi.updateLetter(postData).then(response => {
                if (response.data.letter != null) {
                    setLetter(response.data.letter)
                    setSenders(response.data.letter.senders)
                    setRecipients(response.data.letter.recipients)
                    setSenderLocationId(response.data.letter.sender_location[0].id)
                    setRecipientLocationId(response.data.letter.recipient_location[0].id)
                    setRecipientsString(response.data.letter.recipients.map((r) => r.id).join(','))
                    setSendersString(response.data.letter.senders.map((r) => r.id).join(','))
                }
                setEditDone(true)
            }).catch(error => {
                console.log(error)
                setErrorMessage(error)
            })
        }

    }

    if (editDone === true && letter != null) {
        return <Navigate to={'/get_letter_details/' + letter.number + '/0'}></Navigate>
    }

    let senderListString = ''
    if (senders != null) {
        for (var s of senders) {
            senderListString += s.nick_name + ' ' + s.tussenvoegsel + ' ' + s.last_name + ', ';
        }
    }


    let recipientListString = ''
    if (recipients != null) {
        for (var r of recipients) {
            recipientListString += r.nick_name + ' ' + r.tussenvoegsel + ' ' + r.last_name + ', ';
        }
    }

    function cancel() {
        navigate('get_letter_details/' + number + '/0')
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
                                        {senderListString} in {senderLocationId != null ? senderLocationId.toString() : ''}
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
                                            onChange={handleSenderIds}
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
                                            value={senderLocationId != null ? senderLocationId.toString() : ''}
                                            onChange={handleSenderLocationIds}
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
                                        {recipientListString} in {recipientLocationId != null ? recipientLocationId.toString() : ''}
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
                                            onChange={handleRecipientIds}
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
                                            value={recipientLocationId != null ? recipientLocationId.toString() : ''}
                                            onChange={handleRecipientLocationId}
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
                        <input
                            type="submit"
                            className="btn btn-outline-info mybutton"
                            value="Cancel"
                            onClick={() => cancel}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditLetter
