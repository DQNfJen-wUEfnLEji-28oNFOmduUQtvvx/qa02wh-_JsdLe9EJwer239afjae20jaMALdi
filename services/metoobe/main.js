let ubis = [];
let gmap = {true: 'Video', false: 'Audio'}
let vdinstances = ['vid.puffyan.us', 'invidious.namazso.eu', 'inv.riverside.rocks', 'youtube.076.ne.jp', 'yt.artemislena.eu', 'invidious.weblibre.org', 'invidious.esmailelbob.xyz', 'invidious.lunar.icu', 'invidious.projectsegfau.lt', 'inv.bp.projectsegfau.lt', 'y.com.sb', 'invidious.sethforprivacy.com', 'invidious.tiekoetter.com'];
//async function getunblockedinstances(){let e=(new Invidious).instances().standard;for(let n=0;n<e.length;n++)try{await(new Invidious).get().search("beethoven",{page:1},e[n])&&ubis.push(e[n])}catch(e){}}
let vdinstance = vdinstances[Math.floor(Math.random() * vdinstances.length)];
function byId(p){return document.getElementById(p)}

async function searchQuery(t) {
    document.getElementById('searchbutton').disabled = true;
    let as1 = await (new Invidious().get().search(
        t, {
        page: 1,
      }, vdinstance));

      if(as1) {
        
        console.log(as1); 
        //let vidid = answer1[0].videoId;
        nvids = byId('nfetch').value;
        

        for (let i = nvids-1; i > -1; i--) {
            try {
                let cl = 255/nvids;
            let rg = Math.min((255-(i*cl)), ((i*cl)-0));
            //console.log(rg);
            //let vdthumb = '';
            //try{vdthumb = as1[i].videoThumbnails[5].url;}catch(ex){}
            let emj = '👁️';
            let hrf = '';
            try{ hrf = `${as1[i].videoId}`;}catch(ex){}
            if(!byId('type').checked) {hrf += '&audio'; emj = '🎧'}
            let ttl = false;
            if(as1[i].title) {ttl = as1[i].title}
            else{nvids++}
            if(ttl) {
                byId('results').innerHTML=`<br><a style="color:rgb(${255-(i*cl)},${rg*2},${i*cl})" class='resultlink' target='_blank' href='watch?v=${hrf}'>${emj} ${ttl} ↗</a><br>` + byId('results').innerHTML
            }
            } catch (ex) {
                
            }
            
        }

        document.getElementById('searchbutton').disabled = false;

        document.activeElement.blur();

        if(byId('urltext').checked) {
            let er = '';
            try {
                er = '&'+location.search.split('?q=')[1].split('&')[1].replace(/\+/g,' ');
            } catch (ex) {
                
            }
            let num = '&n='+byId('nfetch').value;
            let audio = '';
            if(!byId('type').checked) {audio='&audio'}
            
            let loc = `?q=${t.replace(/\s/g,'+')}`+num+audio;
            window.history.pushState({}, t, loc);
        }

       // let sect = document.createElement('section'), prarp;

       /* for (let i = 0; i < nvids; i++) {
            let vidid = answer1[i].videoId;

            let map = {false: 'Audio', true: 'Video'};

            let srcmap = {false: 1, true: 0}

            let type = map[byId('type').checked];

            let audio = document.createElement(type);
            audio.controls = true;

            let src1 = document.createElement('source');
            let src2 = document.createElement('source');
            let src3 = document.createElement('source');

            if(!byId('type').checked){
            try{ src1.src = answer2.formatStreams[0].url;
            src2.src = answer2.formatStreams[1].url;
            src3.src = answer2.formatStreams[2].url;
            }
            catch(ex){}
            }
            else{
               try{ src3.src = answer2.formatStreams[0].url;
                src1.src = answer2.formatStreams[2].url;
                src2.src = answer2.formatStreams[1].url;
               }
               catch(ex){}
            }

            audio.appendChild(src1); audio.appendChild(src2); audio.appendChild(src3);
            

            let pwrap = document.createElement('div');
            pwrap.classList.add('vidcontainer');
            let title = document.createElement('details');
            title.innerHTML = `<summary class="title">${answer2.title}</summary><p>${answer2.descriptionHtml}</p>`;

            pwrap.appendChild(title); pwrap.appendChild(audio); pwrap.appendChild(document.createElement('br'));

            pwrap.innerHTML+=`<br>`;

            prarp = pwrap;

            
        }

            sect.appendChild(prarp);

            byId('results').prepend(sect);*/


            
        
      
        
    
    }
}


byId('search').addEventListener('keydown', function(e) {
   // if(e.which == 13) {searchQuery(byId('search').value)}
})

window.onload = function() {
    if(location.search.indexOf('?q=')>-1) {
        let query = location.search.split('?q=')[1].split('&')[0].replace(/\+/g,' ');
        byId('search').value = query;
        try{let num = Math.floor(parseFloat(location.search.split('&n=')[1].split('&')[0]));
        byId('nfetch').value = num;
        let audio = location.search.indexOf('&audio')<0;
        byId('type').checked = audio;
        byId('type').previousElementSibling.innerHTML = gmap[byId('type').checked]}catch(ex){}
        searchQuery(query);
        //document.write(`<video controls src='https://${vdinstance}/latest_version?id=${id}&itag=18&local=true'></video>`)
    }
}

function byId(p) {
    return document.getElementById(p);
}

