async function callTonApi(toCall, attempts = 20, delayMs = 100) {
  if (typeof toCall !== 'function') {
    throw new Error('unknown input')
  }

  let i = 0
  let lastError;

  while (i < attempts) {
    try {
      const res = await toCall()
      return res
    } catch (err) {
      lastError = err
      i++
      await delay(delayMs)
    }
  }

  throw lastError
}

function delay(ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, ms)
  )
}

module.exports = callTonApi;