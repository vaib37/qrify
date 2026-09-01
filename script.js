/* ========================================
   ELEMENTS
======================================== */

const input =
    document.getElementById("text-input");

const generateButton =
    document.getElementById("generate-btn");

const clearButton =
    document.getElementById("clear-btn");

const downloadButton =
    document.getElementById("download-btn");

const copyButton =
    document.getElementById("copy-btn");

const qrCode =
    document.getElementById("qr-code");

const emptyState =
    document.getElementById("empty-state");

const statusText =
    document.querySelector(".status span:last-child");


/* ========================================
   CUSTOMIZATION
======================================== */

const sizeInput =
    document.getElementById("qr-size");

const sizeValue =
    document.getElementById("size-value");

const qrColor =
    document.getElementById("qr-color");

const qrColorValue =
    document.getElementById("qr-color-value");

const qrBackground =
    document.getElementById("qr-background");

const qrBackgroundValue =
    document.getElementById("qr-background-value");

const errorCorrection =
    document.getElementById("error-correction");


/* ========================================
   CONTRAST
======================================== */

const contrastStatus =
    document.getElementById("contrast-status");

const contrastMessage =
    document.getElementById("contrast-message");


/* ========================================
   STATE
======================================== */

let currentText = "";


/* ========================================
   SIZE DISPLAY
======================================== */

sizeInput.addEventListener(
    "input",
    () => {

        sizeValue.textContent =
            `${sizeInput.value}px`;

    }
);


/* ========================================
   QR COLOR DISPLAY
======================================== */

qrColor.addEventListener(
    "input",
    () => {

        qrColorValue.textContent =
            qrColor.value.toUpperCase();

        updateContrast();

    }
);


/* ========================================
   BACKGROUND DISPLAY
======================================== */

qrBackground.addEventListener(
    "input",
    () => {

        qrBackgroundValue.textContent =
            qrBackground.value.toUpperCase();

        updateContrast();

    }
);


/* ========================================
   COLOR → LUMINANCE
======================================== */

function getLuminance(hex) {

    const cleanHex =
        hex.replace("#", "");


    const red =
        parseInt(
            cleanHex.substring(0, 2),
            16
        ) / 255;


    const green =
        parseInt(
            cleanHex.substring(2, 4),
            16
        ) / 255;


    const blue =
        parseInt(
            cleanHex.substring(4, 6),
            16
        ) / 255;


    const channels = [
        red,
        green,
        blue
    ].map((value) => {

        if (value <= 0.03928) {

            return value / 12.92;

        }

        return Math.pow(
            (value + 0.055) / 1.055,
            2.4
        );

    });


    return (
        0.2126 * channels[0] +
        0.7152 * channels[1] +
        0.0722 * channels[2]
    );

}


/* ========================================
   CONTRAST RATIO
======================================== */

function getContrastRatio(
    color1,
    color2
) {

    const luminance1 =
        getLuminance(color1);

    const luminance2 =
        getLuminance(color2);


    const brighter =
        Math.max(
            luminance1,
            luminance2
        );


    const darker =
        Math.min(
            luminance1,
            luminance2
        );


    return (
        (brighter + 0.05) /
        (darker + 0.05)
    );

}


/* ========================================
   UPDATE CONTRAST
======================================== */

function updateContrast() {

    const ratio =
        getContrastRatio(
            qrColor.value,
            qrBackground.value
        );


    contrastStatus.classList.remove(
        "good",
        "warning",
        "bad"
    );


    if (ratio >= 7) {

        contrastStatus.classList.add(
            "good"
        );

        contrastMessage.textContent =
            `✓ Excellent contrast — ${ratio.toFixed(1)}:1`;

    }

    else if (ratio >= 4.5) {

        contrastStatus.classList.add(
            "good"
        );

        contrastMessage.textContent =
            `✓ Good contrast — ${ratio.toFixed(1)}:1`;

    }

    else if (ratio >= 3) {

        contrastStatus.classList.add(
            "warning"
        );

        contrastMessage.textContent =
            `⚠ Low contrast — ${ratio.toFixed(1)}:1`;

    }

    else {

        contrastStatus.classList.add(
            "bad"
        );

        contrastMessage.textContent =
            `⚠ Very low contrast — ${ratio.toFixed(1)}:1`;

    }

}


/* ========================================
   PREPARE CONTENT
======================================== */

function prepareContent(text) {

    /*
     * Already has a protocol.
     */

    if (
        text.startsWith("http://") ||
        text.startsWith("https://") ||
        text.startsWith("mailto:") ||
        text.startsWith("tel:")
    ) {

        return text;

    }


    /*
     * Looks like a domain.
     *
     * github.com/vaib37
     * becomes
     * https://github.com/vaib37
     */

    if (
        text.includes(".") &&
        !text.includes(" ")
    ) {

        return `https://${text}`;

    }


    /*
     * Normal text.
     */

    return text;

}


/* ========================================
   ERROR CORRECTION
======================================== */

function getCorrectionLevel(value) {

    switch (value) {

        case "L":

            return QRCode.CorrectLevel.L;


        case "M":

            return QRCode.CorrectLevel.M;


        case "Q":

            return QRCode.CorrectLevel.Q;


        case "H":

            return QRCode.CorrectLevel.H;


        default:

            return QRCode.CorrectLevel.M;

    }

}


/* ========================================
   GENERATE QR
======================================== */

function generateQR() {

    const rawText =
        input.value.trim();


    /*
     * Empty input
     */

    if (rawText === "") {

        input.focus();

        statusText.textContent =
            "Enter content";

        return;

    }


    /*
     * Prepare content
     */

    const text =
        prepareContent(rawText);


    /*
     * Read customization
     */

    const size =
        Number(sizeInput.value);

    const foreground =
        qrColor.value;

    const background =
        qrBackground.value;

    const correction =
        getCorrectionLevel(
            errorCorrection.value
        );


    /*
     * Clear previous QR
     */

    qrCode.innerHTML = "";


    /*
     * Generate QR
     */

    try {

        new QRCode(qrCode, {

            text: text,

            width: size,

            height: size,

            colorDark: foreground,

            colorLight: background,

            correctLevel: correction

        });

    }

    catch (error) {

        console.error(
            "QR generation failed:",
            error
        );

        statusText.textContent =
            "Generation failed";

        return;

    }


    /*
     * Store current content
     */

    currentText =
        text;


    /*
     * Hide empty state
     */

    emptyState.style.display =
        "none";


    /*
     * Update status
     */

    statusText.textContent =
        "Generated";


    /*
     * Button feedback
     */

    const buttonText =
        generateButton.querySelector("span");


    buttonText.textContent =
        "Generated ✓";


    setTimeout(() => {

        buttonText.textContent =
            "Generate QR";

    }, 1500);

}


/* ========================================
   GENERATE BUTTON
======================================== */

generateButton.addEventListener(
    "click",
    generateQR
);


/* ========================================
   ENTER TO GENERATE
======================================== */

input.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            generateQR();

        }

    }
);


/* ========================================
   CLEAR
======================================== */

clearButton.addEventListener(
    "click",
    () => {

        input.value = "";

        qrCode.innerHTML = "";

        emptyState.style.display =
            "flex";

        currentText = "";

        statusText.textContent =
            "Ready";

        generateButton
            .querySelector("span")
            .textContent =
            "Generate QR";

        input.focus();

    }
);


/* ========================================
   DOWNLOAD
======================================== */

downloadButton.addEventListener(
    "click",
    () => {

        /*
         * QRCode.js normally creates a canvas.
         * Download the actual canvas pixels instead
         * of relying on the generated <img> URL.
         */

        const canvas =
            qrCode.querySelector("canvas");


        if (canvas) {

            try {

                const imageURL =
                    canvas.toDataURL("image/png");


                const link =
                    document.createElement("a");


                link.href =
                    imageURL;


                link.download =
                    "qrify.png";


                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);


                statusText.textContent =
                    "Downloaded";

                return;

            }

            catch (error) {

                console.error(
                    "Canvas download failed:",
                    error
                );

            }

        }


        /*
         * Fallback for browsers where QRCode.js
         * creates an <img> instead of a canvas.
         */

        const qrImage =
            qrCode.querySelector("img");


        if (
            qrImage &&
            qrImage.src &&
            qrImage.src.startsWith("data:image/")
        ) {

            const link =
                document.createElement("a");


            link.href =
                qrImage.src;


            link.download =
                "qrify.png";


            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);


            statusText.textContent =
                "Downloaded";

            return;

        }


        statusText.textContent =
            "Generate a QR first";

    }
);


/* ========================================
   COPY QR
======================================== */

copyButton.addEventListener(
    "click",
    async () => {

        const qrImage =
            qrCode.querySelector("img");


        if (!qrImage) {

            statusText.textContent =
                "Generate a QR first";

            return;

        }


        try {

            const response =
                await fetch(qrImage.src);


            const blob =
                await response.blob();


            await navigator.clipboard.write([

                new ClipboardItem({

                    [blob.type]: blob

                })

            ]);


            const originalText =
                copyButton.innerHTML;


            copyButton.innerHTML =
                "✓ Copied";


            setTimeout(() => {

                copyButton.innerHTML =
                    originalText;

            }, 1500);

        }

        catch (error) {

            console.error(
                "Copy failed:",
                error
            );

            statusText.textContent =
                "Copy failed";

        }

    }
);


/* ========================================
   INITIALIZE
======================================== */

sizeValue.textContent =
    `${sizeInput.value}px`;

qrColorValue.textContent =
    qrColor.value.toUpperCase();

qrBackgroundValue.textContent =
    qrBackground.value.toUpperCase();

updateContrast();