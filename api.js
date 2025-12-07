const BASE_URL = "http://localhost:8080/api/certificates";

//create
async function addCertificate(cert){
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type: application/json"},
        body: JSON.stringify(cert)
    });
    return await res.json();
}

//GET all
async function getAllCertificates(){
    const res = await fetch(BASE_URL);
    return await res.json();
}

//GET by ID
async function getCertificateById(cid){
    const res = await fetch(`${BASE_URL}/${cid}`);
    return await res.json();
}