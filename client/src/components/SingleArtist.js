import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
max-width: 1200px;
margin: 0 auto;
h1, h3 {
    font-weight: 200;
}
a {
    text-decoration: none;
    border-bottom: 3px double #000;
    color: #000;
    padding: 0 0 16px 0;
    margin: 0 0 16px 0;
    &:hover {
        color: rgb(245,240, 200);
    }
}
img {
    width: 100%;
    max-width: 600px;
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.song {
    &:hover {
        transform: rotate(5deg);
        transition: transform ease 0.4s;
    }
    transform: rotate(0deg);
        transition: transform ease 0.4s;
    background: rgb(245,240, 200);
    margin: 10px;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    max-width: 300px;
    h4 {
        font-weight: 200;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        padding: 0 0 16px 0;
        border-bottom: 3px double #000;
    }
}
audio {
    width: 80px;
}
`

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
                <div className="song" key={i}>
                    <h4>{song.title} – {song.album}</h4>
                    {song.preview_url ?
                        <audio controls src={song.preview_url}></audio> :
                        <h4>No audio content.</h4>}
                </div>
            )
        })

        return (
            <StyledDiv>
                <h1>{artist.name} ({artist.nationality})</h1>
                <div><img alt={artist.name} src={artist.photo_url} /></div>
                <h3>ID: {this.props.match.params.id}</h3>
                <Link to='/artists'>Go Back to All Artists</Link>
                <div className="container" >
                    {songContent}
                </div>
            </StyledDiv>
        )
    }
}
