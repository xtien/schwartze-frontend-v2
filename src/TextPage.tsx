/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */

import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import './css/bootstrap.css'
import language from "./language";
import {TextApi, type TextRequest, type TextResult} from "./generated-api";
import strings from "./strings.tsx";
import {apiConfig} from "./service/AuthenticationService.tsx";
import {useLocation} from "react-router";

const textApi = new TextApi(apiConfig)

function TextPage() {

    const location = useLocation()
    const params = location.pathname.split('/')

    const _entity = params[2]
    const _id = params[3]

    const [entity] = useState<string>(_entity);
    const [id] = useState<number>(parseInt(_id));
    const [textResult, setTextResult] = useState<TextResult>();
    const [link, setLink] = useState<string | null>();
    const [subjectLink, setSubjectLink] = useState<string | null>();

    language()

    useEffect(() => {
        const request: TextRequest = {
            location_id: entity === 'location' ? id : undefined,
            person_id: entity === 'person' ? id : undefined,
            letter_id: entity === 'letter' ? id : undefined,
            subject_id: entity === 'subject' ? id : undefined,
            language: strings.getLanguage()
        };
        textApi.getText(request)
            .then((response) => {
                setTextResult(response.data);

                let link = null;
                let subjectLink = null;
                if (response.data?.person != null && response.data?.person!.id != null) {
                    link = '/get_person_details/' + response.data.person.id;
                }
                if (response.data?.location != null && response.data?.location!.id != null) {
                    link = '/get_location_details/' + response.data?.location.id;
                }
                if (response.data?.letter != null && response.data?.letter!.id != null) {
                    link = '/get_letter_details/' + response.data?.letter.number + '/0';
                }
                if (response.data?.subject !== null && response.data?.subject!.id != null) {
                    subjectLink = '/topics/';
                }

                console.log(
                    'link: ' + link + ' subjectLink: ' + subjectLink
                )
                setLink(link);
                setSubjectLink(subjectLink);

            }).catch((error) => {
             console.log(error)
        })
    }, [])

    const textString =
        (textResult?.location != null) ? textResult?.location.text?.text_string : (
            (textResult?.person != null ? textResult?.person.text?.text_string : (
                (textResult?.letter != null ? textResult?.letter.text?.text_string : (
                    (textResult?.subject != null) ? textResult?.subject.text?.text_string : (
                        (textResult?.text != null) ? textResult?.text.text_string : ''
                    )))))
        );


    return (
        <div className='textpage wide mt-5 ml-5'>


            {link != null ?
                <div>
                    <div>
                        {textResult?.person != null ?
                            <h3><Link className='mb-5'
                                      to={link}> {textResult.person.nick_name} {(textResult.person.tussenvoegsel != null ? (textResult.person.tussenvoegsel + ' ') : '')} {textResult.person.last_name}</Link>
                            </h3>
                            : null
                        }
                    </div>
                    <div>
                        {textResult?.location != null ?
                            <h3><Link to={link}> {textResult?.location.location_name}</Link></h3>
                            : null
                        }
                    </div>
                    <div>
                        {textResult?.letter != null ?
                            <h3><Link to={link}> Brief {textResult?.letter.number}</Link>
                            </h3>
                            :
                            null
                        }
                    </div>
                    <div>
                        {textResult?.subject != null ?
                            <div>
                                <h3>{textResult?.subject.name}</h3>
                            </div>
                            : null
                        }
                    </div>
                </div>
                :
                null
            }
            <div className='mt-3'>
                {/* TODO: this needs to change when others than myself get access to data entry */}
                {(textString != null) ?
                    <div dangerouslySetInnerHTML={{__html: textString}}/>
                    : null
                }
            </div>
            <div className='mt-5'>{link != null ?
                <Link className='mb-5' to={link}><h3>{strings.back}</h3></Link> : null}
            </div>
            <div className='mt-5'>{subjectLink != null ?
                <Link className='mb-5' to={subjectLink}><h3>{strings.back}</h3></Link> : null}
            </div>
        </div>
    )
}

export default TextPage
