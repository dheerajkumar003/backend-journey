const baseUrl = "https://jsonplaceholder.typicode.com"
const post1Url = `${baseUrl}/posts/1`
const post99999Url = `${baseUrl}/posts/99999`

const fetchData = async (url) => {
    try {
        const resp = await fetch(url)
        if (!resp?.ok) {
            throw new Error(`Request failed with status ${resp.status}`)
        } else {
            console.log("🚀 ~ fetchData ~ status:", resp?.status)
            const data = await resp?.json()
            console.log("🚀 ~ fetchData ~ data:", data)
        }
    } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error)
    }
}

// fetchData(post1Url)
// fetchData(post99999Url)

// We get both data and status 200 (success) for "/posts/1" 

// We get status 404 which means not data found with id 99999 and the data object it empty 


const postNewRequest = async () => {
    try {
        const data = {
            title: "New Post",
            body:"This is a new post resquest",
            userId:99999999
        }
        const res = await fetch(`${baseUrl}/posts`, {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!res.ok) {                                                    // ← ADD
            throw new Error(`Request failed with status ${res.status}`)   // ← ADD
        }                                                                 // ← ADD
        console.log("status:", res.status)                                // ← ADD
        const created = await res.json()                                  // ← ADD
        console.log("created:", created) 
    } catch (error) {
        console.log("🚀 ~ postNewRequest ~ error:", error)
    }
}

await postNewRequest()