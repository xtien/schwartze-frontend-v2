/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {useEffect, useState} from 'react'
import './App.css'
import './css/bootstrap.css'
import {Link, Navigate} from "react-router-dom";
import Util from './service/Util';
import strings from './strings.js'
import language from "./language";
import {useLocation, useNavigate} from "react-router";
import {
    type AddPersonRequest,
    AdminLinksApi,
    AdminPersonApi,
    type DeletePersonRequest,
    type GetPersonRequest,
    type Person,
    PersonApi
} from "./generated-api";
import {apiConfig, isAdmin} from "./service/AuthenticationService.tsx";
import type {LinkEditProps} from './interface/LinkEditProps.tsx';
import type {EditPersonFormProps} from "./interface/EditPersonFormProps.tsx";
import type {EditPersonLinkFormProps} from "./interface/EditPersonLinkFormProps.tsx";

const personApi = new PersonApi(apiConfig)
const adminLinksApi = new AdminLinksApi(apiConfig)
const adminPersonApi = new AdminPersonApi(apiConfig)

function PersonPage() {

    const navigate = useNavigate();

    const location = useLocation()
    const params = location.pathname.split('/')
    const id: string = params[2]

    const [showEdit, setShowEdit] = useState(false)
    const [showLinkEdit, setShowLinkEdit] = useState(false)
    const [person, setPerson] = useState<Person>({})
    const [textString, setTextString] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [linkEdit, setLinkEdit] = useState<LinkEditProps>()
    const [link_id, setLinkId] = useState<number>(0)

    language()

    useEffect(() => {
        getPerson(id)
    }, [])

    function getPerson(id: string) {
        const request: GetPersonRequest = {
            id: parseInt(id)
        }
        personApi.getPerson(request).then(response => {
            if (response.data.person != null) {
                setPerson(response.data.person)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function toggleEditDoneParam(person: { id: string; }) {
        setShowEdit(false)
        getPerson(person.id)
    }

    function toggleEditDone() {
        setShowEdit(false)
    }

    function edit() {
        setShowEdit(true)
    }

    function deletePerson() {
        const request: DeletePersonRequest = {
            id: person!.id
        };
        adminPersonApi.deletePerson(request).then(response => {
            if (response.data.person != null) {
                setPerson(response.data.person)
            }
        }).catch(error => {
            console.log(error)
        })
    }


    function delete_link(id: number) {

        let postData = {
            link_id: id,
            person_id: person!.id
        };

        adminLinksApi.deleteLink(postData).then(response => {
            if (response.data.person != null) {
                setPerson(response.data.person)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function edit_link(id: number) {

        if (person != null && person.links != null) {
            const link = person.links.find(link => {
                return link.id === id
            });
            if (link != null && link.id != null) {
                setShowLinkEdit(true)
                setLinkEdit({
                    linkId: link.id,
                    linkName: link.link_name,
                    linkUrl: link.link_url
                })
            }

        }
    }

    function add_link() {
        setShowLinkEdit(true)
    }

    function handleTextChange(event: { target: { value: string } }) {
        setTextString(event.target.value)
    }

    let linkTo = '';
    let linkToEditTextPerson = '';
    if (person != null) {
        linkTo = '/get_text/person/' + person.id;
        linkToEditTextPerson = '/edit_text/person/' + person.id;
    }

    let brievenVan;
    if (person.brieven_van === true) {
        brievenVan = <Link
            to={`/get_letters_for_person/${person.id}/from`}
            className='linkStyle'> {strings.brieven_van} {person.nick_name} </Link>
    }
    let brievenAan;
    if (person.brieven_aan === true) {
        brievenAan = <Link to={`/get_letters_for_person/${person.id}/to`}
                           className='linkStyle'> {strings.brieven_aan} {person.nick_name} </Link>
    }

    if (deleted === true) {
        return <Navigate to={'/get_people/'}/>
    }

    let links;
    if (person != null && person.links != null) {
        links = person.links.map(function (link, i) {
            return (
                <div key={i}>
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td>
                                <a href={link.link_url} target="_blank"
                                   rel="noopener noreferrer" className='linkStyle'>{link.link_name}</a>
                            </td>
                            <td width="20%">
                                {
                                    isAdmin() === "true" ?
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
                                                onClick={() => delete_link(link.id!)}
                                            >
                                                {strings.delete}
                                            </button>
                                        </div>
                                        : null
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        });
    }

    let fullname = '';
    if (person.full_name != null && person.full_name.length > 0) {
        fullname = '(' + person.full_name + ')'
    }

    function combine(event: { preventDefault: () => void; }) {
        event.preventDefault();
        navigate('/combine_person/' + person.id)
    }

    return (
        <>
            {person == null ?
                <div className='content-container letter mt-5'>
                    No person found with id {id}
                </div>
                :
                <div className='content-container letter mt-5'>
                    {showEdit ? null : (
                        <div>
                            <div>
                                <div className="person_image">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <img className="person_image" alt="" src={person.image_url}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><p className="person_caption">{person.image_caption}</p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p>
                                    {person.id} {person.nick_name} {fullname} {person.tussenvoegsel} {person.last_name}
                                </p>
                                <p>{strings.geboren}: {person.date_of_birth} {person.place_of_birth === null ? null : ' te'} {person.place_of_birth} </p>
                                <p>{strings.overleden}: {person.date_of_death} {person.place_of_death === null ? null : 'te'} {person.place_of_death}</p>
                                <p>{person.comment}</p>
                                <p className='mt-5'>
                                    {brievenVan}
                                </p>
                                <p>{brievenAan}
                                </p>
                                {
                                    isAdmin() === "true" ?
                                        <div>
                                            {showEdit ? null : (
                                                <div>
                                                    <div>
                                                        <button
                                                            className="btn btn-outline-success mybutton"
                                                            onClick={edit}
                                                            value={id}
                                                        >
                                                            edit
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </div> : null
                                }

                                <div className='textpage mt-5 ml-5'>
                                    {person.text != null && Util.isNotEmpty(person.text.text_string) ?
                                        <div>
                                            {/* TODO: this needs to change when others than myself get access to data entry */}

                                                <div
                                                    dangerouslySetInnerHTML={{__html: person.text.text_string!.substring(0, 300)}}/>

                                            {person.text.text_string!.length > 300 ?
                                                <p>
                                                    <Link to={linkTo} className='mt-5 mb-5'> {strings.meer} </Link>
                                                </p>
                                                : null}
                                        </div> : null}
                                </div>

                            </div>

                            <div id='linkContainer'>
                                <h3 className='mt-5'>Links</h3>
                                {links}
                            </div>


                        </div>
                    )}
                    {showEdit ? (
                        <EditPersonForm
                            person={person}
                            setPerson={setPerson}
                            toggleEditDone={toggleEditDone}
                        />
                    ) : null
                    }

                    {isAdmin() === "true" ?

                        <div className="mt-5">
                            {showLinkEdit ? (
                                    <EditPersonLinkForm
                                        person={person}
                                        linkId={link_id}
                                        setPerson={setPerson}
                                    />
                                )
                                :
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <form onSubmit={add_link} className='ml-5 mb-5'>
                                                    <input
                                                        type="submit"
                                                        className="btn btn-outline-success mybutton"
                                                        value="Link toevoegen"
                                                    />
                                                </form>

                                            </div>
                                        </td>
                                        <td>
                                            <form onSubmit={combine} className="ml-5 mb-5">
                                                <input
                                                    type="submit"
                                                    className="btn btn-outline-success mybutton ml-5"
                                                    value="Combineren"
                                                />
                                            </form>
                                        </td>
                                        <td>
                                            <form onSubmit={() => deletePerson} className="ml-5 mb-5">
                                                <input
                                                    type="submit"
                                                    className="btn btn-outline-danger mybutton"
                                                    value="Verwijderen"
                                                />

                                            </form>
                                        </td>
                                        <td>
                                            <div className="ml-5 mb-5">
                                                <Link to={linkToEditTextPerson}>
                                                    Edit text
                                                </Link>
                                            </div>

                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            }
                        </div>
                        : null
                    }

                </div>
            }
        </>
    )
}


function EditPersonForm({person, toggleEditDone, setPerson}: EditPersonFormProps) {

    const [cancel, setCancel] = useState(false);
    const [editDone, setEditDone] = useState(false);

    function handlecommentChange(event: { target: { value: string; }; }) {
        person.comment = event.target.value;
    }

    function handleImageUrlChange(event: { target: { value: string; }; }) {
        person.image_url = event.target.value;
    }

    function handleImageCaptionChange(event: { target: { value: string; }; }) {
        person.image_url = event.target.value;
    }

    function handleNickNameChange(event: { target: { value: string; }; }) {
        person.nick_name = event.target.value;
    }

    function handleFullNameChange(event: { target: { value: string; }; }) {
        person.full_name = event.target.value;
    }

    function handleTussenvoegselChange(event: { target: { value: string; }; }) {
        person.tussenvoegsel = event.target.value;
    }

    function handleLastNameChange(event: { target: { value: string; }; }) {
        person.last_name = event.target.value;
    }

    function handleDoBChange(event: { target: { value: string; }; }) {
        person.image_url = event.target.value;
    }

    function handleDoDChange(event: { target: { value: string; }; }) {
        person.image_url = event.target.value;
    }

    function handlePoBChange(event: { target: { value: string; }; }) {
        person.image_url = event.target.value;
    }

    function handlePoDChange(event: { target: { value: string; }; }) {
        person.image_url = event.target.value;
    }

    function handleCancel() {

        setCancel(true);
    }

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        let request: AddPersonRequest = {
            person: person
        };

        adminPersonApi.updatePersonDetails(request).then(response => {
            if (response.data.person != null) {
                setPerson(response.data.person)
                setEditDone(true)
            }
        }).catch(error => {
            console.log(error)
        })
    }


    if (editDone) {
        setEditDone(false);
    }
    if (cancel) {
        setEditDone(false)
        toggleEditDone();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>{person.nick_name} {person.tussenvoegsel} {person.last_name}</p>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Nick name</label>
                    <input
                        type="text"
                        className="form-control "
                        id="nick_name"
                        value={person.nick_name}
                        onChange={handleNickNameChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Full name</label>
                    <input
                        type="text"
                        className="form-control "
                        id="full_name"
                        value={person.full_name}
                        onChange={handleFullNameChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Tussenvoegsel</label>
                    <input
                        type="text"
                        className="form-control "
                        id="tussenvoegsel"
                        value={person.tussenvoegsel}
                        onChange={handleTussenvoegselChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Last name</label>
                    <input
                        type="text"
                        className="form-control "
                        id="last_name"
                        value={person.last_name}
                        onChange={handleLastNameChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Geboren</label>
                    <input
                        type="text"
                        className="form-control "
                        id="last_name"
                        value={person.date_of_birth}
                        onChange={handleDoBChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Plaats</label>
                    <input
                        type="text"
                        className="form-control "
                        id="last_name"
                        value={person.place_of_birth}
                        onChange={handlePoBChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Overleden</label>
                    <input
                        type="text"
                        className="form-control "
                        id="last_name"
                        value={person.date_of_death}
                        onChange={handleDoDChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Plaats</label>
                    <input
                        type="text"
                        className="form-control "
                        id="last_name"
                        value={person.place_of_death}
                        onChange={handlePoDChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Opmerkingen</label>
                    <textarea
                        type="text"
                        className="form-control textarea200"
                        id="comments"
                        value={person.comment}
                        onChange={handlecommentChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Image URL</label>
                    <input
                        type="text"
                        className="form-control "
                        id="image_url"
                        value={person.image_url}
                        onChange={handleImageUrlChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="status">Image caption</label>
                    <input
                        type="text"
                        className="form-control "
                        id="image_caption"
                        value={person.image_caption}
                        onChange={handleImageCaptionChange}
                    />
                </div>
                <table>
                    <tbody>
                    <tr>
                        <td></td>
                        <input
                            type="submit"
                            className="btn btn-outline-success mybutton mt-3"
                            value="Submit"
                        />
                        <td>
                            <input
                                type="button"
                                onClick={handleCancel}
                                className="btn btn-outline-danger mybutton mt-3"
                                value="Cancel"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
        ;
}


function EditPersonLinkForm({}: EditPersonLinkFormProps) {

    const [person, setPerson] = useState<Person>();
    const [link_id, setLinkId] = useState<number>();
    const [link_name, setLinkName] = useState<string>();
    const [link_url, setLinkUrl] = useState<string>();
    const [linkEditDone, setLinkEditDone] = useState<boolean>(false);


    function handleLinkSubmit(event) {
        event.preventDefault();

        let request = {
            person_id: person!.id,
            link_id: link_id,
            link_name: link_name,
            link_url: link_url,
        };

        adminLinksApi.editLink(request).then(response => {
            if (response.data.person != null) {
                setPerson(response.data.person)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function handleNameChange(event: { target: { value: string } }) {
        setLinkName(event.target.value);
    }

    function handleUrlChange(event: { target: { value: string } }) {
        setLinkUrl(event.target.value);
    }


    const redirectTo = '/getperson_details/' + person!.id;

    if (linkEditDone === true) {
        return <Navigate to={redirectTo}/>
    }

    return (
        <form onSubmit={handleLinkSubmit}>
            <div className="form-group mt-3 mt-5">
                <label htmlFor="status">Link naam</label>
                <input
                    type="text"
                    className="form-control"
                    id="link_name"
                    value={link_name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="status">Link url</label>
                <input
                    type="text"
                    className="form-control"
                    id="link_url"
                    value={link_url}
                    onChange={handleUrlChange}
                />
            </div>
            <table className='mt-5'>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="submit"
                            className="btn btn-outline-success mybutton"
                            value="Submit"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    );
}

export default PersonPage
