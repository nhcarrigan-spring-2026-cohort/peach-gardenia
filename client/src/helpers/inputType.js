export function inferTypeFromName(name) {
    const n = name.toLowerCase();
    if (n.includes("email")) return "email";
    if (n.includes("password")) return "password";
    if (n.includes("phone") || n.includes("mobile")) return "tel";
    if (n.includes("number") || n.includes("age")) return "number";
    if (n.includes("date") || n.includes("dob") || n.includes("birth")) return "date";
    if (n.includes("url") || n.includes("website")) return "url";
    if (n.includes("search")) return "search"; return "text";
}