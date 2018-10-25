import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AllArtists extends Component {
    render() {
        return (
            <div>
                <h1>All Artists</h1>
                <Link to='/artists/1'>Go To An Artist</Link>
            </div>
        )
    }
}
