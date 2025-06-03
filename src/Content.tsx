/*
 * Copyright (c) 2018 - 2024, Zaphod Consulting BV, Christine Karman
 * This project is free software: you can redistribute it and/or modify it under the terms of
 * the Apache License, Version 2.0. You can find a copy of the license at
 * http://www.apache.org/licenses/LICENSE-2.0.
 */
import {useEffect, useState} from 'react'
import strings from "./strings";
import {Link} from "react-router-dom";
import language from "./language";
import {ContentApi, type ContentItem, type ContentRequest} from "./generated-api";
import {apiConfig} from "./service/AuthenticationService.tsx";

const contentApi = new ContentApi(apiConfig)

function Content() {

    const [contentList, setContentList] = useState<ContentItem[]>([]);
    const lang = language()


    useEffect(() => {
        const request: ContentRequest = {
            language: lang
        };
        contentApi.getContent(request).then((response) => {
            if (response.data.content != null) {
                if (response.data.content != null) {
                    setContentList(response.data.content);
                }
            }
        })
    }, []);

    const items = contentList.map(function (item) {
        const linkTo = '/get_page/' + item.chapter_number + '/' + item.page_number
        return <div><Link to={linkTo}>{item.chapter_number}. {item.chapter_title}</Link></div>
    });

    return (
        <div className='container letter'>
            <h3>{strings.content}</h3>
            <div className='mt-3 ml-3'>
                {items}
            </div>
        </div>
    )
}


export default Content
