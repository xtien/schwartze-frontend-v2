/*
 *  * Copyright (c) 2018 - "2025", Zaphod Consulting BV, Christine Karman.
 *  This project is free software: you can redistribute it and/or modify it under the terms of the Apache License, Version 2.0. You can find a copy of the license at http://www.apache.org/licenses/LICENSE-2.0.
 *
 */

import strings from './strings.js'
import language from "./language";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import ReactGA from "react-ga4";

export function About() {

    useEffect(() => {
        // Send pageview with a custom path
        ReactGA.send({ hitType: "pageview", page: "/about", title: "About Page" });
    }, [])

    language()

    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="textpage mt-5 m-lg-5"><p>{strings.aboutText}</p></div>
                {/*<div className="textpage m-lg-5">{strings.siteVersion} {process.env.REACT_APP_VERSION}</div>*/}
                <div className="textpage m-lg-5"><Link to={"/get_page/1/1"}>{strings.more_about_site}</Link></div>
                <div className="textpage m-lg-5"><a href="https://christine.nl/about">{strings.aboutChristine}</a></div>
            </div>
        </div>
    )
}
