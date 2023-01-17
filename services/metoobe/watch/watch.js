let vdinstances = ['vid.puffyan.us', 'invidious.namazso.eu', 'inv.riverside.rocks', 'youtube.076.ne.jp', 'yt.artemislena.eu', 'invidious.weblibre.org', 'invidious.lunar.icu', 'invidious.projectsegfau.lt', 'inv.bp.projectsegfau.lt', 'y.com.sb', 'invidious.sethforprivacy.com', 'invidious.tiekoetter.com'];
let vdinstance = vdinstances[Math.floor(Math.random() * vdinstances.length)];


window.onload = function() {

    if(location.search.indexOf('?v=')>-1) {
        let id = location.search.replace(/(\?v=)/g,'').split('&')[0];
        let proxy = '';
        if (location.search.indexOf('&proxy')>-1) {proxy='&local=true'};
        let video = 'video';
        if(location.search.indexOf('&audio')>-1) {video = 'audio'}
        
        
        document.body.innerHTML=`<${video} autofocus="" autoplay="true" controls src='https://${vdinstance}/latest_version?id=${id}&itag=18${proxy}'></${video}>`;

        window.onkeydown = function(e) {
            if(e.which==74) {document.querySelector(video).currentTime-=10}
            if(e.which==75) {if(document.querySelector(video).paused){document.querySelector(video).play()}else{document.querySelector(video).pause()}}
            if(e.which==76) {document.querySelector(video).currentTime+=10}
            if(e.which==70) {requestFullScreen(document.querySelector(video))}
        }

        let ct = '0';
        if(location.search.indexOf('&t=')>-1) {ct=location.search.split('&t=')[1].split('&')[0];}
        let pbr = '1';
        if(location.search.indexOf('&speed=')>-1) {pbr=location.search.split('&speed=')[1].split('&')[0];}

        document.querySelector(video).currentTime = ct;
        document.querySelector(video).playbackRate = pbr;
        

        let atp = location.search.indexOf('&playnext')>-1;

        if(atp) {
           async function getvinfo() {
            let vinfo = await (new Invidious().get().video(id, undefined, vdinstance))
            

            if(vinfo) {

                let nextvid = vinfo.recommendedVideos[0].videoId;

               // console.log(nextvid);



                document.querySelector(video).onpause = function() {
                    if(document.querySelector(video).currentTime == document.querySelector(video).duration) {
                        console.log('test');
                        setTimeout(() => {
                            window.location = location.href.replace(id,nextvid)
                        }, 2000);
                    }
                }





                return vinfo;
            }
            else {
                return false
            }
            
            }

            

        

           getvinfo();


            
             

        }

    }
}




function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}