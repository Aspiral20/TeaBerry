const getStringPath = (pathname: string) => {
  let rez: string = '';
  const firstStepPath = pathname.split('/')

  if (firstStepPath.length === 1) {
    firstStepPath[0] = 'main'
  }
  firstStepPath.forEach(path => path !== '' ? rez += `${path} ` : null)

  return rez.slice(0, -1)
}

export default getStringPath;