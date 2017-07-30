export function createLogger({ name }) {
  return {
    debug: message => log('DEBUG', name, message),
    info: message => log('INFO ', name, message),
    warn: message => log('WARN ', name, message),
    error: message => log('ERROR', name, message),
    fatal: message => log('FATAL', name, message)
  };
}

function log(level, name, message) {
  console.log( // eslint-disable-line no-console
    JSON.stringify({
      time: new Date(),
      name: name,
      level: level,
      message: message
    })
  ); 
}
