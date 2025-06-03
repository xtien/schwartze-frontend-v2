/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {useEffect, useState} from 'react'
import strings from './strings.tsx'
import language from "./language";
import {
    type PeopleRequest,
    PeopleRequestOrderByEnum,
    type Person,
    PersonApi,
    type SearchRequest
} from "./generated-api";
import {apiConfig} from "./service/AuthenticationService.tsx";
import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router";

const personApi = new PersonApi(apiConfig)

function People() {

    const [people, setPeople] = useState<Person[]>([]);
    const [orderBy, setOrderBy] = useState<PeopleRequestOrderByEnum>(PeopleRequestOrderByEnum.FirstName);
    const [search_term, setSearchTerm] = useState('');

    const navigate = useNavigate()

    language()

    useEffect(() => {
        apiGetPeople()
    }, [])

    function apiGetPeople(order: PeopleRequestOrderByEnum | undefined = undefined) {
        const request: PeopleRequest = {
            orderBy: order !== undefined ? order : orderBy,
        }
        personApi.getPeople(request).then((response) => {
            if (response.data.people != null) {
                setPeople(response.data.people);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function handleSearchTermChange() {
        setSearchTerm(search_term);
    }

    function handleSearchSubmit() {

        const postData: SearchRequest = {
            search_term: search_term
        }

        personApi.searchPeople(postData).then((response) => {
            if (response.data.people != null) {
                setPeople(response.data.people);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function sort(order: PeopleRequestOrderByEnum) {
        if (order !== orderBy) {
            setOrderBy(order)
            apiGetPeople(order)
        }
    }

    function personName(person: Person) {
        let name =
            (person.nick_name != null ? person.nick_name : '') + ' ' +
            (person.tussenvoegsel != null && person.tussenvoegsel.length > 0 ? person.tussenvoegsel : '') + ' ' +
            (person.last_name != null ? person.last_name : '');

        return name;
    }

    function renderPeople() {
        return people.map(function (person) {
            const personLink = '/get_person_details/' + person.id ;


            return (
                <tr onClick={() => navigate(personLink)}>
                    <td>{person.id}</td>
                    <td>{personName(person)}</td>
                    <td>{person.comment}</td>
                </tr>
            )
        })
    }

    return (

        <div className='container'>
            <div className="row">
                <div className='col-sm-5'>
                    <button
                        className="btn btn-outline-secondary mybutton mt-5 m-lg-2"
                        onClick={() => sort(PeopleRequestOrderByEnum.FirstName)}>
                        {strings.op_voornaam}
                    </button>
                    <button
                        className="btn btn-outline-secondary mybutton mt-5 m-lg-2"
                        onClick={() => sort(PeopleRequestOrderByEnum.Name)}>
                        {strings.op_achternaam}
                    </button>
                    <button
                        className="btn btn-outline-secondary mybutton mt-5 m-lg-2"
                        onClick={() => sort(PeopleRequestOrderByEnum.Number)}>
                        {strings.op_nummer}
                    </button>
                </div>
                <div className='col-sm-3'>
                    <form onSubmit={handleSearchSubmit} className='mt-3  mb-3'>
                        <input
                            type="input"
                            id="text"
                            placeholder={strings.search}
                            onChange={handleSearchTermChange}
                            className="form-control "
                        />

                    </form>
                </div>
            </div>

            <Table>
                <thead>
                <tr>
                    <th>{strings.nummer}</th>
                    <th>{strings.name}</th>
                    <th>{strings.comment}</th>

                </tr>
                </thead>
                <tbody>
                {renderPeople()}
                </tbody>
            </Table>
        </div>
    )
}

export default People
