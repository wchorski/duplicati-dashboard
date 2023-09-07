export function labelPretty(label:string){
  
  const pretty = label.replace('_uploaded', ' ⬆ ').replace('_downloaded', ' ⬇ ')
  return pretty
}