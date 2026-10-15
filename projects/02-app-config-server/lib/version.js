export const compareVersions = (a, b) => {
    const partsA = a.split(".").map(Number)    // "1.10.0" → [1, 10, 0]
    const partsB = b.split(".").map(Number)

    for (let i = 0; i < 3; i++) {
        if(partsA[i] < partsB[i]) {
            return -1
        } else if (partsA[i] > partsB[i]) {
            return 1
        }
    }

    return 0 
}

