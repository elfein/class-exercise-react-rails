import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class SingleArtist extends Component {
    state = {
        artist: {},
        songs: []
    }

    componentDidMount = async () => {
        const artistId = this.props.match.params.id
        const artist = await this.fetchArtist(artistId)
        const songs = await this.fetchSongs(artistId)
        this.setState({ artist, songs })
    }

    fetchArtist = async (id) => {
        const response = await axios.get(`/api/artists/${id}`)
        return response.data
    }

    fetchSongs = async (id) => {
        const response = await axios.get(`/api/artists/${id}/songs`)
        return response.data
    }

    render() {
        const artist = this.state.artist

        const songContent = this.state.songs.map((song, i) => {
            return (
                <div key={i}>
                    <h4>{song.title} – {song.album}</h4>
                {song.preview_url ?
                    <audio controls src={song.preview_url}></audio> :
                    <h4>No audio content.</h4> }
                </div>
            )
        })

        return (
            <div>
                <h1>{artist.name} ({artist.nationality})</h1>
                <div><img alt={artist.name} width={200} src={artist.photo_url} /></div>
                <h3>ID: {this.props.match.params.id}</h3>
                <Link to='/artists'>Go Back to All Artists</Link>
                {songContent}
            </div>
        )
    }
}
