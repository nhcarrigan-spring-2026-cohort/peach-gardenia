export function toCamelCase(name) {
    const words = name.trim().split(/\s+/).map(w => w.toLowerCase());
    const first = words[0];
    const rest = words.slice(1).map(w => w[0].toUpperCase() + w.slice(1));
    return first + rest.join("");

}