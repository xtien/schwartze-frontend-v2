/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import * as React from 'react'
import {Navigate, useLocation, useNavigate} from "react-router";
import language from "./language";
import {type Letter, LettersApi, type LettersRequest} from "./generated-api";
import strings from "./strings.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {apiConfig} from "./config.tsx";
import {useRef} from "react";

const lettersApi = new LettersApi(apiConfig);

function Letters() {

    const initialized = useRef(false)

    const navigate = useNavigate();
    const [letters, setLetters] = React.useState<Letter[]>([]);
    const [orderBy, setOrderBy] = React.useState<string>();
    const [search_term, setSearchTerm] = React.useState('');
    const [go_search, setGoSearch] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [number, setNumber] = React.useState(0);

    const location = useLocation();
    const num = location.pathname.split('/')[4];
    if (num != null) {
        setPageNumber(parseInt(num))
    }

    language()

    React.useEffect(() => {
        if (letters === undefined || letters.length === 0) {
            initialized.current = true
            const request = {}
            setOrderBy('number')
            lettersApi.getLetters1(request).then((response) => {
                if (response.data.letters != null) {
                    setLetters(response.data.letters!)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    function handleSearchTermChange(event: { target: { value: string }; }) {
        setSearchTerm(event.target.value);
    }

    function handleletternumber(event: { target: { value: string }; }) {
        setNumber(parseInt(event.target.value));
    }

    function handleSearchSubmit() {
        setGoSearch(true)
    }

    function letterbynumber() {
    }

    const op_nummer = strings.op_nummer;
    const op_datum = strings.op_datum;
    const search_letters = '/search_letters/' + search_term;
    //   const gotoletter = '/get_letter_details/' + pageNumber + '/0/';

    if (go_search === true) {
        setGoSearch(false)
        return <Navigate to={search_letters}/>
    }

    // if (gotoletter) {
    //     return <Navigate to={'/get_letter_details/' + number + '/0/'}/>
    // }

    function sort() {
        const request: LettersRequest = {}

        if (orderBy == 'number') {
            lettersApi.getLettersByDate(request)
                .then((response) => {
                    if (response.data.letters != null) {
                        setLetters(response.data.letters);
                    }
                }).catch(error => {
                console.log(error)
            })
        } else {
            lettersApi.getLetters(request)
                .then((response) => {
                    if (response.data.letters != null) {
                        setLetters(response.data.letters);
                    }
                }).catch(error => {
                console.log(error)
            })
        }
        setOrderBy(orderBy === 'date' ? 'number' : 'date')
    }

    function renderLetters() {
        return letters.map(function (letter, i) {
            const letterLink = '/get_letter_details/' + letter.number?.toString() + '/0';
            const senders = letter.senders;
            let senderName = '';
            if (senders != undefined && senders.length > 0) {
                senders.map(function (sender, i) {
                    senderName += sender.nick_name + ' ' + sender.last_name + ', '
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
            if (letter.sender_location != null && letter.sender_location.length > 0) {
                letter.sender_location.map(function (location) {
                    senderLocation += location.name + ', '
                })
            }
            senderLocation = senderLocation.slice(0, -2);

            let recipientLocation = '';
            if (letter.recipient_location != null) {
                letter.recipient_location.map(function (location) {
                    recipientLocation += location.name + ', '
                })
            }
            recipientLocation = recipientLocation.slice(0, -2);

            return (
                <tr onClick={() => navigate(letterLink)} key={i}>
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
                <div className='col-sm-3'>
                    <button
                        className="btn btn-outline-secondary mybutton mt-3"
                        onClick={sort}>
                        {orderBy === 'date' ? op_nummer : op_datum}
                    </button>
                </div>

                <div className='col-sm-3'>
                    <form onSubmit={letterbynumber} className='mb-3 mt-3'>
                        <input
                            type="input"
                            id="nr"
                            placeholder={strings.naar_nummer}
                            onChange={handleletternumber}
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
                        <th>Recipient
                        </th
                        >
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
