/*
 *  * Copyright (c) 2018 - "2025", Zaphod Consulting BV, Christine Karman.
 *  This project is free software: you can redistribute it and/or modify it under the terms of the Apache License, Version 2.0. You can find a copy of the license at http://www.apache.org/licenses/LICENSE-2.0.
 *
 */

import React, {useState} from 'react'
import {LocationApi, type LocationRequest, type MyLocation} from "./generated-api";
import {apiConfig} from "./service/AuthenticationService.tsx";
import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router";

const locationApi = new LocationApi(apiConfig)

function Locations() {

    const [locations, setLocations] = useState<MyLocation[]>([])
    const navigate = useNavigate()

    React.useEffect(() => {

        const request: LocationRequest = {}

        locationApi.getLocations(request)
            .then((response) => {
                    if (response.data.locations != null) {
                        setLocations(response.data.locations);
                    }
                }
            ).catch(error => {
            console.log(error)
        })
    }, [])


    function renderLocations() {
        return locations.map(function (location) {
            const locationLink = '/get_location_details/' + location.id?.toString();
            return (
                <tr onClick={() => navigate(locationLink)}>
                    <td className='text-nowrap'>{location.id}</td>
                    <td className='text-nowrap'>{location.name}</td>
                    <td>{location.comment?.substring(0, 50)}</td>
                </tr>
            )
        })
    }

    return (
        <div className='container mt5'>
            <div className='locations-container'>
                <Table>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Comments</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderLocations()}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Locations
