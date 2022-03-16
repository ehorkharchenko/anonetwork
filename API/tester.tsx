function valid (val) {
  
  for (let l: number = 0; l <= val.length; l++) {
    
    const symbol: string = val.substr(l, 1)
    console.log(symbol)

    if (/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]/.test(symbol)) {
      if (l === (val.length - 1))
        return true
    }

  }
  
  return false
}

console.log(valid("HEL3ef$"))