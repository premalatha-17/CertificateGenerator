


// ==========================
// CONFIG
// ==========================
const BASE_URL = "http://localhost:8080/api/certificates";
const ADMIN_PASS = "admin123";

// ==========================
// VERIFY PAGE FUNCTIONS
// ==========================

// Verify certificate by ID
async function verifyCertificate() {
    const cidInput = document.getElementById("verifyInput");
    const resultDiv = document.getElementById("verifyResult");

    if (!cidInput) return; // Not verify page

    const cid = cidInput.value.trim();

    if (!cid) {
        resultDiv.innerHTML = "<p style='color:red;'>Please enter a Certificate ID.</p>";
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/${cid}`);
        if (!res.ok) {
            resultDiv.innerHTML = "<p style='color:red;'>Certificate not found.</p>";
            return;
        }

        const cert = await res.json();

        resultDiv.innerHTML = `
            <div style="border:2px solid #333; padding:20px; border-radius:12px; text-align:center; background:#fff; color:#000;">
                <h2>Certificate of Completion</h2>
                <p><strong>Name:</strong> ${cert.name}</p>
                <p><strong>Course:</strong> ${cert.course}</p>
                <p><strong>Date:</strong> ${cert.date}</p>
                <p><strong>Remarks:</strong> ${cert.remarks}</p>
            </div>
        `;
    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = "<p style='color:red;'>Error verifying certificate.</p>";
    }
}

// Use sample certificate
async function scanSample() {
    const input = document.getElementById("verifyInput");
    if (!input) return; // Not verify page

    try {
        const res = await fetch(BASE_URL);
        const list = await res.json();

        if (list.length === 0) {
            alert("No certificates found.");
            return;
        }

        input.value = list[0].cid;
    } catch (err) {
        alert("Error fetching certificates.");
    }
}

// Add event listeners only if elements exist (safe)
if (document.getElementById("verifyBtn")) {
    document.getElementById("verifyBtn").addEventListener("click", verifyCertificate);
}
if (document.getElementById("sampleBtn")) {
    document.getElementById("sampleBtn").addEventListener("click", scanSample);
}

// ==========================
// GENERATE PAGE FUNCTIONS
// ==========================

function generateCID() {
    return "CERT-" + Math.floor(Math.random() * 1000000);
}

async function addCertificate(cert) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cert)
    });
    return await res.json();
}

// Unlock admin
if (document.getElementById("unlockBtn")) {
    document.getElementById("unlockBtn").addEventListener("click", () => {
        const pass = document.getElementById("adminPass").value.trim();
        const form = document.getElementById("generateForm");
        const unlockBox = document.getElementById("unlockContainer");

        if (pass === ADMIN_PASS) {
            form.style.display = "block";
            unlockBox.style.display = "none";
            alert("Admin unlocked!");
        } else {
            alert("Wrong password!");
        }
    });
}

// Generate certificate
if (document.getElementById("generateForm")) {
    document.getElementById("generateForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const cert = {
            name: document.getElementById("studentName").value.trim(),
            course: document.getElementById("course").value.trim(),
            date: document.getElementById("date").value,
            remarks: document.getElementById("remarks").value,
            cid: generateCID()
        };

        updatePreview(cert);
        await addCertificate(cert);

        alert("Certificate generated!");
    });
}

// Update preview
function updatePreview(cert) {
    const preview = document.getElementById("preview");
    if (!preview) return;



//     preview.innerHTML = `
// <div style="
//     width: 900px;
//     margin: auto;
//     padding: 50px;
//     text-align: center;
//     background: #ffffff;
//     border: 10px solid #d4af37;
//     border-radius: 8px;
//     font-family: 'Georgia', serif;
//     color: #000;
// ">

preview.innerHTML = `
<div style="
    width: 900px;
    max-width: 100%;
    box-sizing: border-box;
    margin: auto;
    padding: 50px;
    text-align: center;
    background: #ffffff;
    border: 10px solid #d4af37;
    border-radius: 8px;
    font-family: 'Georgia', serif;
    color: #000;
">


    <h1 style="font-size: 36px; margin-bottom: 10px; font-weight: bold;">
        Certificate of Completion
    </h1>

    <p style="font-size: 18px; margin-bottom: 30px;">
        This certificate is proudly presented to
    </p>

    <h2 style="font-size: 28px; margin-bottom: 20px; font-weight: bold; text-transform: capitalize;">
        ${cert.name}
    </h2>

    <p style="font-size: 20px; margin-bottom: 10px;">
        For successfully completing the course:
    </p>

    <h3 style="font-size: 24px; margin-bottom: 25px; font-weight: bold; text-transform: capitalize;">
        ${cert.course}
    </h3>

    <p style="font-size: 18px; margin-bottom: 10px;">
        <strong>Date:</strong> ${cert.date}
    </p>

    <p style="font-size: 18px; margin-bottom: 10px;">
        <strong>Certificate ID:</strong> ${cert.cid}
    </p>

    <p style="font-size: 18px; margin-top: 20px;">
        <strong>Remarks:</strong> ${cert.remarks || "-"}
    </p>

    <br><br>
    <div style="font-size: 18px; margin-top: 30px; color: #555;">
        Verified & Generated by <strong>CertiVault</strong>
    </div>

</div>
`;
}




// Clear form
if (document.getElementById("clearAllBtn")) {
    document.getElementById("clearAllBtn").addEventListener("click", () => {
        document.getElementById("studentName").value = "";
        document.getElementById("course").value = "";
        document.getElementById("date").value = "";
        document.getElementById("remarks").value = "";
        document.getElementById("preview").innerHTML = "<p>No certificate yet.</p>";
    });
}

// Export all certificates
if (document.getElementById("exportAllBtn")) {
    document.getElementById("exportAllBtn").addEventListener("click", async () => {
        try {
            const certs = await fetch(BASE_URL).then(r => r.json());
            if (!certs.length) {
                alert("No certificates to export.");
                return;
            }

            let csv = "CID,Name,Course,Date,Remarks\n";
            certs.forEach(c => {
                csv += `${c.cid},${c.name},${c.course},${c.date},${c.remarks || "-"}\n`;
            });

            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "certificates.csv";
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Failed to export certificates. Check console for details.");
        }
    });
}


// Download PDF (html2canvas + jsPDF)
if (document.getElementById("downloadPDFBtn")) {
    document.getElementById("downloadPDFBtn").addEventListener("click", async () => {
        const preview = document.getElementById("preview");

        if (!preview || preview.innerText.trim() === "No certificate yet.") {
            alert("No certificate to download.");
            return;
        }

        const { jsPDF } = window.jspdf;

        // Capture the preview section
        const canvas = await html2canvas(preview, { scale: 3 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "pt", "a4");
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 10, 10, pdfW - 20, pdfH - 20);
        pdf.save("certificate.pdf");
    });
}
