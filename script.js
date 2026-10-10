// State awal: Tiang A berisi 3 cincin (3=besar, 2=sedang, 1=kecil)
let state = {
    A: [3, 2, 1],
    B: [],
    C: []
};
let selectedPeg = null;
let moves = 0;
let isWon = false;

function render() {
    ['A', 'B', 'C'].forEach(peg => {
        const container = document.getElementById(`rings-${peg}`);
        container.innerHTML = '';
        const rings = state[peg];
        
        rings.forEach((size, index) => {
            const ringEl = document.createElement('div');
            ringEl.className = `ring ring-${size}`;
            // Menata posisi cincin bertumpuk ke atas
            ringEl.style.bottom = `${18 + (index * 32)}px`;
            
            // Teks dihapus agar cincin polos/hanya warna
            ringEl.innerText = ''; 
            
            container.appendChild(ringEl);
        });

        const pegBox = document.getElementById(`peg-${peg}`);
        if (selectedPeg === peg) {
            pegBox.classList.add('selected');
        } else {
            pegBox.classList.remove('selected');
        }
    });
}

function handlePegClick(peg) {
    if (isWon) return;

    if (selectedPeg === null) {
        // Pilih tiang asal
        if (state[peg].length > 0) {
            selectedPeg = peg;
            document.getElementById('message').innerText = `Tiang ${peg} dipilih. Sekarang klik tiang tujuan!`;
        } else {
            document.getElementById('message').innerText = `Tiang ${peg} kosong! Pilih tiang yang ada cincinnya.`;
        }
    } else {
        if (selectedPeg === peg) {
            // Batalkan pilihan jika klik tiang yang sama
            selectedPeg = null;
            document.getElementById('message').innerText = 'Pilihan dibatalkan.';
            render();
            return;
        }

        // Ambil cincin teratas dari tiang asal
        const sourceRing = state[selectedPeg][state[selectedPeg].length - 1];
        // Cek cincin teratas di tiang tujuan
        const targetTopRing = state[peg].length > 0 ? state[peg][state[peg].length - 1] : 999;

        // Algoritma Validasi Aturan Menara Hanoi
        if (sourceRing < targetTopRing) {
            // Valid: Pindahkan cincin
            state[selectedPeg].pop();
            state[peg].push(sourceRing);
            moves++;
            document.getElementById('message').innerText = `Berhasil! Total langkah: ${moves}`;
            
            // Cek Kondisi Menang (Semua cincin ukuran 3,2,1 ada di tiang C)
            if (state.C.length === 3) {
                isWon = true;
                document.getElementById('message').innerText = `🎉 Yey, Selamat! Kamu menang dalam ${moves} langkah!`;
            }
        } else {
            // Tidak Valid: Melanggar aturan
            document.getElementById('message').innerText = '❌ Ups! Cincin kecil tidak boleh diletakkan di bawah/menimpa cincin besar!';
        }

        selectedPeg = null;
        render();
    }
}

function resetGame() {
    state = { A: [3, 2, 1], B: [], C: [] };
    selectedPeg = null;
    moves = 0;
    isWon = false;
    document.getElementById('message').innerText = 'Game direset. Ayo main lagi!';
    render();
}

// Render pertama kali saat halaman dimuat
render();