import type { APIContext } from 'astro';
import type { APIRoute } from 'astro';

export const prerender = false;


export const POST = async ( context ) => {

    const data = await context.request.formData()
    const accessToken = context.locals.runtime.env.HUBSPOT_ACCESS_TOKEN

    const fileOptions = {
        access: "PUBLIC_NOT_INDEXABLE",
        overwrite: false
    }

    const filesArray = []

    for (const field of data) {
        const fileData = new FormData()
        fileData.append('file', field[1])
        fileData.append('folderId', '175691721894')
        fileData.append('options', JSON.stringify(fileOptions))

        const res = await fetch(`https://api.hubapi.com/filemanager/api/v3/files/upload`, {
            method: "POST",
            body: fileData,
            headers: {
                // "Content-type": "multipart/form-data",
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        if (res.ok) {
            filesArray.push(await res.json())
        } else {
            return new Response(
                JSON.stringify({
                    status: res.status,
                    statusText: res.statusText
                })
            )
        }
    }

    return new Response(
        JSON.stringify({
            status: 200,
            data: filesArray
        })
    )
    
}