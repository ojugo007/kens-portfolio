import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function NameInnitial(name){
  let nameArray = name.split(" ")
  return nameArray[0][0] + nameArray[1][0] 
}