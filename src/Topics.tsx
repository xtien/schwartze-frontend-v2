/*
 * Copyright (c) 2028 - 2025, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {AdminSubjectApi, type Subject, SubjectApi, type SubjectRequest} from "./generated-api";
import {apiConfig} from "./service/AuthenticationService.tsx";
import {isAdmin} from "./service/AuthenticationService.tsx";
import type {SubjectEditLinkFormProps} from "./interface/SubjectEditLinkFormProps.tsx";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

const subjectApi = new SubjectApi(apiConfig)
const adminSubjectApi = new AdminSubjectApi(apiConfig)

function Topics() {
    const {t} = useTranslation();
    const {i18n} = useTranslation();

    const [subjects, setSubjects] = useState<Subject[]>()
    const [subject, setSubject] = useState<Subject>()

    const [showLinkEdit, setShowLinkEdit] = useState(false);

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


    function add_link(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setShowLinkEdit(true)
    }

    function delete_link(id: number | undefined) {

        if (id == null) {
            return
        }
        let postData = {
            subject_id: id,
            language: i18n.language
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

    function edit_link(subject: Subject) {
        if (subject == null) {
            return
        }
        setSubject(subject)
        setShowLinkEdit(true)
    }


    let links: any[] = []
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
                                            onClick={() => edit_link(link)}
                                        >
                                            {t('edit')}
                                        </button>
                                        &nbsp;&nbsp;
                                        <button
                                            className="btn btn-outline-danger mybutton ml-2 mt-2"
                                            onClick={() => delete_link(link.id)}
                                        >
                                            {t('delete')}
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

        <div className='container-fluid mt-5 me-sm-5 ms-sm-5'>
        {showLinkEdit ? (
                    <EditLinkForm
                        subject={subject}
                        setShowEditSubject={setShowLinkEdit}
                    />
                )
                : null}
            {
                isAdmin() === "true" ?
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <form className='mt-5 ml-5 mb-5'>
                                        <input
                                            type="submit"
                                            className="btn btn-outline-success mybutton"
                                            value={t('addTopic')}
                                            onClick={add_link}
                                        />
                                    </form>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    : null}

            <div className='mt-5 topics'>
                <h3>{subject?.name}</h3>
                <div id='linkContainer'>
                    {links}
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

function EditLinkForm({subject, setShowEditSubject}: SubjectEditLinkFormProps) {

    const {t} = useTranslation();

    const [subject_name, setSubjectName] = useState<string>(subject?.name ?? '');
    const [subject_text, setSubjectText] = useState<string>(subject?.text?.text_string ?? '');
    const [subject_title, setSubjectTitle] = useState<string>(subject?.text?.text_title ?? '');

    function handleLinkSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        let postData: SubjectRequest = {
            subject: subject,
            language: i18next.language,
            text: {
                text_string: subject_text ?? '',
                text_title: subject_title ?? ''
            }
        };

        adminSubjectApi.addOrUpdateSubject(postData).then((response) => {
            console.log(response.data)
            doCancel()
        }).catch(
            (error: any) => {
                console.log(error)
            }
        )
    }

    function handleNameChange(event: { target: { value: string; }; }) {
        setSubjectName(event.target.value);
    }

    function handleTextChange(event: { target: { value: string; }; }) {
        setSubjectText(event.target.value);
    }

    function handleTitleChange(event: { target: { value: string; }; }) {
        setSubjectTitle(event.target.value);
    }

    function doCancel() {
        setShowEditSubject(false)
    }

    return (
        <div className='container mt-5'>
            <h3>{subject?.name} {t('edit')}</h3>
            <form onSubmit={handleLinkSubmit}>
                <div className="form-group">
                    <div>
                        <label htmlFor="status">{t('linknaam')}</label>
                        <input
                            type="text"
                            className="form-control mt-3"
                            id="subject_name"
                            value={subject_name}
                            onChange={handleNameChange}
                        />
                        <label htmlFor="status">{t('linktitle')}</label>
                        <input
                            type="text"
                            className="form-control mt-3"
                            id="subject_name"
                            value={subject_title}
                            onChange={handleTitleChange}
                        />
                        <label htmlFor="status">{t('linktext')}</label>
                        <input
                            type="text"
                            className="form-control mt-3"
                            id="subject_name"
                            value={subject_text}
                            onChange={handleTextChange}
                        />
                    </div>
                </div>
                <input
                    type="submit"
                    className="btn btn-outline-success mybutton m-lg-3"
                    value={t('submit')}
                />
                <input
                    type="submit"
                    className="btn btn-outline-success mybutton m-lg-3"
                    value={t('cancel')}
                    onClick={doCancel}
                />
            </form>
        </div>
    );
}

export default Topics
