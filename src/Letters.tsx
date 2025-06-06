/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import * as React from 'react'
import {Navigate, useLocation, useNavigate} from "react-router";
import language from "./language";
import {
    type GetPersonRequest,
    type Letter,
    LettersApi,
    type LettersRequest,
    LettersRequestOrderByEnum,
    LettersRequestToFromEnum,
    type LocationLettersRequest,
    type MyLocation,
    type Person,
    PersonApi,
    type PersonLettersRequest,
    PersonLettersRequestToFromEnum,
    type PersonResult
} from "./generated-api";
import strings from "./strings.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {apiConfig} from "./service/AuthenticationService.tsx";
import {useState} from "react";
import type {AxiosResponse} from "axios";

const lettersApi = new LettersApi(apiConfig);
const personApi = new PersonApi(apiConfig);

function Letters() {

    const location = useLocation()
    const params = location.pathname.substring(1).split('/')
    const id = params[1]
    const urlPart = params[0]
    const personOrLocation = urlPart.includes('person') ? 'person' : urlPart.includes('location') ? 'location' : ''
    const toFromString = params[2]

    const navigate = useNavigate();
    const [person, setPerson] = useState<Person>()
    const [letters, setLetters] = React.useState<Letter[]>([]);
    const [myLocation] = useState<MyLocation>()
    const [orderBy, setOrderBy] = React.useState<LettersRequestOrderByEnum>("NUMBER");
    const [toFrom] = React.useState<LettersRequestToFromEnum>(toFromString === 'to' ? LettersRequestToFromEnum.To : LettersRequestToFromEnum.From);
    const [search_term, setSearchTerm] = React.useState('');
    const [go_search, setGoSearch] = React.useState(false);

    language()

    function getLetters(orderBy: LettersRequestOrderByEnum) {
        if (personOrLocation === 'person') {
            function getPerson(id: string) {
                const personRequest: GetPersonRequest = {
                    id: parseInt(id),
                }
                personApi.getPerson(personRequest).then((response: AxiosResponse<PersonResult, any>) => {
                        if (response.data.person != null) {
                            setPerson(response.data.person)
                        }
                    }
                ).catch((error: any) => {
                    console.log(error)
                })
            }

            if (id != null && toFromString != null) {
                getPerson(id)
                const request: PersonLettersRequest = {
                    id: parseInt(id),
                    toFrom: toFrom,
                    orderBy: orderBy
                }

                lettersApi.getLettersForPerson(request).then((response) => {
                    if (response.data.letters != null) {
                        setLetters(response.data.letters!)
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        } else if (personOrLocation === 'location') {

            function getLocation(id: string) {
                const request: LocationLettersRequest = {
                    location_id: parseInt(id),
                }
                lettersApi.getLettersForLocation(request).then(
                    (response) => {
                        if (response.data.letters != null) {
                            setLetters(response.data.letters!)
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                    }
                )
            }

            getLocation(id)

        } else {
            const request: LettersRequest = {
                orderBy: orderBy
            }
            lettersApi.getLetters(request).then((response) => {
                if (response.data.letters != null) {
                    setLetters(response.data.letters!)
                }
            }).catch(error => {
                console.log(error)
            })
        }

    }

    React.useEffect(() => {
        getLetters(orderBy)
    }, [personOrLocation, id, toFromString, urlPart, orderBy])

    function createFullName(person: Person): string {
        let name = '';
        name += person.nick_name != null ? person.nick_name + ' ' : '';
        name += person.tussenvoegsel != null ? person.tussenvoegsel + ' ' : '';
        name += person.last_name != null ? person.last_name : '';
        return name;
    }

    function handleSearchTermChange(event: { target: { value: string }; }) {
        setSearchTerm(event.target.value);
    }

    function handleListOrder(event: { target: { value: string }; }) {
        setOrderBy(orderBy === LettersRequestOrderByEnum.Date ? LettersRequestOrderByEnum.Number : LettersRequestOrderByEnum.Date)
        const request = {
            'number': parseInt(event.target.value)
        }
        lettersApi.getLetter(request).then((response) => {
            if (response.data.letter != null) {
                setLetters([response.data.letter])
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function handleSearchSubmit() {
        setGoSearch(true)
    }

    function letterbynumber() {
    }

    const search_letters = '/search_letters/' + search_term;
    //   const gotoletter = '/get_letter_details/' + pageNumber + '/0/';

    if (go_search === true) {
        setGoSearch(false)
        return <Navigate to={search_letters}/>
    }

    function navigateTo(location: string) {
        navigate(location);
    }

    // if (gotoletter) {
    //     return <Navigate to={'/get_letter_details/' + number + '/0/'}/>
    // }

    function sort(order: LettersRequestOrderByEnum) {

        setOrderBy(order)
        getLetters(order)
    }

    function renderLetters() {
        return letters.map(function (letter) {
            const letterLink = '/get_letter_details/' + letter.number?.toString() + '/0';
            const senders = letter.senders;
            let senderName = '';
            if (senders != undefined && senders.length > 0) {
                senders.map(function (sender) {
                    const fullName: string = createFullName(sender);
                    senderName += fullName + ', '
                })
                senderName = senderName.slice(0, -2);
            }

            const recipients = letter.recipients;
            let recipientName = '';
            if (recipients != undefined && recipients.length > 0) {
                recipients.map(function (recipient) {
                    recipientName += recipient.nick_name + ' ' + recipient.last_name + ', '
                })
                recipientName = recipientName.slice(0, -2);
            }

            let senderLocation = '';
            if (letter.sender_locations != null && letter.sender_locations.length > 0) {
                letter.sender_locations.map(function (location) {
                    senderLocation += location.name + ', '
                })
            }
            senderLocation = senderLocation.slice(0, -2);

            let recipientLocation = '';
            if (letter.recipient_locations != null) {
                letter.recipient_locations.map(function (location) {
                    recipientLocation += location.name + ', '
                })
            }
            recipientLocation = recipientLocation.slice(0, -2);

            return (
                <tr onClick={() => navigateTo(letterLink)}>
                    <td className='text-nowrap'>{letter.number}</td>
                    <td className='text-nowrap'>{letter.date}</td>
                    <td>{senderName}</td>
                    <td>{senderLocation}</td>
                    <td>{recipientName}</td>
                    <td>{recipientLocation}</td>
                    <td>{letter.comment?.substring(0, 30)}</td>
                </tr>
            )
        });
    }

    return (
        <div className='container'>
            <div className="row">
                <div className='mt-3 m-lg-5'>
                    {person != null ? (strings.personLettersText + " " + (toFrom === PersonLettersRequestToFromEnum.From ? strings.from : strings.to) + ' ' + createFullName(person)) : ''}
                    {myLocation != null ? (strings.locationLettersText + ' ' + myLocation.name) : ''}

                </div>
                {
                    letters.length < 10 ? null :
                        <div className='col-sm-7'>
                            <button
                                className="btn btn-outline-secondary mybutton m-lg-3  mt-3"
                                onClick={() => sort(LettersRequestOrderByEnum.Number)}>
                                {strings.op_nummer}
                            </button>
                            <button
                                className="btn btn-outline-secondary mybutton m-lg-3  mt-3"
                                onClick={() => sort(LettersRequestOrderByEnum.Date)}>
                                {strings.op_datum}
                            </button>
                            <button
                                className="btn btn-outline-secondary mybutton m-lg-3 mt-3"
                                onClick={() => sort(LettersRequestOrderByEnum.SenderLastname)}>
                                {strings.op_achternaam}
                            </button>
                            <button
                                className="btn btn-outline-secondary mybutton m-lg-3 mt-3"
                                onClick={() => sort(LettersRequestOrderByEnum.SenderFirstname)}>
                                {strings.op_voornaam}
                            </button>
                        </div>
                }

                <div className='col-sm-3'>
                    <form onSubmit={letterbynumber} className='mb-3 mt-3'>
                        <input
                            type="input"
                            id="nr"
                            placeholder={strings.naar_nummer}
                            onChange={handleListOrder}
                            className="form-control w-75"
                        />
                    </form>
                </div>

                <div className='col-sm-6'>
                    <form onSubmit={handleSearchSubmit} className='mb-3 mt-3'>
                        <input
                            type="input"
                            id="text"
                            placeholder={strings.search}
                            onChange={handleSearchTermChange}
                            className='form-control w-75'
                        />
                    </form>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Date</th>
                        <th>Sender</th>
                        <th>Sender Location</th>
                        <th>Recipient</th>
                        <th>Recipient Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderLetters()}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Letters
