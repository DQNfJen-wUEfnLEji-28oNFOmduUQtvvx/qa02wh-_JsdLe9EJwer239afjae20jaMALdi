// ==UserScript==
// @name Invidious API
// @namespace -
// @version 1.0.0
// @description Invidious tools in one library
// @author NotYou
// @license LGPL-3.0
// @grant none
// ==/UserScript==
 
class Invidious {
    #standardHost
 
    constructor(host, id) {
        this.id = id
        this.#standardHost = 'yewtu.be'
        this.host = host || this.#standardHost
    }
 
    instances() {
        return {
            standard: [
                'invidious.snopyta.org',
                'yewtu.be',
                'invidious.kavin.rocks',
                'vid.puffyan.us',
                'invidious.namazso.eu',
                'inv.riverside.rocks',
                'invidious.osi.kr',
                'youtube.076.ne.jp',
                'yt.artemislena.eu',
                'tube.cthd.icu',
                'invidious.flokinet.to',
                'invidious.weblibre.org',
                'invidious.esmailelbob.xyz',
                'invidious.lunar.icu',
                'invidious.projectsegfau.lt',
                'inv.bp.projectsegfau.lt',
                'y.com.sb',
                'invidious.sethforprivacy.com',
                'invidious.tiekoetter.com'
            ],
            onion: [
                'c7hqkpkpemu6e7emz5b4vyz7idjgdvgaaa3dyimmeojqbgpea3xqjoid.onion',
                'w6ijuptxiku4xpnnaetxvnkc5vqcdu7mgns2u77qefoixi63vbvnpnqd.onion',
                'kbjggqkzv65ivcqj6bumvp337z6264huv5kpkwuv6gu5yjiskvan7fad.onion',
                'grwp24hodrefzvjjuccrkw3mjq4tzhaaq32amf33dzpmuxe7ilepcmad.onion',
                'osbivz6guyeahrwp2lnwyjk2xos342h4ocsxyqrlaopqjuhwn2djiiyd.onion',
                'u2cvlit75owumwpy4dj2hsmvkq7nvrclkpht7xgyye2pyoxhpmclkrad.onion',
                'euxxcnhsynwmfidvhjf6uzptsmh4dipkmgdmcmxxuo7tunp3ad2jrwyd.onion'
            ]
        }
    }
 
    async instancesAsync() {
        return fetch('https://docs.invidious.io/instances/').then(r => r.text()).then(c => {
            let list = [...new DOMParser().parseFromString(c, 'text/html').querySelectorAll('.md-main .md-content__inner ul li a:not([href*="stat"], [href*="git"], [href*="uptime."])')].map(e => e.href), stand = [], onion = []
            list.forEach(e => e.endsWith('.onion/') ? onion.push(e.replace('http://', '').replace('/', '')) : stand.push(e.replace('https://', '').replace('http://', '').replace('/', '')))
            return {
                standard: stand,
                onion: onion
            }
        })
    }
 
    videoInfo(id = this.id, host = this.host) {
        if(!id||id.length !== 11) throw new Error('Invalid Video Id')
        return {
            source: {
                hd720: {
                    standard: `https://${host}/latest_version?id=${id}&itag=22`,
                    proxified: `https://${host}/latest_version?id=${id}&itag=22&local=true`
                },
                medium: {
                    standard: `https://${host}/latest_version?id=${id}&itag=18`,
                    proxified: `https://${host}/latest_version?id=${id}&itag=18&local=true`
                }
            },
            thumbnail: {
                perview: {
                    default: `https://${host}/vi/${id}/default.jpg`,
                    hq: `https://${host}/vi/${id}/hqdefault.jpg`,
                    mq: `https://${host}/vi/${id}/mqdefault.jpg`,
                    sd: `https://${host}/vi/${id}/sddefault.jpg`,
                    maxres: `https://${host}/vi/${id}/maxres.jpg`,
                    maxresDefault: `https://${host}/vi/${id}/maxresdefault.jpg`
                },
                content: {
                    hq: {
                        hq1: `https://${host}/vi/${id}/hq1.jpg`,
                        hq2: `https://${host}/vi/${id}/hq2.jpg`,
                        hq3: `https://${host}/vi/${id}/hq3.jpg`
                    },
                    default: {
                        0: `https://${host}/vi/${id}/1.jpg`,
                        1: `https://${host}/vi/${id}/2.jpg`,
                        2: `https://${host}/vi/${id}/3.jpg`
                    }
                }
            },
            captions: `https://${host}/api/v1/captions/${id}`
        }
    }
 
    get() {
        async function getJson(url) {
            return fetch(url).then(r => r.json()).then(c => c).catch(e => {
                console.error(new Error(e))
            })
        }
        return {
            async video(id = this.id, options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/videos/${id}?fields=title,videoId,videoThumbnails,description,descriptionHtml,published,publishedText,idwords,viewCount,likeCount,dislikeCount,paid,premium,isFamilyFriendly,allowedRegions,genre,genreUrl,author,authorId,authorUrl,authorThumbnails,subCountText,lengthSeconds,allowRatings,rating,liveNow,isUpcoming,premiereTimestamp,hlsUrl,adaptiveFormats,formatStreams,captions,recommendedVideos${options.region ? '&region=' + options.region :''}`)
            }, // region e.g. "US"
            async comments(id = this.id, options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/comments/${id}?fields=commentCount,videoId,comments,continuation${options.sort ? '&sort_by=' + options.sort : ''}${options.source ? '&source=' + options.source : ''}`)
            }, // sort: "top", "new" (default: "top"); source: "youtube", "reddit" (default: youtube)
            async captions(id = this.id, host = this.host) {
                return getJson(`https://${host}/api/v1/captions/${id}`)
            },
            async mixes(id = this.id, host = this.host) {
                return getJson(`https://${host}/api/v1/mixes/${id}`)
            },
            async search(query = '', options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/search?q=${query}
                ${options.page ? '&page=' + options.page : ''}
                ${options.sort ? '&sort_by' + options.sort : ''}
                ${options.date ? '&date=' + options.date : ''}
                ${options.duration ? '&duration=' + options.duration : ''}
                ${options.type ? '&type=' + options.type : ''}
                ${options.features ? '&features=' + options.features : ''}
                ${options.region ? '&region=' + options.region : ''}
                `.replaceAll('\n', ''))
            },
            async searchSuggestions(query = '', host = this.host) {
                return getJson(`https://${host}/api/v1/search/suggestions?q=${query}`)
            },
            async playlists(id = '', options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/playlists/${id}${options.page ? '&page' + options.page : ''}`)
            }, // page: Int32
            async channel(id = this.id, options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/channels/${id}${options.sort ? '?sort_by=' + options.sort : ''}`)
            }, // sort_by: "newest", "oldest", "popular" (default: newest)
            async channelVideos(id = this.id, options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/channels/videos/${id}${options.sort ? '?sort_by=' + options.sort : '?sort_by=newest'}`)
            },
            async channelPlaylists(id = this.id, options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/channels/playlists/${id}${options.page ? '?page=' + options.page : ''}`)
            }, // page: Int32
            async channelComments(id = this.id, host = this.host) {
                return getJson(`https://${host}/api/v1/channels/comments/${id}`)
            },
            async channelSearch(id = this.id, options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/channels/search/${id}?q=
                ${options.q ? options.q : ''}
                ${options.page ? '&page=' + options.page : ''}
                `.replaceAll('\n', ''))
            }, // page: Int32
            async trending(options = {}, host = this.host) {
                return getJson(`https://${host}/api/v1/trending/${options.region ? `?region=${options.region}` : '?region=US'}${options.type ? '&type=' + options.type : ''}`)
            }, // type: "music", "gaming", "news", "movies"; region e.g. "US"
            async popular(host = this.host) {
                return getJson(`https://${host}/api/v1/popular/`)
            },
            async stats(host = this.host) {
                return getJson(`https://${host}/api/v1/stats/?fields=version,software,openRegistrations,usage,metadata`)
            }
        }
    }
}
 
// Example
// const INV = new Invidious('invidious.snopyta.org', 'X-4U-vzScbw')