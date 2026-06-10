const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzprO3pp1DOWD3mAkpyIrgO1BK2EBm8wqshg38ZFotTo0olWlMY94DgUUgkNYNOhYFWQg/exec";
	

function extractPart(text)
{
    let match = text.match(/Part=([^;]+)/i);

    if (match)
        return match[1].trim();

    match = text.match(/Component=([^;]+)/i);

    if (match)
        return match[1].trim();

    return null;
}

function sendPart_getReq(part) {
    const img = new Image();
    img.src = APPS_SCRIPT_URL + "?part=" + encodeURIComponent(part);

    document.getElementById("status").innerHTML =
        "✔ Sent: " + part;
}

function onScanSuccess(decodedText)
{
 //   const part = extractPart(decodedText);
 const part = (decodedText);

    if (!part)
    {
        document.getElementById("status").innerHTML =
            "Cant find part number";
        return;
    }

    sendPart_getReq(part);
}

const scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,
        qrbox: 250
    }
);

scanner.render(onScanSuccess);