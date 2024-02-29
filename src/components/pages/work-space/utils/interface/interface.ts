export interface AlbumImageInterface {
  ['#text']: string
  size: string
}

export interface AlbumDataInterface {
  artist: string
  image: AlbumImageInterface[]
  mbid: string
  name: string
  streamable: string
  url: string
}
