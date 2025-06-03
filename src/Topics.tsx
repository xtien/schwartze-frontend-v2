/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {useEffect, useState} from 'react'
import {Link, Navigate} from "react-router-dom";
import strings from './strings.js'
import language from "./language";
import {AdminSubjectApi, type Subject, SubjectApi} from "./generated-api";
import {apiConfig} from "./service/AuthenticationService.tsx";
import {isAdmin} from "./service/AuthenticationService.tsx";
import type {SubjectEditLinkFormProps} from "./interface/SubjectEditLinkFormProps.tsx";

const subjectApi = new SubjectApi(apiConfig)
const adminSubjectApi = new AdminSubjectApi(apiConfig)

function Topics() {

    const [subjects, setSubjects] = useState<Subject[]>()
    const [editLink, setEditLink] = useState<boolean>(false)
    const [subject_id, setSubjectId] = useState<number>()

    const [showLinkEdit, setShowLinkEdit] = useState(false);

    language()

    useEffect(() => {

        subjectApi.getSubjects().then((response) => {
            if (response.data.subjects != null) {
                setSubjects(response.data.subjects)
            }
        }).catch(
            error => {
                console.log(error)
            }
        )
    }, [])


    function add_link() {
        setShowLinkEdit(true)
    }

    function delete_link(id: string) {

        let postData = {
            subject_id: parseInt(id),
            language: language()
        };

        adminSubjectApi.removeSubject(postData).then((response) => {
            if (response.data.subjects != null) {
                setSubjects(response.data.subjects)
            }
        }).catch(
            error => {
                console.log(error)
            }
        )
    }

    function edit_link(id: number) {
        setEditLink(true)
        setSubjectId(id)
    }

    const subjectsText = strings.topics;
    const subjectId = subject_id;

    if (editLink) {
        return <Navigate to={'/edit_text/subject/' + subjectId}/>
    }

    let links : any[] = []
    if (subjects != null) {
        links = subjects.map(function (link, i) {
            return (
                <div key={i}>
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td>
                                <div className='mt-3'>
                                    <Link to={'/get_text/subject/' + link.id}
                                          className='linkStyle'>  {link.name}</Link>
                                </div>
                            </td>
                            <td width="20%">
                                {isAdmin() === "true" ?
                                    <div>
                                        <button
                                            className="btn btn-outline-success mybutton ml-2 mt-2"
                                            onClick={() => edit_link(link.id!)}
                                        >
                                            {strings.edit}
                                        </button>
                                        &nbsp;&nbsp;
                                        <button
                                            className="btn btn-outline-danger mybutton ml-2 mt-2"
                                            onClick={() => delete_link(link.id!.toString())}
                                        >
                                            {strings.delete}
                                        </button>
                                    </div>
                                    : null}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        });
    }

    return (

        <div className='container'>

            <div className='mt-5 topics'>
                <h3>{subjectsText}</h3>
                <div id='linkContainer'>
                    {links}
                </div>
                {showLinkEdit ? (
                        <EditLinkForm
                            name={''}
                            setSubjects={setSubjects}
                        />
                    )
                    : null}
                <div>
                    {
                        isAdmin() === "true" ?

                            <div>

                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <form onSubmit={add_link} className='mt-5 ml-5 mb-5'>
                                                <input
                                                    type="submit"
                                                    className="btn btn-outline-success mybutton"
                                                    value="Onderwerp toevoegen"
                                                />

                                            </form>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            : null}
                </div>
            </div>
        </div>
    )
}


function EditLinkForm({name, setSubjects}: SubjectEditLinkFormProps) {

    const [subject_name, setSubjectName] = useState(name);

    function handleLinkSubmit() {

        let postData = {
            subject_name: name,
            language: strings.getLanguage()
        };

        adminSubjectApi.addSubject(postData).then((response) => {
            if(response.data.subjects !=null){
                setSubjects(response.data.subjects)
            }
        }).catch(
            error => {
                console.log(error)
            }
        )
    }

    function handleNameChange(event: { target: { value: string }; }) {
        setSubjectName(event.target.value);
    }

    return (
        <form onSubmit={handleLinkSubmit}>
            <div className="form-group">
                <label htmlFor="status">Link naam</label>
                <input
                    type="text"
                    className="form-control mt-3"
                    id="subject_name"
                    value={subject_name}
                    onChange={handleNameChange}
                />
            </div>
            <input
                type="submit"
                className="btn btn-outline-success mybutton mt-3"
                value="Submit"
            />
        </form>
    );
}


export default Topics
