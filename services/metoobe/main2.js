let ubis = [];
let gmap = {true: 'Video', false: 'Audio'}
let vdinstances = ['vid.puffyan.us', 'invidious.namazso.eu', 'inv.riverside.rocks', 'youtube.076.ne.jp', 'yt.artemislena.eu', 'invidious.weblibre.org', 'invidious.esmailelbob.xyz', 'invidious.lunar.icu', 'invidious.projectsegfau.lt', 'inv.bp.projectsegfau.lt', 'y.com.sb', 'invidious.sethforprivacy.com', 'invidious.tiekoetter.com'];
//async function getunblockedinstances(){let e=(new Invidious).instances().standard;for(let n=0;n<e.length;n++)try{await(new Invidious).get().search("beethoven",{page:1},e[n])&&ubis.push(e[n])}catch(e){}}
let vdinstance = vdinstances[Math.floor(Math.random() * vdinstances.length)];
function byId(p){return document.getElementById(p)}

async function searchQuery(t) {
    let answer1 = await (new Invidious().get().search(
        t, {
        page: 1,
      }, vdinstances[Math.floor(Math.random() * vdinstances.length)]));

      if(answer1) {
        
        console.log(answer1); 
        //let vidid = answer1[0].videoId;
        nvids = byId('nfetch').value;

        let sect = document.createElement('section'), prarp;

        for (let i = 0; i < nvids; i++) {
            let vidid = answer1[i].videoId;

            let answer2 =  await (new Invidious().get().video(vidid, undefined, vdinstances[Math.floor(Math.random() * vdinstances.length)]));

        if(answer2) {
            console.log(answer2);

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

            byId('results').prepend(sect);


            
        }
      
        
    
    }
}


byId('search').addEventListener('keydown', function(e) {
   // if(e.which == 13) {searchQuery(byId('search').value)}
})

window.onload = function() {
    if(location.search.indexOf('?')>-1) {
        let id = location.search.replace('?','');
        document.write(`<video controls src='https://${vdinstance}/latest_version?id=${id}&itag=18&local=true'></video>`)
    }
}