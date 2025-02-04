import fs from 'fs';

// PNG signature constant (first 8 bytes of the PNG file)
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

function isValidPNGSignature(buffer) {
    return buffer.compare(PNG_SIGNATURE, 0, 8, 0, 8) === 0;
}

function readIHDRChunkData(buffer, offset) {
    const chunkLength = buffer.readUInt32BE(offset);
    const chunkType = buffer.toString('utf8', offset + 4, offset + 8);
    
    // IHDR Chunk Data 
    const width = buffer.readUInt32BE(offset + 8);
    const height = buffer.readUInt32BE(offset + 12);
    const sizeOfColorByte = buffer.readUInt8(offset + 16);
    const colorType = buffer.readUInt8(offset + 17);
    const compressionMethod = buffer.readUInt8(offset + 18);
    const filterMethod = buffer.readUInt8(offset + 19);


    const CRC = buffer.readUInt32BE(offset + 8 + chunkLength);

    return {
        chunkLength,
        chunkType,
        width,
        height,
        sizeOfColorByte,
        colorType,
        compressionMethod,
        filterMethod,
        CRC
    };
}

function processPNG(filePath) {
    const imageBuffer = fs.readFileSync(filePath);
    try {
        if (!isValidPNGSignature(imageBuffer)) {
            throw new Error('Invalid PNG file signature. The file may not be a valid PNG or is corrupted.');
        }
    } catch (e) {
        console.error('Error:', e.message);
        console.error('Stack trace:', e.stack);
        process.exit(1);
    }
    

    const startByteOffset = 8; // First offset after the 4 PNG signature bytes
    const IHDRData = readIHDRChunkData(imageBuffer, startByteOffset);

    // Log the extracted IHDR data
    console.log("<======= IHDR Chunk Data =======>");

    console.log("Chunk Length:", IHDRData.chunkLength);
    console.log("Width:", IHDRData.width);
    console.log("Height:", IHDRData.height);
    console.log("Color Byte Size:", IHDRData.sizeOfColorByte);
    console.log("Color Type:", IHDRData.colorType);
    console.log("Compression Method:", IHDRData.compressionMethod);
    console.log("Filter Method:", IHDRData.filterMethod);
    console.log("Chunk Type:", IHDRData.chunkType);
    console.log("CRC:", IHDRData.CRC);
}


function main () {
    const args = process.argv.slice(2);

    let filePath = null;

    args.forEach(arg => {
        if (arg.startsWith('--path=')) {
            filePath = arg.split('=')[1];
        }
    });

    if (!filePath) {
        console.error('File path is missing. Please provide the --path argument.');
        process.exit(1);
    }

    if (!fs.existsSync(filePath)) {
        console.error(`The file at path ${filePath} does not exist.`);
        process.exit(1);
    }

    processPNG(filePath);
    
}

main()
