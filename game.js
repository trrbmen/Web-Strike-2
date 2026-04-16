const ASSETS = {
    intro: {
        gif: "https://www.mediafire.com/view/fnbru5u0jg25zgf/gameintro.gif/file", 
        mp3: "https://www.mediafire.com/file/6r4o2boyvx9t1ya/gameintro.mp3/file"
    }
    // ... diğer assetler
};

function startEngine() {
    const introImg = document.getElementById('intro-gif');
    const introAudio = new Audio(ASSETS.intro.mp3);

    // Intro ekranını göster ve sesi başlat
    document.getElementById('intro-screen').classList.remove('hidden');
    
    introAudio.play().catch(error => {
        console.log("Ses başlatılamadı, etkileşim bekleniyor.");
    });

    // Intro bittikten sonra menüye geçiş
    setTimeout(() => {
        document.getElementById('intro-screen').style.display = 'none';
        const menu = document.getElementById('main-menu');
        menu.classList.remove('hidden');
        setTimeout(() => { menu.style.opacity = "1"; }, 50);
        
        // Menü müziğini burada başlat
    }, 5000); 
}

// EKLE: Sayfaya tıklandığı an oyunu başlatır (Autoplay engelini aşar)
window.addEventListener('click', () => {
    if (document.getElementById('main-menu').classList.contains('hidden')) {
        startEngine();
    }
}, { once: true });
