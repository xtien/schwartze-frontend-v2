/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import  {useState} from 'react'
import './css/bootstrap.css'
import {isAdmin, logout} from "./service/AuthenticationService.tsx";
import {apiConfig} from "./service/AuthenticationService.tsx";
import {AdminLuceneApi, UserApi} from "./generated-api";
import {useNavigate} from "react-router";
import strings from "./strings.tsx";

const userApi = new UserApi(apiConfig)
const indexApi = new AdminLuceneApi(apiConfig)

function Admin() {

    const navigate = useNavigate()
    const [indexing, setIndexing] = useState<boolean>(false)


    function indexLetters() {

        setIndexing(true)

        indexApi.createIndex().then(() => {
            setIndexing(false)
        }).catch(
            error => {
                setIndexing(false)
                console.log(error)
            }
        )
    }

    function logMeOut() {

        logout()
        userApi.logout({}).then(() => {
            console.log("logged out")
            navigate("/")
        })
    }


    function addPerson() {
        navigate("/add_person/")
    }

    function addLocation() {
        navigate("/add_location/")
    }

    function addLetter() {
        navigate("/add_letter/")
    }

    return (
        <div>
            <div className='container letter'>
                {
                    isAdmin() === "true" ?
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <form onSubmit={addPerson} className='mt-5'>
                                        <input
                                            type="submit"
                                            className="btn btn-outline-success mybutton"
                                            value={strings.addPerson}
                                        />

                                    </form>
                                </td>
                                <td>
                                    <form onSubmit={addLetter} className='mt-5'>
                                        <input
                                            type="submit"
                                            className="btn btn-outline-success mybutton"
                                            value={strings.addLetter}
                                        />

                                    </form>
                                </td>
                                <td>
                                    <form onSubmit={addLocation} className='mt-5'>
                                        <input
                                            type="submit"
                                            className="btn btn-outline-success mybutton"
                                            value={strings.addLocation}
                                        />

                                    </form>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-success mt-5"
                                        onClick={indexLetters}>
                                        {strings.indexLetters}
                                    </button>
                                </td>
                                <td>
                                    <form onSubmit={logMeOut} className='mt-5'>
                                        <input
                                            type="submit"
                                            className="btn btn-outline-success mybutton"
                                            value={strings.logout}
                                        />

                                    </form>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                        : null}
            </div>
            <div>{indexing === true ? <div className='mt-5'>Indexing....</div> : null}</div>
        </div>

    )
}

export default Admin
