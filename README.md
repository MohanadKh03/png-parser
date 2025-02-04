# PNG Parser - A Simple PNG Format Parser

This project is a **dummy/demo implementation** of the PNG format specification based on the [W3C PNG Specification](https://www.w3.org/TR/png/) for **learning purposes**. It provides a basic understanding of how to parse a PNG file, read its header, and interpret the associated chunks, focusing on extracting and processing the essential data like image width, height, and chunk types.

## Overview

The PNG (Portable Network Graphics) format is a widely-used image format that uses lossless compression. This parser aims to demonstrate the basic principles of reading and decoding a PNG file by interpreting the signature and reading important chunks like **IHDR**, **IDAT**, etc., with the following key features:

- **PNG Signature Verification**: Ensure the file is a valid PNG file by checking its signature.
- **IHDR Chunk Parsing**: Read the image header data (width, height, color type, etc.).
- **Chunk Type and Data Extraction**: Extract chunk lengths, types, and CRC values.

This implementation is primarily for educational purposes to help understand how PNG files are structured.

## Features

- Validate PNG file signature
- Read image header (IHDR) chunk: width, height, color type, etc.
- Display information about the PNG file, including chunk data and CRC values
- Simple and extensible structure for further PNG chunk parsing

## Requirements

- **Node.js (v22.13.1 or higher)**: This implementation uses modern JavaScript (ES6+ features).
- **fs module**: Used to read PNG files from the file system.


## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/png-parser.git
```

### 2. Navigate to the project directory:

```bash
cd png-parser
```

## Usage

### 1. Run the script with the `--path` argument to specify the PNG file path:

You can run the script by passing the relative file path of the PNG file you want to process as an argument using the following CLI command:

```bash
node main.js --path=./PostgreSQL.png
```

### 2. Check if the file exists:

The script will check if the provided file path exists and verify that the file has a valid PNG signature. If the file is not found or the signature is invalid, it will exit with an error.

### Example run:

```bash
node main.js --path=./example.png
```

This command will:

1. Check if the PNG signature is valid.
2. Parse the file and output details like image width, height, and other relevant information.


## Resources
- https://progbook.org/png.html
- https://nodejs.org/api/buffer.html
