function chunk(s: Buffer, maxBytes: number) {
    let buffer = Buffer.from(s);
    const result = [];
    let i = 1;

    if (buffer.byteLength <= maxBytes) return [buffer];

    while (buffer.length) {
        if (buffer.byteLength <= 1) {
            result.push(buffer.slice(0, buffer.length));
            break;
        }

        let temp = buffer.slice(0, i);

        if (buffer.byteLength == temp.byteLength || temp.byteLength >= maxBytes) {
            result.push(buffer.slice(0, i));
            buffer = buffer.slice(i);
            i = 1;
        } else
            i++;

    }
    return result;
}

export default chunk;