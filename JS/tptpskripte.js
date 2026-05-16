//---------------------------------vvvv SKRIPTA ZA KONTAKT FORMU vvv --------------------------------------------------------
const forma = document.getElementById('kontakt-forma');
forma.addEventListener('submit', function(event){
event.preventDefault();
let jeIspravno = true;
const ime = document.getElementById('Ime');
const prezime = document.getElementById('Prezime');
const email = document.getElementById('email');
const telefon = document.getElementById('telefon');
const tema = document.getElementById('tema');
const poruka = document.getElementById('poruka');
const imeGreska = document.getElementById('Ime-greska');
const prezimeGreska = document.getElementById('Prezime-greska');
const emailGreska = document.getElementById('email-greska');
const telefonGreska = document.getElementById('telefon-greska');
const temaGreska = document.getElementById('tema-greska');
const porukaGreska = document.getElementById('poruka-greska');
ukloniGresku (ime, imeGreska);
if (ime.value.trim() === ''){
    prikaziGresku (ime, imeGreska, 'Molimo popunite ovo polje');
    jeIspravno = false;
}
ukloniGresku(prezime, prezimeGreska);
if( prezime.value.trim() === ''){
    prikaziGresku (prezime, prezimeGreska, 'Molimo popunite ovo polje');
    jeIspravno = false;
}
ukloniGresku (email, emailGreska);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (email.value.trim() === ''){
    prikaziGresku (email, emailGreska, 'Molimo popunite ovo polje');
    jeIspravno = false;
}else if(!emailRegex.test(email.value)){
    prikaziGresku(email, emailGreska, 'Molimo ispravno upisite mail');
    jeIspravno = false;
}
ukloniGresku (telefon, telefonGreska);
const telefonRegex = /^[0-9\s\-]+$/;
if(telefon.value.trim() === ''){
    prikaziGresku(telefon, telefonGreska, 'Molimo popunite ovo polje');
    jeIspravno = false;
}else if(!telefonRegex.test(telefon.value)){
    prikaziGresku (telefon, telefonGreska, 'Molimo ispravno unesite broj telefona');
    jeIspravno = false;
}
ukloniGresku (tema, temaGreska);
if(tema.value === ''){
    prikaziGresku (tema, temaGreska, 'Molimo izaberite temu upita');
    jeIspravno = false
}
ukloniGresku (poruka, porukaGreska);
if (poruka.value.trim() === ''){
    prikaziGresku (poruka, porukaGreska, 'Molimo unesite poruku');
    jeIspravno = false;
}
if(jeIspravno){
    const uspjesna = document.getElementById('uspjesna-poruka');
    uspjesna.textContent = 'Hvala '+ ime.value + '! Vaša poruka je poslana';
    uspjesna.style.display = 'block';
    forma.reset(); 
}
})
document.getElementById('reset-dugme').addEventListener('click', function(){
    const uspjesna = document.getElementById('uspjesna-poruka');
    uspjesna.textContent = '';
    uspjesna.style.display = 'none';
})
function prikaziGresku(polje, span, poruka){
span.textContent = poruka;
polje.parentElement.classList.add('polje-greska');
}
function ukloniGresku (polje, span){
    span.textContent = '';
    polje.parentElement.classList.remove('polje-greska');
}
//------------------------------------------^^^ SKRIPTA ZA KONTAKT FORMU ^^^---------------------------------------------
//------------------  vvv SKRIPTA ZA KORPU vvv  -------------------------------------
function dodajUKorpu (naziv, cijena){
let korpa = localStorage.getItem('korpa');
if (korpa === null){
    korpa = [];
}else {
    korpa = JSON.parse(korpa);
}
korpa.push({
    naziv: naziv,
    cijena: cijena
});
localStorage.setItem('korpa', JSON.stringify(korpa));
alert('Proizvod je dodan u korpu!');
}
function prikaziKorpu(){
let korpa = localStorage.getItem('korpa');
if (korpa === null){
    return;
}
korpa = JSON.parse(korpa);
const tabela = document.querySelector('#korpa-tijelo');
tabela.innerHTML = '';
korpa.forEach(function(proizvod, index){
const red = document.createElement('tr');
red.innerHTML= `
<td>${proizvod.naziv}</td>
<td>${proizvod.cijena}</td>
<td><a href = "#">Ukloni</a></td>
`;
const ukloniLink = red.querySelector('a');
ukloniLink.addEventListener('click', function (e){
    e.preventDefault();
    ukloniIzKorpe(index);
});
tabela.appendChild(red);
});
let ukupno = 0;
korpa.forEach(function(proizvod){
    const cijena = parseFloat(proizvod.cijena);
    ukupno += cijena;
});
document.getElementById('ukupno').textContent = ukupno.toFixed(2) + ' KM';
};
prikaziKorpu();
function ukloniIzKorpe (index){
    let korpa = JSON.parse(localStorage.getItem('korpa'));
    korpa.splice(index, 1);
    localStorage.setItem('korpa', JSON.stringify(korpa));
    prikaziKorpu();
}