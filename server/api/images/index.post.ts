export default defineEventHandler(async (event) => {
    const { files } = await readBody<{ files: File[] }>(event)

    for ( const file of files ) {
        await storeFileLocally(
            file,         // the file object
            8,            // you can add a name for the file or length of Unique ID that will be automatically generated!
            '/userFiles'  // the folder the file will be stored in
        )

        // {OR}

        // Parses a data URL and returns an object with the binary data and the file extension.
        const { binaryString, ext } = parseDataUrl(file.content)
    }

    return 'success!'
})

interface File {
    name: string
    content: string
}
