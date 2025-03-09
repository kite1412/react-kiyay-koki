export function toPath(type) {
  return type.split(/\s+/).join("-").toLowerCase();
}