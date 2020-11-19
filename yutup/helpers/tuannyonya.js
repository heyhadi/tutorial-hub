function tuannyonya(gender, name) {
    if(gender === 'female'){
        return `Nyonya ${name}`
    } else {
        return `Tuan ${name}`
    }
}

module.exports = tuannyonya