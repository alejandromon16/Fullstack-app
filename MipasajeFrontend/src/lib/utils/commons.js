export const sorting = (v, key) => {
    return v.sort((a,b) => a[key].localeCompare(b[key]));
}