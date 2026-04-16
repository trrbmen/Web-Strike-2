const ASSETS = {
    intro: {
        gif: "https://www.mediafire.com/view/fnbru5u0jg25zgf/gameintro.gif/file",
        mp3: "https://www.mediafire.com/file/6r4o2boyvx9t1ya/gameintro.mp3/file"
    },
    menu: {
        ost: "https://www.mediafire.com/file/1d2facxjr6udep7/mainmenuost.mp3/file"
    },
    knife: {
        idle: "https://www.mediafire.com/view/jik7zg7qnw74en8/tknifeidle.gif/file",
        inspect: "https://www.mediafire.com/view/zgp11qxiaq80cvm/tknifeinspect.gif/file",
        switch: "https://www.mediafire.com/view/wa2lhcb3ewa98rb/tknifeswitch.gif/file",
        attack: ["https://www.mediafire.com/view/5eikkqryuxkdtne/tknifestab1.gif/file", "https://www.mediafire.com/view/g2aue7g73267632/tknifestab2.gif/file"],
        heavy: "https://www.mediafire.com/view/tgldh6rmzu9kkwp/tknifestab3.gif/file",
        sfx_stab: "https://www.mediafire.com/file/ejbs1dxg0inwvpj/tknifestab.mp3/file",
        sfx_switch: "https://www.mediafire.com/file/9p5il4nd86o9zg3/tknifeswitch.mp3/file"
    },
    deagle: {
        price: 800,
        idle: "https://www.mediafire.com/view/pjy0vmfodutwu9m/deserteagleidle.png/file",
        inspect: ["https://www.mediafire.com/view/rv7b885mj1rhsg7/deserteagleinspect.gif/file", "https://www.mediafire.com/view/jcicg6next0zzgr/deserteagleinspect2.gif/file"],
        reload: "https://www.mediafire.com/view/xwtlawcgb7dv2wy/deserteaglereload.gif/file",
        shot: "https://www.mediafire.com/view/lo218lwy02b3jsv/deserteagleshot.gif/file",
        switch: "https://www.mediafire.com/view/av5zq33avnha818/deserteagleswitch.gif/file",
        walk_start: "https://www.mediafire.com/view/3cu8g3uqai8acf5/deserteaglewalkstart.gif/file",
        walk_loop: "https://www.mediafire.com/view/64egmex8jlzhgif/deserteaglewalk.gif/file",
        walk_stop: "https://www.mediafire.com/view/plv1dbn8chvmtjs/deserteaglewalkstop.gif/file",
        sfx_shot: "https://www.mediafire.com/file/cmoh53gv0nx3sxb/deserteagleshot.mp3/file",
        sfx_reload: "https://www.mediafire.com/file/4v5u0o4zf4jty7v/deserteaglereload.mp3/file"
    }
};

let playerMoney = 800;
let currentWeapon = 'knife';
let isMoving = false;

window.addEventListener('load', () => {
    const introAudio = new Audio(ASSETS.intro.mp3);
    introAudio.play();

    setTimeout(() => {
        document.getElementById('intro-screen').classList.add('hidden');
        const menu = document.getElementById('main-menu');
        menu.classList.remove('hidden');
        menu.style.opacity = "1";
        
        const menuAudio = new Audio(ASSETS.menu.ost);
        menuAudio.loop = true;
        menuAudio.play();
    }, 5000);
});

document.getElementById('btn-play').addEventListener('click', () => {
    document.getElementById('play-options').classList.remove('hidden');
});

function handleWeaponSwitch(slot) {
    let weaponImg = document.getElementById('weapon-view');
    let sfx;

    if(slot === '3') {
        currentWeapon = 'knife';
        weaponImg.src = ASSETS.knife.switch;
        sfx = new Audio(ASSETS.knife.sfx_switch);
    } else if(slot === '2') {
        currentWeapon = 'deagle';
        weaponImg.src = ASSETS.deagle.switch;
        sfx = new Audio(ASSETS.deagle.sfx_switch);
    }
    sfx.play();
}

document.addEventListener('keydown', (e) => {
    if(['w','a','s','d'].includes(e.key.toLowerCase())) {
        if(!isMoving && currentWeapon === 'deagle') {
            isMoving = true;
            document.getElementById('weapon-view').src = ASSETS.deagle.walk_start;
            setTimeout(() => {
                if(isMoving) document.getElementById('weapon-view').src = ASSETS.deagle.walk_loop;
            }, 500);
        }
    }

    if(e.key === '1') handleWeaponSwitch('1');
    if(e.key === '2') handleWeaponSwitch('2');
    if(e.key === '3') handleWeaponSwitch('3');
});

document.addEventListener('keyup', (e) => {
    if(['w','a','s','d'].includes(e.key.toLowerCase())) {
        isMoving = false;
        if(currentWeapon === 'deagle') {
            document.getElementById('weapon-view').src = ASSETS.deagle.walk_stop;
        }
    }
});
