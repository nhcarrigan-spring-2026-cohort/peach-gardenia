export function toKebabCase(name) {
    return name.trim().split(/\s+/).map(i => i.toLowerCase()).join("-")
}