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

async function sendPart(part)
{
    try
    {
        const response = await fetch(
            APPS_SCRIPT_URL +
            "?part=" +
            encodeURIComponent(part)
        );

        const result = await response.text();

        document.getElementById("status").innerHTML =
            "? Saved: " + part;
    }
    catch(error)
    {
        document.getElementById("status").innerHTML =
            "? Send error";
    }
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

    sendPart(part);
}

const scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,
        qrbox: 250
    }
);

scanner.render(onScanSuccess);